
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

