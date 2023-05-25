importScripts("https://www.gstatic.com/firebasejs/9.1.3/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/9.1.3/firebase-messaging-compat.js");
firebase.initializeApp({
apiKey: "AIzaSyC7__0rNv28QRenwo0oheYwas6V9RbjwDI",
authDomain: "notification-e2488.firebaseapp.com",
projectId: "notification-e2488",
storageBucket: "notification-e2488.appspot.com",
messagingSenderId: "892511315104",
appId: "1:892511315104:web:69ab493cab15421dead5c5",
measurementId: "G-4FGJZ3LV2V"
});
const messaging = firebase.messaging();

console.log(messaging)

messaging.onMessage(function (payload) {
        console.log('Received background message ', payload);
    });