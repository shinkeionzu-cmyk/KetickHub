
[2026-03-29] struktur Ketick Hub
/KETICK_HUB
├── /war_room               # [MEJA MEETING] Strategi & Perancangan
│   ├── constitution.md     # Perlembagaan & Visi KETICK (Rule of Law)
│   ├── meeting_notes.md    # Nota idea & keputusan mesyuarat
│   └── roadmap.json        # Projek masa depan & To-Do List
│
├── /vault                  # [ALMARI ARMOR] Koleksi Sistem Ready-to-Use
│   ├── /blueprints         # Skema/Konfigurasi Mark-OS, Mark-Guard, dll
│   │   ├── ketick-os.json
│   │   ├── antifraud.json
│   │   └── social-auto.json
│   └── /deployments        # Rekod 'Siapa' pakai 'Mark' mana (Client List)
│
├── /factory                # [KILANG] Proses pembinaan & pautan (Linking)
│   └── generator.js        # Skrip 'menghidupkan' anak & tanam DNA Ibu
│
├── /core                   # [JANTUNG] Enjin keselamatan & Kebenaran
│   ├── gatekeeper.js       # Kawalan permission & Security Pulse
│   └── license_engine.js   # Penjana Product Key & Validation
│
├── /functions              # [BACKEND] Firebase Cloud Functions
│   └── index.js            # API Gateway untuk Hubungan Ibu-Anak
│
└── /public                 # [DASHBOARD UI] Antara Muka Pemilik
    ├── index.html          # Web Control Center
    └── style.css           # Soft-Pro Theme (Aestetik)

1. Blueprint Data (Schema). Memandangkan anda menggunakan Firebase, Firestore akan bertindak sebagai "cermin" kepada folder /vault yang ada di Acode anda.
​Apabila anda melihat Dashboard KETICK HUB di Android/iOS nanti, ia akan menarik data dari struktur ini.
​1. Struktur Koleksi Firestore (The Cloud Vault)
​Kita akan susun Database Firebase anda supaya selari dengan struktur folder yang anda dah bina:

Koleksi (Collection) Dokumen (Document ID) Data (Fields) Kegunaan
armors mark-01-os name, version, modules, status Senarai "Armor" yang sedia dijual.
deployments DEPLOY-ID-123 client_name, system_type, key, status Rekod siapa yang tengah pakai sistem anda.
audit_logs (Auto ID) event, deployment_id, staff_id, time Rekod Hitam (Anti-Fraud).
war_room_notes (Auto ID) title, content, category, date Nota strategi dari Meja Meeting anda.

# 📝 LOG MESYUARAT STRATEGIK KETICK HUB

## [2026-03-29] - SESI 1: PEMBINAAN MOTHERSHIP & PROTOKOL API
**Peserta:** Master Admin (AzlanMymo) & AI Architect (Gemini)

### 1. KEPUTUSAN STRUKTUR FOLDER
- Telah menetapkan struktur **Unified KETICK HUB** yang menggabungkan:
  - `war_room` (Strategi)
  - `vault` (Almari Armor/Produk)
  - `factory` (Kilang Pautan/Generator)
  - `core` (Enjin Keselamatan/Gatekeeper)
  - `public` (Dashboard Kawalan)

### 2. PROTOKOL KESELAMATAN (API MASKING)
- **Keputusan:** API Key Firebase TIDAK akan di-hardcode dalam `app.js`.
- **Implementasi:** Menggunakan fail `public/firebase-config.json` yang diasingkan.
- **Git Guard:** Fail tersebut wajib dimasukkan dalam `.gitignore` bersama `serviceAccountKey.json`.
- **Sebab:** Mengelakkan kebocoran identiti projek di GitHub (Private/Public).

### 3. LOGIK KELAHIRAN SISTEM (GENERATOR)
- Setiap sistem anak (Mark-OS, dsb) akan dijana melalui `factory/generator.js`.
- Data akan disimpan secara 'Dual-Log': 
  - **Local:** Folder `vault/deployments` (JSON).
  - **Cloud:** Firebase Firestore (Live Sync).

### 4. ARAHAN SETERUSNYA (TO-DO)
- [ ] Memantapkan fungsi **Anti-Fraud (Staff Tracking)**.
- [ ] Menyediakan 'Kill-Switch' yang lebih agresif dari Dashboard.
- [ ] Persediaan UI Flutter untuk akses Android/iOS.


