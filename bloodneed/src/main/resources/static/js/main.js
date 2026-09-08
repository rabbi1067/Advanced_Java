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

function closeEmergency() { const el = document.getElementById('emergencyPopup'); if (el) el.classList.remove('show'); }