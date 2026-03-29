// 1. Ambil Config secara sulit dari fail tempatan (di-ignore oleh Git)
fetch('/firebase-config.json')
  .then(response => response.json())
  .then(config => {
      firebase.initializeApp(config);
      const db = firebase.firestore();
      
      // Jalankan semua enjin monitor
      loadDeployments(db);
      listenToFraudAlerts(db);
  })
  .catch(err => console.error("Gagal muat turun config Firebase:", err));

// 2. Monitor Senarai Pelanggan (Deployment)
function loadDeployments(db) {
    const list = document.getElementById('deployment-list');
    
    db.collection('deployments').onSnapshot((querySnapshot) => {
        list.innerHTML = "";
        let total = 0;
        
        querySnapshot.forEach((doc) => {
            total++;
            const data = doc.data();
            const statusClass = data.status === 'ACTIVE' ? 'status-active' : 'status-locked';
            
            list.innerHTML += `
                <div class="client-item">
                    <div>
                        <h4>${data.client}</h4>
                        <p style="font-size: 0.7rem; opacity: 0.6;">${data.system_type} | ${doc.id}</p>
                    </div>
                    <div style="text-align: right;">
                        <span class="${statusClass}">${data.status}</span><br>
                        <button class="btn-manage" onclick="killSwitch('${doc.id}', '${db.app.name}')">Manage</button>
                    </div>
                </div>
            `;
        });
        document.getElementById('total-deploy').innerText = total;
    });
}

// 3. Monitor Amaran Penipuan (Fraud Alerts)
function listenToFraudAlerts(db) {
    const alertCountElement = document.getElementById('fraud-alerts');

    db.collection('audit_logs')
      .where('severity', '==', 'CRITICAL')
      .orderBy('timestamp', 'desc')
      .limit(10)
      .onSnapshot((snapshot) => {
          let count = snapshot.size;
          alertCountElement.innerText = count;

          if (count > 0) {
              console.log("⚠️ AMARAN FRAUD DIKESAN!");
              // Logik tambahan (notifikasi dsb) boleh diletakkan di sini
          }
      });
}

// 4. Fungsi Kill-Switch (Kunci Sistem)
function killSwitch(id) {
    // Kita panggil balik DB secara global
    const db = firebase.firestore();
    const alasan = prompt("Masukkan alasan penguncian (cth: Kecurigaan Fraud):");
    
    if(alasan) {
        db.collection('deployments').doc(id).update({ 
            status: "LOCKED",
            lock_reason: alasan,
            locked_at: firebase.firestore.FieldValue.serverTimestamp()
        }).then(() => {
            alert("🔒 SISTEM TELAH DIKUNCI SERTA-MERTA.");
        }).catch(err => alert("Gagal mengunci: " + err.message));
    }
}
