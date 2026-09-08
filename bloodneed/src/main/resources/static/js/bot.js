const API_BASE = 'http://localhost:8080/api';
const safeGetItem = (key) => { try { return localStorage.getItem(key); } catch(e) { return null; } };

class BloodBot {
    constructor() {
        this.isOpen = false;
        this.messages = [];
        this.init();
    }

    async init() {
        try { this.createWidget(); } catch(e) { console.error('BloodBot init error:', e); }
    }

    createWidget() {
        const widget = document.createElement('div');
        widget.className = 'bot-widget';
        widget.innerHTML = `
            <div class="bot-popup" id="botPopup">
                <div class="bot-popup-header"><h4>🩸 Blood Need Bot</h4><button class="bot-popup-close" id="botClose">&times;</button></div>
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
        document.getElementById('botInput')?.addEventListener('keypress', (e) => { if (e.key === 'Enter') this.sendMessage(); });
        this.messages.push({ sender: 'bot', text: 'Hello! I can help you find a blood donor or submit a request.' });
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
            const res = await fetch(`${API_BASE}/bot/respond`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ text }) });
            const data = await res.json();
            setTimeout(() => { this.messages.push({ sender: 'bot', text: data.response || 'Thank you!' }); this.renderMessages(); }, 800);
        } catch(e) {
            setTimeout(() => { this.messages.push({ sender: 'bot', text: 'Thank you! I\'ll help you.' }); this.renderMessages(); }, 800);
        }
    }

    toggle() { this.isOpen = !this.isOpen; const p = document.getElementById('botPopup'); if (p) p.classList.toggle('show', this.isOpen); }
    close() { this.isOpen = false; const p = document.getElementById('botPopup'); if (p) p.classList.remove('show'); }
    renderMessages() { const body = document.getElementById('botBody'); if (!body) return; body.innerHTML = this.messages.map(msg => `<div class="bot-message ${msg.sender}">${msg.text}</div>`).join(''); body.scrollTop = body.scrollHeight; }
    }