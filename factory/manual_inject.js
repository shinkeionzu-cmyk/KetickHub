const admin = require('firebase-admin');
const serviceAccount = require('../serviceAccountKey.json');

if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
    });
}

const db = admin.firestore();

async function injectFirstData() {
    const clientData = {
        client: "Klinik Yakin Bahau",
        license_key: "KETICK-OS-BAHAU-001",
        status: "ACTIVE",
        deployed_at: admin.firestore.FieldValue.serverTimestamp(),
        last_ping: admin.firestore.FieldValue.serverTimestamp(),
        version: "1.0.0"
    };

    try {
        await db.collection('deployments').add(clientData);
        console.log("✅ DATA BERJAYA DISUNTIK!");
    } catch (e) {
        console.error("❌ GAGAL:", e);
    }
}

injectFirstData();
