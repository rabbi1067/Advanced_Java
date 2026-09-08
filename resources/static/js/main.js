function safeGetItem(key) {
    try { return localStorage.getItem(key); } catch(e) { return null; }
}

function safeSetItem(key, val) {
    try { localStorage.setItem(key, val); } catch(e) {}
}

function safeParseJson(str) {
    try { return JSON.parse(str); } catch(e) { return null; }
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
            btn.addEventListener('click', () => {
                this.lang = btn.dataset.lang;
                safeSetItem('bloodneed_lang', this.lang);
                setLanguage(this.lang);
                toggle.querySelectorAll('.lang-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
            });
        });
    }
}

function closeEmergency() {
    const el = document.getElementById('emergencyPopup');
    if (el) el.classList.remove('show');
}

class AuthManager {
    constructor() {
        this.user = safeParseJson(safeGetItem('bloodneed_user'));
    }

    login(email, password) {
        const users = safeParseJson(safeGetItem('bloodneed_users')) || [];
        const user = users.find(u => u.email === email && u.password === password);
        if (user) {
            this.user = user;
            safeSetItem('bloodneed_user', JSON.stringify(user));
            return { success: true, user };
        }
        return { success: false, error: 'Invalid credentials' };
    }

    register(name, email, password, bloodGroup) {
        let users = safeParseJson(safeGetItem('bloodneed_users')) || [];
        if (users.find(u => u.email === email)) {
            return { success: false, error: 'Email already registered' };
        }
        const user = { name, email, password, bloodGroup, role: 'user', avatar: name.charAt(0).toUpperCase(), joinedAt: new Date().toISOString() };
        users.push(user);
        safeSetItem('bloodneed_users', JSON.stringify(users));
        this.user = user;
        safeSetItem('bloodneed_user', JSON.stringify(user));
        return { success: true, user };
    }

    logout() {
        this.user = null;
        safeSetItem('bloodneed_user', null);
        try { localStorage.removeItem('bloodneed_user'); } catch(e) {}
        window.location.href = 'login.html';
    }

    isLoggedIn() {
        return !!this.user;
    }
}

class DashboardManager {
    renderStats(containerId) {
        const container = document.getElementById(containerId);
        if (!container) return;
        container.innerHTML = `
            <div class="stat-card">
                <div class="stat-icon red">🩸</div>
                <div class="stat-info"><h4>342</h4><p>Total Requests</p></div>
            </div>
            <div class="stat-card">
                <div class="stat-icon blue">👥</div>
                <div class="stat-info"><h4>1,203</h4><p>Active Donors</p></div>
            </div>
            <div class="stat-card">
                <div class="stat-icon yellow">⚠️</div>
                <div class="stat-info"><h4>18</h4><p>Urgent Needs</p></div>
            </div>
            <div class="stat-card">
                <div class="stat-icon green">❤️</div>
                <div class="stat-info"><h4>47</h4><p>Donations Today</p></div>
            </div>
        `;
    }

    renderRequests(containerId) {
        const requests = [
            { name: 'Rahim Ahmed', bloodGroup: 'A+', location: 'Dhaka', urgency: 'critical' },
            { name: 'Sara Khatun', bloodGroup: 'B+', location: 'Chittagong', urgency: 'high' },
            { name: 'Kamal Hossain', bloodGroup: 'O-', location: 'Sylhet', urgency: 'normal' }
        ];
        const container = document.getElementById(containerId);
        if (!container) return;
        container.innerHTML = requests.map(r => `
            <div class="request-card">
                <div class="request-info">
                    <h4>${r.name}</h4>
                    <p>${r.bloodGroup} • ${r.location} • ${r.urgency}</p>
                </div>
                <span class="request-urgency ${r.urgency}">${r.urgency.toUpperCase()}</span>
            </div>
        `).join('');
    }
}