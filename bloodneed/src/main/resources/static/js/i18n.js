const translations = {
    en: {
        home: 'Home', dashboard: 'Dashboard', profile: 'Profile', donors: 'Donors', requests: 'Requests', logout: 'Logout', login: 'Login', register: 'Register',
        heroTitle: 'Save Lives Through Blood Donation', heroSubtitle: 'Connect donors with patients in urgent need. Every drop counts. Join thousands who make a difference every day.',
        findDonor: 'Find a Donor', becomeDonor: 'Become a Donor',
        livesSaved: 'Lives Saved', activeDonors: 'Active Donors', bloodRequests: 'Blood Requests', donorsAvailable: 'Donors Available',
        welcomeBack: 'Welcome Back', loginSubtitle: 'Sign in to your account to continue',
        email: 'Email Address', password: 'Password', rememberMe: 'Remember Me', signIn: 'Sign In', orContinueWith: 'Or continue with', dontHaveAccount: "Don't have an account?", signUp: 'Sign Up',
        dashboardWelcome: 'Dashboard Welcome', dashboardSubtitle: "Here's what's happening with your blood network",
        totalRequests: 'Total Requests', urgentNeeds: 'Urgent Needs', donationsToday: 'Donations Today', quickActions: 'Quick Actions', viewRequests: 'View All Requests', manageDonors: 'Manage Donors', sendAlert: 'Send Alert', viewProfile: 'View Profile', recentActivity: 'Recent Activity',
        viewDetails: 'View Details', accept: 'Accept', pending: 'Pending', accepted: 'Accepted', rejected: 'Rejected',
        editProfile: 'Edit Profile', personalInfo: 'Personal Information', contactInfo: 'Contact Information', bloodInfo: 'Blood Information', saveChanges: 'Save Changes', changePassword: 'Change Password',
        botTitle: 'Blood Need Bot', botGreeting: 'Hi! Need blood urgently?', botPlaceholder: 'Type your message...', botSend: 'Send',
        botWelcomeMsg: 'Hello! I can help you find a blood donor or submit a request. How can I help?',
        botHelp: 'I\'m checking available donors near you. Please check your dashboard for matches!',
        botSubmitRequest: 'You can fill the request form from the dashboard.',
        emergencyTitle: 'URGENT: Blood Emergency!', emergencyMessage: 'There is an urgent blood requirement in your area. Please donate if you are eligible.',
        donateNow: 'Donate Now', remindLater: 'Remind Later',
        search: 'Search...', searchDonors: 'Search Donors', bloodGroup: 'Blood Group', name: 'Name', location: 'Location', phone: 'Phone', email: 'Email', address: 'Address', date: 'Date', amount: 'Amount', description: 'Description', submit: 'Submit', cancel: 'Cancel', close: 'Close', loading: 'Loading...', noData: 'No data available', yes: 'Yes', no: 'No',
        whyUs: 'Why Choose Blood Need', feature1Title: 'Instant Matching', feature1Desc: 'Quickly find compatible blood donors in your area with real-time matching technology.', feature2Title: 'Multi-Device', feature2Desc: 'Seamlessly sync across all your devices. Your data is always up-to-date and accessible.', feature3Title: 'Smart Bot', feature3Desc: 'AI-powered chatbot helps you find donors, submit requests, and get instant assistance.',
        footerDesc: 'Connecting blood donors with patients in need. Every drop saves a life.', footerRight: '© 2025 Blood Need. All rights reserved.',
        noNotifications: 'No new notifications', brand: 'Blood Need'
    },
    bn: {
        home: 'হোম', dashboard: 'ড্যাশবোর্ড', profile: 'প্রোফাইল', donors: 'Donors', requests: 'অনুরোধ', logout: 'প্রস্থান', login: 'লগইন', register: 'রেজিস্টার',
        heroTitle: 'রক্তদানের মাধ্যমে জীবন বাঁচান', heroSubtitle: 'অবশ্যই রক্তের সাথে রক্তদাতাদের সংযোগ করুন। প্রতিটা বিছানা গুরুত্বপূর্ণ।',
        findDonor: 'রক্তদাতা খুঁজুন', becomeDonor: 'রক্তদাতা হন',
        livesSaved: 'জীবন উদ্ধার', activeDonors: 'সক্রিয় রক্তদাতা', bloodRequests: 'রক্তের অনুরোধ', donorsAvailable: 'উপলব্ধ রক্তদাতা',
        welcomeBack: 'স্বাগতম', loginSubtitle: 'অ্যাকাউন্টে সাইন ইন করুন',
        email: 'ইমেইল', password: 'পাসওয়ার্ড', rememberMe: 'মনে রাখুন', signIn: 'সাইন ইন', orContinueWith: 'অথবা', dontHaveAccount: 'অ্যাকাউন্ট নেই?', signUp: 'সাইন আপ',
        dashboardWelcome: 'ড্যাশবোর্ড', dashboardSubtitle: 'আপনার রক্ত নেটওয়ার্কে এখন কী ঘটছে',
        totalRequests: 'মোট অনুরোধ', urgentNeeds: 'তাৎক্ষণিক চাহিদা', donationsToday: 'আজকের দান', quickActions: 'দ্রুত অ্যাকশন', viewRequests: 'সব দেখুন', manageDonors: 'পরিচালনা', sendAlert: 'আলার্ট', viewProfile: 'প্রোফাইল', recentActivity: 'কার্যকলাপ',
        viewDetails: 'দেখুন', accept: 'গ্রহণ', pending: 'চিহ্নিত', accepted: 'গ্রহণ', rejected: 'প্রত্যাখ্যান',
        editProfile: 'সম্পাদনা', personalInfo: 'ব্যক্তিগত', contactInfo: 'যোগাযোগ', bloodInfo: 'রক্ত', saveChanges: 'সংরক্ষণ', changePassword: 'পাসওয়ার্ড',
        botTitle: 'রক্ত বট', botGreeting: 'হ্যালো! রক্ত দরকার?', botPlaceholder: 'মেসেজ লিখুন...', botSend: 'পাঠান',
        botWelcomeMsg: 'হ্যালো! আমি আপনাকে একটি রক্তদাতা খুঁজে পেতে বা একটি অনুরোধ জমা দিতে সাহায্য করতে পারি।',
        botHelp: 'আমাকে একটি রক্তদাতা খুঁজতে সাহায্য করতে হবে।',
        botSubmitRequest: 'রক্তের অনুরোধ জমা দিন।',
        emergencyTitle: 'জরুরি: রক্তের জরুরি!', emergencyMessage: 'আপনার এলাকায় রক্তের জরুরি প্রয়োজন।',
        donateNow: 'দান করুন', remindLater: 'পরে স্মরণ করুন',
        search: 'অনুসন্ধান...', bloodGroup: 'রক্ত গ্রুপ', name: 'নাম', location: 'অবস্থান', phone: 'ফোন', email: 'ইমেইল', address: 'ঠিকানা', date: 'তারিখ', submit: 'জমা দিন', cancel: 'বাতিল', close: 'সমাপ্ত', noData: 'কোনো ডাটা নেই', yes: 'হ্যাঁ', no: 'না',
        whyUs: 'কেন Blood Need', feature1Title: 'তাৎক্ষণিক ম্যাচিং', feature1Desc: 'রিয়েল-টাইম ম্যাটচিং প্রযুক্তি দিয়ে কাছের রক্তদাতা খুঁজুন।', feature2Title: 'মাল্টি-ডিভাইস', feature2Desc: 'সব ডিভাইসে সিঙ্ক করুন।', feature3Title: 'স্মার্ট বট', feature3Desc: 'AI চ্যাটবট সাহায্য করে।',
        brand: 'Blood Need'
    }
};

let currentLang = 'en';

function safeGetItem(key) {
    try { return localStorage.getItem(key); } catch(e) { return null; }
}

function safeSetItem(key, val) {
    try { localStorage.setItem(key, val); } catch(e) {}
}

function t(key) {
    return (translations[currentLang] && translations[currentLang][key]) || (translations['en'][key]) || key;
}

function setLanguage(lang) {
    currentLang = lang;
    safeSetItem('bloodneed_lang', lang);
    
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (translations[currentLang][key]) el.textContent = translations[currentLang][key];
    });
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
        const key = el.getAttribute('data-i18n-placeholder');
        if (translations[currentLang][key]) el.placeholder = translations[currentLang][key];
    });
}

function initLanguage() {
    currentLang = safeGetItem('bloodneed_lang') || 'en';
    setLanguage(currentLang);
}