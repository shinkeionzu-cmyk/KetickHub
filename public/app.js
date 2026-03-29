// Kita akan tarik config dari fail json luaran yang di-ignore oleh git
fetch('/firebase-config.json')
  .then(response => response.json())
  .then(config => {
      firebase.initializeApp(config);
      const db = firebase.firestore();
      loadDeployments(db); // Pass db ke fungsi
  });

function loadDeployments(db) {
    const list = document.getElementById('deployment-list');
    // ... rest of your code ...
}
