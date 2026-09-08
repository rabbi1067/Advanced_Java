class BloodBot {
    constructor() {
        this.isOpen = false;
        this.messages = [];
        this.init();
    }

    init() {
        this.createWidget();
        this.createEmergencyPopup();
        this.loadAndShowNotification();
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

        document.getElementById('botTrigger').addEventListener('click', () => this.toggle());
        document.getElementById('botClose').addEventListener('click', () => this.close());
        document.getElementById('botSendBtn').addEventListener('click', () => this.sendMessage());
        document.getElementById('botInput').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.sendMessage();
        });

        this.messages.push({ sender: 'bot', text: 'Hello! I can help you find a blood donor or submit a request. How can I help?' });
        this.renderMessages();
    }

    toggle() {
        this.isOpen = !this.isOpen;
        document.getElementById('botPopup').classList.toggle('show', this.isOpen);
    }

    close() {
        this.isOpen = false;
        document.getElementById('botPopup').classList.remove('show');
    }

    renderMessages() {
        const body = document.getElementById('botBody');
        if (!body) return;
        body.innerHTML = this.messages.map(msg => `
            <div class="bot-message ${msg.sender}">${msg.text}</div>
        `).join('');
        body.scrollTop = body.scrollHeight;
    }

    sendMessage() {
        const input = document.getElementById('botInput');
        const text = input.value.trim();
        if (!text) return;
        if (!text) return;

        this.messages.push({ sender: 'user', text });
        this.renderMessages();
        input.value = '';

        setTimeout(() => {
            const response = this.getBotResponse(text);
            this.messages.push({ sender: 'bot', text: response });
            this.renderMessages();
        }, 800);
    }

    getBotResponse(text) {
        const lower = text.toLowerCase();
        if (lower.includes('donor') || lower.includes('help') || lower.includes('find') || lower.includes('needed')) {
            return 'I\'m checking available donors near you. Please check your dashboard for matches! 🩸';
        } else if (lower.includes('request') || lower.includes('submit')) {
            return 'You can fill the request form from the dashboard. ✅';
        } else if (lower.includes('blood group') || lower.includes('bg') || lower.includes('type')) {
            return 'Please share your blood group (A+, B+, O-, AB+, etc.) for faster matching!';
        } else if (lower.includes('emergency') || lower.includes('urgent') || lower.includes('now')) {
            return '🚨 EMERGENCY! Please click the emergency alert or call the nearest blood bank immediately.';
        } else {
            return 'Thank you! I\'ll help you find the nearest blood donor. Please describe your needs.';
        }
    }

    createEmergencyPopup() {
        const popup = document.createElement('div');
        popup.className = 'emergency-popup';
        popup.id = 'emergencyPopup';
        popup.innerHTML = `
            <div class="emergency-card">
                <div class="emergency-icon">🚨</div>
                <h2>URGENT: Blood Emergency!</h2>
                <p>There is an urgent blood requirement in your area. Please donate if you are eligible.</p>
                <div style="display:flex;gap:12px;justify-content:center;flex-wrap:wrap;">
                    <button class="btn btn-primary" onclick="closeEmergency()">Donate Now</button>
                    <button class="btn btn-secondary" onclick="closeEmergency()">Remind Later</button>
                </div>
            </div>
        `;
        document.body.appendChild(popup);

        setTimeout(() => {
            if (Math.random() > 0.5) {
                this.showEmergency();
            }
        }, 10000);
    }

    showEmergency() {
        const el = document.getElementById('emergencyPopup');
        if (el) el.classList.add('show');
    }

    loadAndShowNotification() {
        const notifications = JSON.parse(localStorage.getItem('bloodneed_notifications') || '[]');
        if (notifications.length > 0) {
            setTimeout(() => {
                this.showEmergency();
            }, 5000);
        }
    }
}

function closeEmergency() {
    const el = document.getElementById('emergencyPopup');
    if (el) el.classList.remove('show');
}