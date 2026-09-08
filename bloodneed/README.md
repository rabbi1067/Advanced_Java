# 🩸 Blood Need - Advanced Java Spring Boot + MongoDB Project

> A full-stack blood donation notification platform built with **Spring Boot**, **MongoDB**, HTML5, CSS3, and JavaScript.

## ✨ Features

- 🩸 **Full Stack Application** - Spring Boot backend + MongoDB database
- 🌐 **Bilingual Support** - English & Bangla language toggle
- 🌙 **Day/Night Theme** - Toggle between light and dark modes
- 📱 **Multi-Device** - Auto-sync across all devices
- 🚨 **Emergency Alerts** - Pop-up emergency notifications
- 🤖 **Chatbot** - AI-powered bot for donor matching
- 📊 **Dashboard** - Stats, charts, requests, activity feed
- 👤 **Profile Management** - Personal info, contact, settings
- 🔔 **Notification Bell** - Real-time notifications
- ⚡ **Real Database** - All data saved to MongoDB (no demo values)

## 📁 Project Structure

```
bloodneed/
├── pom.xml                          (Spring Boot Maven config)
├── src/
│   ├── main/
│   │   ├── java/com/bloodneed/
│   │   │   ├── BloodNeedApplication.java
│   │   │   ├── controller/
│   │   │   │   ├── AuthController.java       (Register, Login, Profile)
│   │   │   │   ├── DashboardController.java  (Stats, Donors, Requests)
│   │   │   │   └── BotController.java        (Chatbot API)
│   │   │   ├── model/
│   │   │   │   ├── User.java
│   │   │   │   ├── BloodRequest.java
│   │   │   │   └── Donor.java
│   │   │   ├── repository/
│   │   │   │   ├── UserRepository.java
│   │   │   │   ├── BloodRequestRepository.java
│   │   │   │   └── DonorRepository.java
│   │   │   └── service/
│   │   │       └── AuthService.java
│   │   └── resources/
│   │       ├── application.properties        (MongoDB config)
│   │       ├── static/
│   │       │   ├── css/
│   │       │   │   ├── style.css
│   │       │   │   ├── dashboard.css
│   │       │   │   └── profile.css
│   │       │   └── js/
│   │       │       ├── i18n.js
│   │       │       ├── main.js
│   │       │       └── bot.js
│   │       └── templates/
│   │           ├── index.html
│   │           ├── login.html
│   │           ├── dashboard.html
│   │           └── profile.html
└── README.md
```

## 🚀 Getting Started

### Prerequisites
- Java 17+
- Maven
- MongoDB (running on localhost:27017)
- Node.js (for testing)

### Run Spring Boot Backend
```bash
cd bloodneed
mvn spring-boot:run
```

### Frontend
Open `http://localhost:8080` in browser (served by Spring Boot)

## 🛠️ Technologies
- **Backend**: Java 17, Spring Boot 3.2, Spring Data MongoDB
- **Database**: MongoDB
- **Frontend**: HTML5, CSS3, JavaScript (Fetch API)
- **Build**: Maven

## 📸 Preview

The home page features a combined dashboard + profile sidebar view with:
- Real-time stats from MongoDB
- Monthly donation charts
- Recent requests list
- Activity feed
- Emergency alert cards
- Smart notification bot
- Profile with all settings
- Theme toggle (Day/Night)
- Language toggle (EN/BN)

## 👤 Author

**Md. Fazley Rabbi** - rabbi1067
