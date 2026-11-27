const idArtikel = param('id');

if (idArtikel !== null && ARTIKEL[Number(idArtikel)]) {
    tampilDetail(ARTIKEL[Number(idArtikel)]);
} else {
    tampilDaftar();
}

function tampilDetail(a) {
    $('daftar').hidden = true;
    $('detail').hidden = false;

    const bagian = a.bagian
        .map((b) => `<h2 class="h4 mt-4">${b[0]}</h2><p class="fs-5">${b[1]}</p>`)
        .join('');
    const terkait = ARTIKEL.filter((x) => x !== a)
        .slice(0, 3)
        .map(kartuArtikel)
        .join('');

    $('detail').innerHTML = `
        <a href="artikel.html" class="fw-semibold text-decoration-none">‹ Kembali ke artikel</a>
        <div class="mt-3"><span class="badge ks-tag">Terverifikasi dokter</span></div>
        <h1 class="my-3">${a.judul}</h1>
        <div class="text-secondary small">
            ${a.kategori} · 4 menit baca · Ditinjau oleh dr. [Nama] · Diperbarui [tanggal]
        </div>
        <div class="thumb rounded-4 my-4" style="height: 240px; background-image: url('${a.gambar}'), linear-gradient(135deg, #78c9f2, #ddf3ff)"></div>
        <div class="ks-mist rounded-3 p-3"><b>Intinya</b><p class="mb-0">${a.ringkas}</p></div>
        ${bagian}
        <div class="alert alert-danger mt-4">
            <b>Segera periksa ke tenaga kesehatan jika:</b><br />${a.bahaya}
        </div>
        <p class="text-secondary small">
            Sumber: [nama dokter atau lembaga]. Artikel ini bersifat edukatif dan bukan pengganti diagnosis.
        </p>
        <h2 class="h4 mt-5 mb-3">Artikel terkait</h2>
        <div class="row g-3">${terkait}</div>`;
}

function tampilDaftar() {
    let kategori = 'Semua';

    const tampil = () => {
        const q = $('cari').value.toLowerCase();
        const hasil = ARTIKEL.filter((a) => {
            const cocokKategori = kategori === 'Semua' || a.kategori === kategori;
            return cocokKategori && a.judul.toLowerCase().includes(q);
        });

        $('hasil').innerHTML = hasil.length
            ? hasil.map(kartuArtikel).join('')
            : '<p class="text-secondary">Tidak ada artikel yang cocok.</p>';
    };

    chipGroup($('kategori'), ['Semua', 'Pencegahan', 'Gaya hidup', 'Gejala'], {
        awal: ['Semua'],
        onChange: (v) => {
            kategori = v[0];
            tampil();
        }
    });

    $('cari').oninput = tampil;
    tampil();
}