const fs = require('fs');

/**
 * KETICK FACTORY: MENCETAK ANAK SISTEM
 * Cara guna: Panggil fungsi ini bila nak jual sistem baru.
 */
function generateLicense(clientName, systemType) {
    const blueprintPath = `../vault/blueprints/${systemType}.json`;
    
    if (!fs.existsSync(blueprintPath)) {
        console.log("❌ Blueprint tidak dijumpai dalam Almari!");
        return;
    }

    const blueprint = JSON.parse(fs.readFileSync(blueprintPath, 'utf8'));
    
    // Jana ID Unik & Key (DNA Pautan)
    const deploymentID = `KETICK-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
    
    const newDeployment = {
        client: clientName,
        deployment_id: deploymentID,
        system_type: blueprint.name,
        activated_at: new Date().toISOString(),
        status: "ACTIVE",
        modules_enabled: blueprint.modules
    };

    // Simpan rekod ke dalam Deployment (Almari)
    const filePath = `../vault/deployments/${clientName.replace(/\s+/g, '_').toLowerCase()}.json`;
    fs.writeFileSync(filePath, JSON.stringify(newDeployment, null, 2));

    console.log(`✅ ${blueprint.name} Berhasil Dijana untuk: ${clientName}`);
    console.log(`🔑 Deployment ID: ${deploymentID}`);
}

// Contoh bina satu untuk Klinik:
// generateLicense("Klinik Yakin Bahau", "ketick-os");
