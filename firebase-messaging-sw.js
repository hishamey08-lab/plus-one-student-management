importScripts('https://www.gstatic.com/firebasejs/12.1.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/12.1.0/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyBCfKnTHrLVR1KdF1dDaj-Q0ZMdbBcgk",
  authDomain: "plus-one-student-web.firebaseapp.com",
  projectId: "plus-one-student-web",
  storageBucket: "plus-one-student-web.firebasestorage.app",
  messagingSenderId: "845465703333",
  appId: "1:845465703333:web:dc78c09173e27d69f04e4c"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  const notification = payload.notification || {};

  const title =
    notification.title || "Plus One Student System";

  const options = {
    body:
      notification.body || "There is a new update.",
    icon:
      notification.icon || "./favicon.ico",
    badge:
      notification.badge || "./favicon.ico",
    data: {
      url:
        payload?.data?.url ||
        self.registration.scope
    }
  };

  self.registration.showNotification(title, options);
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();

  const targetUrl =
    event.notification?.data?.url ||
    self.registration.scope;

  event.waitUntil(
    clients.matchAll({
      type: 'window',
      includeUncontrolled: true
    }).then((clientList) => {

      for (const client of clientList) {
        if ('focus' in client) {
          client.focus();
          return;
        }
      }

      if (clients.openWindow) {
        return clients.openWindow(targetUrl);
      }
    })
  );
});
