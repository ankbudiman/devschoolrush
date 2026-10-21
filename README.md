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
- `manifest.webmanifest`, `sw.js`, `assets/icons/` : pasang sebagai aplikasi web (skrin penuh, mengufuk). `sw.js` rangkaian dahulu (lihat Round 6b di bawah), jadi kemas kini GitHub Pages terus nampak
- Mod Kelas guna jam analog (bawah minimap) + ikon loceng. 6 loceng: 7:30, 8:30, 9:30 Waktu Rehat (Kantin tetap), 10:00, 11:00, 12:00. Padang Balapan hanya kelas 1 atau 2. 1 saat sebenar = 1/4 minit jam; masa tiba 30 saat. Lepas kelas ke-6: jalan-jalan beberapa saat, loceng balik 1:00 tengah hari (panjang, tiada pemasa/pengawas), kemudian 'Sekolah tamat' dengan butang Main lagi / Sambung jalan-jalan / Halaman utama. 'Sambung jalan-jalan' = bebas berjalan dalam Mod Kelas tanpa loceng, pemasa, jam atau pengawas. Tetapan jadual dalam `CFG` (`js/story.js`)
- Keluar (Round 6): butang Keluar di skrin utama cuba tutup; jika gagal (iPhone selalunya) paparan cara tutup. Dalam game, Kembali membuka menu Jeda (dan menutupnya semula); skrin utama guna Kembali biasa Android. `nav()` dalam `js/core.js` guna `location.replace` supaya sejarah tidak simpan halaman game lama
- `sw.js` (Round 6b): rangkaian dahulu, salinan simpanan jika luar talian atau perlahan (termasuk Three.js dan fon), supaya aplikasi terpasang masih dibuka. Jika Three.js gagal dimuat, paparan 'Cuba lagi' (bukan skrin kosong)
- Round 7 (Kantin): `kantin.html` + `js/kantin.js` (bilik merah, 5 gerai terbuka serentak, minimap, pintu keluar; semua gerai mesti siap sebelum keluar), `js/kantin-games.js` (5 mini game dari Atan & Atin: Piramid Makanan, Sarapan Seimbang, Snek Sihat, Minuman Sihat, Kebersihan Makanan), `js/kantin-data.js` (semua teks, makanan dan soalan, asing daripada kod; tempat sedia untuk tahap Mudah/Sederhana/Sukar kemudian)
- Bintang 1-3 dari kesilapan DAN masa (`stallScore`, `starsOf` dalam `js/core.js`). Gred bilik = purata skor gerai; A+ (98), A (85), B (70), C (55), D, ubah dalam `GRD` (`js/core.js`). Gred hanya dikira dalam Mod Kelas (disimpan dalam `cur.rooms`, simpanan versi 2, ada medan `level` untuk pemilih tahap kemudian). Mod Jalan-jalan = ulang kaji santai: tiada gred. Lencana dibahagi dua: Pencapaian Mod Kelas (gred setiap kelas + keseluruhan) dan Lencana Cabaran. Kad Laporan di kad 'Sekolah tamat'
- Hari Mod Kelas disimpan dalam `sessionStorage` semasa ke Kantin dan kembali ke `world.html` (`sk_day`, `sk_ret`, `sk_go`). Jika app ditutup/dimuat semula, hari bermula semula dari skrin utama. Pintu Kantin dalam Mod Jalan-jalan membuka bilik yang sama tanpa loceng
- `_backup_round7/` : fail sebelum Round 7
- Round 7b (pembaikan Kantin): bilik 85% saiz asal (tukar `ROOM` dan `CAMD` di atas `js/kantin.js`, 1 = asal), pintu pepejal dan pemain sentiasa dalam bilik, 4 set meja dan bangku, pelajar duduk dan 4 pelajar berjalan (laluan tetap, 2 sahaja bila Grafik Rendah), sampah dan 4 tong (mekanik sama seperti lorong, dikira untuk lencana Pelajar Prihatin), 6 poster dinding (data dalam `KD.posters`, `js/kantin-data.js`). Betulkan Snek Sihat: peraturan CSS `canvas` global menarik kanvas keluar dari kad, dan kini `touch-action:none` + tangkap penuding
- `_backup_round7b/` : fail sebelum Round 7b
- Round 7c: kamera kongsi dalam `js/core.js` (`CAMC`, `camMap`, `camStep`): pandangan tidak berpusing sendiri semasa berjalan; selepas 1.0 s (`CAMC.wait`) terhalang atau berjalan >70 darjah dari hadapan, ia perlahan-lahan kembali ke belakang pemain; arah joystick dikunci kepada pandangan semasa ditekan supaya tidak terbalik (laluan lorong sempit tidak lagi menggila). Kantin: dinding dan gerai yang menghalang pemain menjadi lut sinar (`FADE`), kakitangan gerai lebih tinggi, poster sampah tidak menutup label tong, Mod Jalan-jalan boleh keluar bila-bila masa (peraturan 5 gerai hanya Mod Kelas). Topeng watak tidak lagi berkelip (`js/chars.js`), butang halaman watak di tengah, butang Lompat guna ikon, 'ketik' ditukar kepada 'pilih'
- `_backup_round7c/` : fail sebelum Round 7c
- Round 8a: kamera kembali ke belakang pemain selepas 1.0 s (dahulu 1.5 s). Lorong kini ada dinding lut sinar seperti Kantin: dinding atau bumbung (dan poster, papan tanda, jam, jalur dan tingkap yang melekat padanya) pudar kepada 25% hanya apabila ia berada di antara kamera dan pemain (`WL` dan `FDS` dalam `js/world-build.js`, `fades()` dalam `js/world.js`; tukar `FADE` untuk kelegapan)
- Round 8b2: poster, tingkap dan pintu lambat menjadi pepejal bila dinding kembali pepejal. Sebab dijangka: semasa pudar dinding tidak menulis kedalaman, jadi hiasan di sebalik dinding dilukis di atasnya dan nampak menembusi sehingga dinding bertukar pepejal. Pembaikan dalam `fades()` (`js/world.js`): semasa lut sinar, susunan lukisan ditetapkan setiap bingkai dari belakang ke depan (hiasan di belakang dinding = 1, dinding = 2, hiasan di depan = 3) dan kembali ke 0 bila pepejal; sisi hiasan disimpan sebagai `sd` dalam `FDS` (`js/world-build.js`). Kelegapan, kelajuan pudar dan peraturan 'hanya bila terhalang' tidak berubah
- `_backup_round7d/` : fail sebelum Round 8a
- `_backup_round8b2/` : fail (Round 8a) sebelum Round 8b2
- `_backup_round6b/` : fail sebelum pembaikan Kembali dan sw.js
- `_backup_round6/` : fail sebelum Round 6
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
- `_backup_round6c/` : fail sebelum pembetulan butang Keluar/skrin penuh bertindih dan muat semula skrin utama selepas aplikasi lama di latar
- `_backup_round6d/` : manifest.webmanifest asal (fullscreen + mengufuk). Ujian pemasangan: kini `standalone` tanpa kunci orientasi. Jika berjaya, boleh cuba pulangkan `orientation: landscape` dahulu, kemudian `fullscreen`, satu demi satu
