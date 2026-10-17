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
- `css/style.css`

## Cara jalankan
Letak folder ini di GitHub Pages, atau jalankan `python3 -m http.server` dalam folder ini lalu buka `http://localhost:8000`.
Perlu internet untuk memuatkan Three.js dan fon Fredoka.
