// Konfigurasi Firebase - NEXCT Pesan
const firebaseConfig = {
    apiKey: "AIzaSyC2DVIIWt-hQQv7H9pybEtOCQmtW8SGFvY",
    authDomain: "nexct-pesan.firebaseapp.com",
    projectId: "nexct-pesan",
    storageBucket: "nexct-pesan.firebasestorage.app",
    messagingSenderId: "1095229730929",
    appId: "1:1095229730929:web:569d54814d64941621ebd0",
    measurementId: "G-EMGEDNYZ35"
};

// Inisialisasi Firebase
firebase.initializeApp(firebaseConfig);

// Inisialisasi Firestore
const db = firebase.firestore();