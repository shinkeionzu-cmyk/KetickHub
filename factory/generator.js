const fs = require('fs');
const admin = require('firebase-admin');

// 🔑 1. SETUP FIREBASE ADMIN
// Pastikan anda sudah letak fail serviceAccountKey.json di root folder KETICK_HUB
const serviceAccount = require("../serviceAccountKey.json");

if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
    });
}

const db = admin.firestore();

/**
 * 🏭 KETICK FACTORY: GENERATOR BERSEPADU
 * Mencetak sistem baru ke Local (JSON) & Cloud (Firestore)
 */
async function generateAndDeploy(clientName, systemType) {
    const blueprintPath = `../vault/blueprints/${systemType}.json`;
    
    // --- SEMAK BLUEPRINT ---
    if (!fs.existsSync(blueprintPath)) {
        console.log("❌ Blueprint tidak dijumpai dalam Almari!");
        return;
    }

    const blueprint = JSON.parse(fs.readFileSync(blueprintPath, 'utf8'));

    // --- JANA DATA DEPLOYMENT (DNA) ---
    const deploymentID = `KETICK-${Date.now()}`;
    const licenseKey = `KEY-${Math.random().toString(36).toUpperCase().substring(2, 10)}`;
    
    const deploymentData = {
        client: clientName,
        deployment_id: deploymentID,
        license_key: licenseKey,
        system_type: blueprint.name,
        status: "ACTIVE",
        modules_enabled: blueprint.modules,
        activated_at: new Date().toISOString(),
        cloud_sync: admin.firestore.FieldValue.serverTimestamp()
    };

    try {
        // --- ☁️ SIMPAN KE FIREBASE (CLOUD) ---
        console.log(`📡 Menghantar DNA ke Cloud KETICK...`);
        await db.collection('deployments').doc(deploymentID).set(deploymentData);
        
        // --- 📁 SIMPAN KE ACODE (LOCAL JSON) ---
        const fileName = clientName.replace(/\s+/g, '_').toLowerCase();
        const localPath = `../vault/deployments/${fileName}.json`;
        
        fs.writeFileSync(localPath, JSON.stringify(deploymentData, null, 2));

        console.log(`--- ✅ KETICK DEPLOYMENT SUCCESS ---`);
        console.log(`👤 Client      : ${clientName}`);
        console.log(`🛡️ Mark System : ${blueprint.name}`);
        console.log(`🔑 License Key : ${licenseKey}`);
        console.log(`🆔 Deploy ID   : ${deploymentID}`);
        console.log(`📂 Local Path  : /vault/deployments/${fileName}.json`);
        console.log(`-------------------------------------`);

    } catch (error) {
        console.error("❌ Gagal menjana sistem:", error.message);
    }
}

// 🚀 CARA GUNA (UNCOMMENT UNTUK JALANKAN):
// generateAndDeploy("Klinik Yakin Bahau", "ketick-os");
