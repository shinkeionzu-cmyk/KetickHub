const crypto = require('crypto');

/**
 * KETICK LICENSE ENGINE
 * Menjana kunci rahsia yang sukar digodam.
 */
const LicenseEngine = {
    generateKey: (clientId) => {
        const secret = "KETICK_EMPIRE_SECRET_2026"; // Jangan kongsi ini
        return crypto.createHmac('sha256', secret)
                     .update(clientId + Date.now())
                     .digest('hex')
                     .substring(0, 16)
                     .toUpperCase();
    }
};

module.exports = LicenseEngine;

