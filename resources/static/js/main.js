class ThemeManager {
    constructor() {
        this.theme = localStorage.getItem('bloodneed_theme') || 'light';
        this.apply();
        this.createToggle();
    }

    apply() {
        document.documentElement.setAttribute('data-theme', this.theme);
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        document.querySelectorAll('.nav-links a').forEach(a => {
            const href = a.getAttribute('href');
            if (href === currentPage) {
                a.classList.add('active');
            } else {
                a.classList.remove('active');
            }
        });
    }

    toggle() {
        this.theme = this.theme === 'light' ? 'dark' : 'light';
        localStorage.setItem('bloodneed_theme', this.theme);
        this.apply();
    }

    createToggle() {
        const bell = document.createElement('div');
        bell.className = 'notification-bell';
        bell.id = 'notifBell';
        bell.innerHTML = '🔔<span class="notification-dot"></span>';
        bell.title = 'Notifications';
        bell.addEventListener('click', () => this.showNotifications());

        const toggle = document.createElement('button');
        toggle.className = 'theme-toggle' + (this.theme === 'dark' ? ' active' : '');
        toggle.innerHTML = '<span class="toggle-circle">☀️</span>';
        toggle.addEventListener('click', () => {
            this.toggle();
            toggle.classList.toggle('active');
            toggle.querySelector('.toggle-circle').textContent = this.theme === 'dark' ? '🌙' : '☀️';
        });

        const navActions = document.querySelector('.nav-actions');
        if (navActions) {
            navActions.prepend(bell);
            navActions.prepend(toggle);
        }
    }

    showNotifications() {
        const dot = document.getElementById('notifBell')?.querySelector('.notification-dot');
        if (dot) dot.style.display = 'none';
        alert('🔔 No new notifications. You\'re all caught up!');
    }
}

class LanguageManager {
    constructor() {
        this.lang = localStorage.getItem('bloodneed_lang') || 'en';
        setLanguage(this.lang);
        this.createToggle();
    }

    createToggle() {
        const toggle = document.createElement('div');
        toggle.className = 'lang-toggle';
        toggle.innerHTML = `
            <button class="lang-btn ${this.lang === 'en' ? 'active' : ''}" data-lang="en">EN</button>
            <button class="lang-btn ${this.lang === 'bn' ? 'active' : ''}" data-lang="bn">বাংলা</button>
        `;
        const navActions = document.querySelector('.nav-actions');
        if (navActions) {
            navActions.prepend(toggle);
        }

        toggle.querySelectorAll('.lang-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                this.lang = btn.dataset.lang;
                localStorage.setItem('bloodneed_lang', this.lang);
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
        this.user = JSON.parse(localStorage.getItem('bloodneed_user') || 'null');
    }

    login(email, password) {
        const users = JSON.parse(localStorage.getItem('bloodneed_users') || '[]');
        const user = users.find(u => u.email === email && u.password === password);
        if (user) {
            this.user = user;
            localStorage.setItem('bloodneed_user', JSON.stringify(user));
            return { success: true, user };
        }
        return { success: false, error: 'Invalid credentials' };
    }

    register(name, email, password, bloodGroup) {
        let users = JSON.parse(localStorage.getItem('bloodneed_users') || '[]');
        if (users.find(u => u.email === email)) {
            return { success: false, error: 'Email already registered' };
        }
        const user = { name, email, password, bloodGroup, role: 'user', avatar: name.charAt(0).toUpperCase(), joinedAt: new Date().toISOString() };
        users.push(user);
        localStorage.setItem('bloodneed_users', JSON.stringify(users));
        this.user = user;
        localStorage.setItem('bloodneed_user', JSON.stringify(user));
        return { success: true, user };
    }

    logout() {
        this.user = null;
        localStorage.removeItem('bloodneed_user');
        window.location.href = 'login.html';
    }

    isLoggedIn() {
        return !!this.user;
    }
}

class DashboardManager {
    constructor() {
        this.loadStats();
    }

    loadStats() {
        const users = JSON.parse(localStorage.getItem('bloodneed_users') || '[]');
        const requests = JSON.parse(localStorage.getItem('bloodneed_requests') || '[]');
        return {
            totalDonors: users.length,
            totalRequests: requests.length,
            urgentNeeds: requests.filter(r => r.urgency === 'critical').length,
            todayDonations: Math.floor(Math.random() * 10) + 1
        };
    }

    renderStats(containerId) {
        const stats = this.loadStats();
        const container = document.getElementById(containerId);
        if (!container) return;
        container.innerHTML = `
            <div class="stat-card">
                <div class="stat-icon red">🩸</div>
                <div class="stat-info">
                    <h4>${stats.totalRequests}</h4>
                    <p>Total Requests</p>
                </div>
            </div>
            <div class="stat-card">
                <div class="stat-icon blue">👥</div>
                <div class="stat-info">
                    <h4>${stats.totalDonors}</h4>
                    <p>Active Donors</p>
                </div>
            </div>
            <div class="stat-card">
                <div class="stat-icon yellow">⚠️</div>
                <div class="stat-info">
                    <h4>${stats.urgentNeeds}</h4>
                    <p>Urgent Needs</p>
                </div>
            </div>
            <div class="stat-card">
                <div class="stat-icon green">❤️</div>
                <div class="stat-info">
                    <h4>${stats.todayDonations}</h4>
                    <p>Donations Today</p>
                </div>
            </div>
        `;
    }

    renderRequests(containerId) {
        const requests = JSON.parse(localStorage.getItem('bloodneed_requests') || '[]');
        const container = document.getElementById(containerId);
        if (!container) return;
        if (requests.length === 0) {
            container.innerHTML = `<p style="text-align:center;color:var(--text-muted);padding:40px;">No data available</p>`;
            return;
        }
        container.innerHTML = requests.map(r => `
            <div class="request-card">
                <div class="request-info">
                    <h4>${r.name}</h4>
                    <p>${r.bloodGroup} • ${r.location} • ${r.urgency}</p>
                </div>
                <div style="display:flex;align-items:center;gap:12px;">
                    <span class="request-urgency ${r.urgency}">${r.urgency.toUpperCase()}</span>
                    <button class="btn btn-sm btn-primary">View Details</button>
                </div>
            </div>
        `).join('');
    }
}