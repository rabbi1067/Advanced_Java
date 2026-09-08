const API_BASE = 'http://localhost:8080/api';

const safeGetItem = (key) => { try { return localStorage.getItem(key); } catch(e) { return null; } };
const safeSetItem = (key, val) => { try { localStorage.setItem(key, val); } catch(e) {} };

function safeParseJson(str) {
    try { return JSON.parse(str); } catch(e) { return null; }
}

async function apiCall(endpoint, method = 'GET', body = null) {
    try {
        const options = {
            method: method,
            headers: { 'Content-Type': 'application/json' }
        };
        if (body) options.body = JSON.stringify(body);
        const res = await fetch(`${API_BASE}${endpoint}`, options);
        return await res.json();
    } catch(e) {
        console.error('API Error:', e);
        return { success: false, error: e.message };
    }
}

class ThemeManager {
    constructor() {
        this.theme = safeGetItem('bloodneed_theme') || 'light';
        this.apply();
        this.createToggle();
    }

    apply() {
        document.documentElement.setAttribute('data-theme', this.theme);
    }

    toggle() {
        this.theme = this.theme === 'light' ? 'dark' : 'light';
        safeSetItem('bloodneed_theme', this.theme);
        this.apply();
    }

    createToggle() {
        const navActions = document.querySelector('.nav-actions');
        if (!navActions) return;

        const bell = document.createElement('div');
        bell.className = 'notification-bell';
        bell.id = 'notifBell';
        bell.innerHTML = '🔔<span class="notification-dot"></span>';
        bell.title = 'Notifications';
        bell.addEventListener('click', () => {
            const dot = bell.querySelector('.notification-dot');
            if (dot) dot.style.display = 'none';
        });

        const toggle = document.createElement('button');
        toggle.className = 'theme-toggle' + (this.theme === 'dark' ? ' active' : '');
        toggle.innerHTML = '<span class="toggle-circle"></span>';
        toggle.addEventListener('click', () => {
            this.toggle();
            toggle.classList.toggle('active');
        });

        navActions.appendChild(bell);
        navActions.appendChild(toggle);
    }
}

class LanguageManager {
    constructor() {
        this.lang = safeGetItem('bloodneed_lang') || 'en';
        this.createToggle();
    }

    createToggle() {
        const navActions = document.querySelector('.nav-actions');
        if (!navActions) return;

        const toggle = document.createElement('div');
        toggle.className = 'lang-toggle';
        toggle.innerHTML = `
            <button class="lang-btn ${this.lang === 'en' ? 'active' : ''}" data-lang="en">EN</button>
            <button class="lang-btn ${this.lang === 'bn' ? 'active' : ''}" data-lang="bn">বাংলা</button>
        `;
        navActions.appendChild(toggle);

        toggle.querySelectorAll('.lang-btn').forEach(btn => {
            btn.addEventListener('click', async () => {
                this.lang = btn.dataset.lang;
                safeSetItem('bloodneed_lang', this.lang);
                setLanguage(this.lang);
                toggle.querySelectorAll('.lang-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
            });
        });
    }
}

class AuthManager {
    constructor() {
        this.user = safeParseJson(safeGetItem('bloodneed_user'));
    }

    async login(email, password) {
        const result = await apiCall('/auth/login', 'POST', { email, password });
        if (result.success) {
            this.user = result.user;
            safeSetItem('bloodneed_user', JSON.stringify(result.user));
        }
        return result;
    }

    async register(userData) {
        const result = await apiCall('/auth/register', 'POST', userData);
        if (result.success) {
            this.user = result.user;
            safeSetItem('bloodneed_user', JSON.stringify(result.user));
        }
        return result;
    }

    async logout() {
        this.user = null;
        safeSetItem('bloodneed_user', null);
        window.location.href = 'login.html';
    }

    isLoggedIn() { return !!this.user; }

    async getProfile(id) {
        return await apiCall(`/auth/profile/${id}`);
    }

    async updateProfile(id, data) {
        const result = await apiCall(`/auth/profile/${id}`, 'PUT', data);
        if (result.success) {
            this.user = result.user;
            safeSetItem('bloodneed_user', JSON.stringify(result.user));
        }
        return result;
    }
}

class DashboardManager {
    async loadStats() {
        return await apiCall('/stats');
    }

    async loadDonors() {
        return await apiCall('/donors');
    }

