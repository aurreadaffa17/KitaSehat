const LABEL_LEVEL = ['', 'Hemat', 'Sedang', 'Lebih tinggi'];

const DOKTER = DAFTAR_DOKTER;
let spes = 'Semua';

function tampil() {
  $('daftar').innerHTML = DOKTER.filter((d) => spes === 'Semua' || d.spesialis === spes)
    .map(
      (d) => `
      <div class="col-md-6 col-lg-4">
        <article class="card card-body h-100 gap-2">
          <div class="d-flex gap-3 align-items-center">
            <div class="avatar">${d.spesialis[0]}</div>
            <div>
              <h3 class="h6 mb-0">${d.nama}</h3>
              <span class="text-secondary small">${d.spesialis}</span>
            </div>
          </div>
          <div>
            <b class="text-primary" aria-label="Level biaya ${LABEL_LEVEL[d.level]}">
              ${'Rp '.repeat(d.level).trim()}
            </b>
            <span class="text-secondary small">${LABEL_LEVEL[d.level]}</span>
          </div>
          <span class="${d.online ? 'text-success fw-semibold' : 'text-secondary'}">
            ${d.online ? 'Online sekarang' : 'Jadwal: [jam praktik]'}
          </span>
          <button class="btn btn-primary mt-auto" data-id="${d.id}">Mulai konsultasi</button>
        </article>
      </div>`
    )
    .join('');
}

chipGroup($('filter'), ['Semua', 'Dokter umum', 'Kulit dan kelamin', 'Kesehatan jiwa', 'Gizi'], {
  awal: ['Semua'],
  onChange: (v) => {
    spes = v[0];
    tampil();
  }
});

$('daftar').onclick = (e) => {
  const tombol = e.target.closest('button');
  if (!tombol) return;

  Auth.need(() => {
    sessionStorage.setItem('ks_dokter', tombol.dataset.id);
    location.href = 'chat.html';
  });
};

tampil();
