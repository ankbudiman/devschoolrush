# SCHOOL RUSH

Penerbit: **LAH?** (Little Acts of Havoc). Dahulu dikenali sebagai Sekolah Run!

Game web 3D low poly tentang kehidupan sekolah.

## Struktur
- `index.html` : halaman utama (logo, nama, watak, tetapan, cara main, kredit, lencana)
- `js/intro.js` + `css/intro.css` : splash penerbit LAH? (sekali setiap sesi tab, boleh dilangkau; buka `index.html?intro` untuk paksa tunjuk). Asingkan sepenuhnya daripada menu: padam kedua-dua fail dan dua tag dalam `index.html` untuk membuangnya
- `assets/brand/` : `school-rush-logo.webp`, `lah-logo.jpg`
- `_backup_original/` : fail asal sebelum kemas kini ini
- `world.html` : dunia sekolah (lorong, halangan, sampah, air, NPC)
- `js/core.js` : simpan data, tetapan, lencana, bunyi, skrin memuatkan
- `js/chars.js` : pembina watak dan NPC
- `js/ui.js` : panel kongsi (Cara Main, Tetapan, Kredit, Lencana)
- `js/menu.js`, `js/world-build.js`, `js/world.js`
- `js/story.js` : Mod Kelas (loceng rawak, susunan kelas rawak, pemasa, anak panah hampir tamat, pengawas, bilik placeholder). Nombor boleh diubah dalam `CFG` di bahagian atas fail
- `manifest.webmanifest`, `sw.js`, `assets/icons/` : pasang sebagai aplikasi web (skrin penuh, mengufuk). `sw.js` tidak menyimpan cache, jadi kemas kini GitHub Pages terus nampak
- Mod Kelas guna jam analog (bawah minimap) + ikon loceng. 6 slot: 7:30, 8:30, 9:30 Waktu Rehat (Kantin tetap), 10:30, 11:30, 12:30. Padang Balapan hanya slot 7:30 atau 8:30. Tetapan jadual dalam `CFG` (`js/story.js`)
- `_backup_round5/` : logo, ikon dan index.html sebelum tajuk/ikon baharu
- `_backup_round4/` : fail sebelum Round 5
- `_backup_round3/` : fail sebelum Round 4
- `css/style.css`

## Cara jalankan
Letak folder ini di GitHub Pages, atau jalankan `python3 -m http.server` dalam folder ini lalu buka `http://localhost:8000`.
Perlu internet untuk memuatkan Three.js dan fon Fredoka.

## Pasang sebagai aplikasi
- iPhone/iPad (Safari): Kongsi > Tambah ke Skrin Utama > Tambah. Buka dari ikon.
- Android (Chrome): menu tiga titik > Pasang aplikasi (atau Tambah ke skrin utama). Buka dari ikon.
