<<<<<<< HEAD
# Quiz Sekolah

Aplikasi kuis sekolah full-stack. Siswa mengerjakan kuis tanpa akun. Admin mengelola kuis melalui API Express yang memverifikasi Firebase ID token dan profil admin.

## Status

Fondasi aplikasi dan alur siswa sudah tersedia: daftar kuis, identitas, attempt, soal publik tanpa kunci, penilaian backend, pencegahan submit ulang, hasil sesuai pengaturan, rules deny-by-default, setup admin, login Firebase Email/Password, dashboard admin dasar, dan unit test scoring. Modul CRUD admin lengkap masih perlu dilanjutkan sebelum produksi.

## Teknologi

React, Vite, React Router, Express, Firebase Admin, Firestore, Firebase Authentication, Vitest, Testing Library, Framer Motion, Lucide React, react-hot-toast, dan xlsx.

## Menyiapkan

1. Gunakan Node.js 20 atau lebih baru.
2. Jalankan `npm install`.
3. Salin `.env.example` menjadi `.env` hanya jika `.env` belum ada. Jangan menimpa `.env` yang sudah ada.
4. Isi konfigurasi client `VITE_FIREBASE_*` dan server `FIREBASE_PROJECT_ID`, `FIREBASE_CLIENT_EMAIL`, `FIREBASE_PRIVATE_KEY`. Alternatif lokal: `GOOGLE_APPLICATION_CREDENTIALS` menunjuk file service account yang tidak masuk Git.
5. Isi `ADMIN_EMAIL` dan password admin minimal 8 karakter. Password jangan disimpan di repository.
6. Aktifkan Firestore dan Firebase Authentication Email/Password pada Firebase Console.

Backend mencari kredensial dengan urutan `FIREBASE_PROJECT_ID` + `FIREBASE_CLIENT_EMAIL` + `FIREBASE_PRIVATE_KEY`, lalu `GOOGLE_APPLICATION_CREDENTIALS`, lalu file service account lokal dengan nama yang sudah disediakan. File service account jangan disimpan ke repository.

## Menjalankan

Terminal 1: `npm run dev:server`

Terminal 2: `npm run dev`

Frontend berjalan pada `http://localhost:5173`, API pada `http://localhost:3001`, health check pada `/api/health`.

Bootstrap idempoten: `npm run setup-db`. Script membuat atau memakai akun admin, menetapkan custom claim admin, membuat profil `users`, dan settings `general`. Setelah claim berubah, admin perlu login ulang atau refresh ID token.

## Pemeriksaan

- `npm run lint`
- `npm run test`
- `npm run build`

Firebase Emulator belum dijalankan. Pengujian terhadap Firestore sebenarnya membutuhkan service account server valid. Jangan menjalankan setup pada project produksi tanpa memastikan project ID dan backup.

## API

Publik: `GET /api/student/quizzes`, `GET /api/student/quiz-questions?quizId=...`, `POST /api/student/start`, `POST /api/student/submit`, `GET /api/student/result?submissionId=...`.

Admin dengan `Authorization: Bearer <Firebase ID token>`: `GET /api/admin/dashboard`, `GET /api/admin/quizzes`, `POST /api/admin/quizzes`, `GET /api/admin/submissions`, `GET /api/admin/settings`.

## Model keamanan

Frontend tidak mengakses Firestore langsung. Rules menolak akses client ke quiz, questions, attempts, submissions, dan settings; operasi sensitif melalui Express Admin SDK. Endpoint siswa hanya mengirim opsi `id` dan `text`, tidak `isCorrect` atau `point`. Nilai resmi dihitung dari data Firestore oleh server. Waktu disimpan sebagai Firestore Timestamp dan jadwal dibandingkan oleh server.

Identitas siswa tanpa login tidak dapat menjamin identitas personal secara absolut. `allowRetake` dan normalisasi identitas perlu dilengkapi saat modul admin selesai.

## Struktur penting

- `server/`: Express, middleware auth/error, route student/admin, Firebase Admin, scoring.
- `src/`: React app, API client, halaman siswa.
- `scripts/setup-db.js`: bootstrap database dan admin.
- `firestore.rules`: rules deny-by-default.
- `.env.example`: template konfigurasi tanpa rahasia.

## Produksi

Jalankan backend Node.js persisten dengan environment variable server. Jangan menaruh private key pada `VITE_*`, frontend, log, atau repository. Tambahkan domain publik ke Authorized Domains Firebase Authentication. Deploy rules memakai Firebase CLI setelah rules direview. Deployment aplikasi belum dilakukan.
=======
# sekolah-web
>>>>>>> c335cdf30e5cfbf5df537eb0c3c183bfd53cb023