    async loadDonorsByBloodGroup(bg) {
        return await apiCall(`/donors/blood/${bg}`);
    }

    async loadRequests() {
        return await apiCall('/requests');
    }

    async createRequest(data) {
        return await apiCall('/requests', 'POST', data);
    }

    async updateRequest(id, status) {
        return await apiCall(`/requests/${id}`, 'PUT', { status });
    }

    async loadActivity() {
        return await apiCall('/activity');
    }
}

class BloodBot {
    constructor() {
        this.isOpen = false;
        this.messages = [];
        this.init();
    }

    async init() {
        try {
            this.createWidget();
            this.createEmergencyPopup();
            this.loadAndShowNotification();
        } catch(e) {
            console.error('BloodBot init error:', e);
        }
    }

    createWidget() {
        const widget = document.createElement('div');
        widget.className = 'bot-widget';
        widget.innerHTML = `
            <div class="bot-popup" id="botPopup">
                <div class="bot-popup-header">
                    <h4>🩸 Blood Need Bot</h4>
                    <button class="bot-popup-close" id="botClose">&times;</button>
                </div>
                <div class="bot-popup-body" id="botBody"></div>
                <div class="bot-input-area">
                    <input type="text" id="botInput" placeholder="Type your message...">
                    <button id="botSendBtn">➤</button>
                </div>
            </div>
            <div class="bot-pulse"></div>
            <button class="bot-trigger" id="botTrigger" title="Blood Need Bot">🩸</button>
        `;
        document.body.appendChild(widget);

        document.getElementById('botTrigger')?.addEventListener('click', () => this.toggle());
        document.getElementById('botClose')?.addEventListener('click', () => this.close());
        document.getElementById('botSendBtn')?.addEventListener('click', () => this.sendMessage());
        document.getElementById('botInput')?.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.sendMessage();
        });

        this.messages.push({ sender: 'bot', text: 'Hello! I can help you find a blood donor or submit a request. How can I help?' });
        this.renderMessages();
    }

    async sendMessage() {
        const input = document.getElementById('botInput');
        if (!input) return;
        const text = input.value.trim();
        if (!text) return;

        this.messages.push({ sender: 'user', text });
        this.renderMessages();
        input.value = '';

        try {
            const result = await apiCall('/bot/respond', 'POST', { text });
            setTimeout(() => {
                this.messages.push({ sender: 'bot', text: result.response || 'Thank you!' });
                this.renderMessages();
            }, 800);
        } catch(e) {
            setTimeout(() => {
                this.messages.push({ sender: 'bot', text: 'Thank you! I\'ll help you.' });
                this.renderMessages();
            }, 800);
        }
    }

    toggle() { this.isOpen = !this.isOpen; const p = document.getElementById('botPopup'); if (p) p.classList.toggle('show', this.isOpen); }
    close() { this.isOpen = false; const p = document.getElementById('botPopup'); if (p) p.classList.remove('show'); }

    renderMessages() {
        const body = document.getElementById('botBody');
        if (!body) return;
        body.innerHTML = this.messages.map(msg => `<div class="bot-message ${msg.sender}">${msg.text}</div>`).join('');
        body.scrollTop = body.scrollHeight;
    }

    createEmergencyPopup() {
        const popup = document.createElement('div');
        popup.className = 'emergency-popup';
        popup.id = 'emergencyPopup';
        popup.innerHTML = `
            <div class="emergency-card">
                <div class="emergency-icon">🚨</div>
                <h2>Urgent: Blood Emergency!</h2>
                <p>There is an urgent blood requirement in your area.</p>
                <div style="display:flex;gap:12px;justify-content:center;flex-wrap:wrap;">
                    <button class="btn btn-primary" onclick="closeEmergency()">Donate Now</button>
                    <button class="btn btn-secondary" onclick="closeEmergency()">Remind Later</button>
                </div>
            </div>
        `;
        document.body.appendChild(popup);
        setTimeout(() => { if (Math.random() > 0.5) { const el = document.getElementById('emergencyPopup'); if (el) el.classList.add('show'); } }, 12000);
    }

    loadAndShowNotification() {
        const notif = safeGetItem('bloodneed_notif');
        if (notif) setTimeout(() => { const el = document.getElementById('emergencyPopup'); if (el) el.classList.add('show'); }, 5000);
    }
}

function closeEmergency() { const el = document.getElementById('emergencyPopup'); if (el) el.classList.remove('show'); }