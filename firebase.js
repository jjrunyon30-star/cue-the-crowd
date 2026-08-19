// ======================================================
// FIREBASE CONNECTION
// ======================================================

const firebaseConfig = {
  apiKey: "AIzaSyAE97Diax1GFjF4r8wvrICansqXp_aMQok",
  authDomain: "event-platform-pro-web.firebaseapp.com",
  databaseURL: "https://event-platform-pro-web-default-rtdb.firebaseio.com/",
  projectId: "event-platform-pro-web",
  storageBucket: "event-platform-pro-web.firebasestorage.app",
  messagingSenderId: "770658657582",
  appId: "1:770658657582:web:229d2a074c4d4442bb86bf"
};

firebase.initializeApp(firebaseConfig);

const eventDatabase =
  firebase.database();

console.log("Firebase connected.");