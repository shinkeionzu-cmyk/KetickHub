const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

const db = admin.firestore();

/**
 * 🛰️ HEARTBEAT CHECK
 * Digunakan oleh sistem anak untuk verify lesen secara 'Silent'.
 */
exports.validateLicense = functions.https.onCall(async (data, context) => {
    const { deploymentID, clientKey } = data;

    try {
        // 1. Cari rekod jualan/deployment dalam Vault (Firestore)
        const deployRef = db.collection('deployments').doc(deploymentID);
        const doc = await deployRef.get();

        if (!doc.exists) {
            return { status: "ERROR", message: "DNA Tidak Dikenali!" };
        }

        const systemData = doc.data();

        // 2. Kill-Switch Logic
        if (systemData.status !== "ACTIVE") {
            return { status: "LOCKED", message: "Sistem Digantung oleh KETICK HUB." };
        }

        // 3. Rekod Audit (Anti-Fraud)
        await db.collection('audit_logs').add({
            event: "PULSE_CHECK",
            deploymentID: deploymentID,
            timestamp: admin.firestore.FieldValue.serverTimestamp(),
            ip: context.rawRequest.ip || "hidden"
        });

        return { 
            status: "SUCCESS", 
            modules: systemData.modules_enabled,
            owner: systemData.client 
        };

    } catch (error) {
        return { status: "CRITICAL_FAILURE", error: error.message };
    }
});

