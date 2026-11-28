const idDokter = sessionStorage.getItem('ks_dokter');
const dokter = DAFTAR_DOKTER.find((d) => String(d.id) === idDokter);

const BALASAN = [
  'Terima kasih, saya catat ya. Sudah berapa lama keluhan ini dirasakan?',
  'Apakah ada demam, mual, atau keluhan lain yang menyertai?',
  'Untuk sementara istirahat cukup dan minum air putih. ' +
    'Kalau memburuk, segera ke fasilitas kesehatan ya.',
  'Baik. Ada lagi yang ingin ditanyakan?'
];

function utas() {
  return store.get('ks_chat', []).filter((c) => c.userId === Auth._u.id && c.dokterId === dokter.id);
}

function tambah(dari, isi) {
  const semua = store.get('ks_chat', []);
  semua.push({ userId: Auth._u.id, dokterId: dokter.id, dari, isi, waktu: new Date().toISOString() });
  store.set('ks_chat', semua);
}

function kirimPesan(isi) {
  tambah('u', isi);
  const jumlah = utas().filter((c) => c.dari === 'u').length;
  tambah('d', BALASAN[(jumlah - 1) % BALASAN.length]);
}

function gambarPesan() {
  $('pesan').innerHTML = '';
  utas().forEach((p) => {
    const el = document.createElement('div');
    el.className = 'bub ' + (p.dari === 'u' ? 'u' : '');
    el.textContent = p.isi;
    $('pesan').appendChild(el);
  });
  $('pesan').scrollTop = $('pesan').scrollHeight;
}

function mulai() {
  if (!Auth._u || !dokter) {
    location.replace('konsultasi.html');
    return;
  }

  $('nama-dokter').textContent = dokter.nama;
  $('avatar').textContent = dokter.spesialis[0];

  if (!utas().length) tambah('d', 'Halo, saya ' + dokter.nama + '. Ada keluhan apa hari ini?');

  const gejala = JSON.parse(sessionStorage.getItem('ks_gejala') || '[]');
  const tanda = 'ks_gejala_terkirim_' + idDokter;
  if (gejala.length && !sessionStorage.getItem(tanda)) {
    sessionStorage.setItem(tanda, '1');
    kirimPesan('Saya merasakan: ' + gejala.join(', ') + '.');
  }

  gambarPesan();
}

$('form-chat').onsubmit = (e) => {
  e.preventDefault();
  const isi = $('isi').value.trim();
  if (!isi) return;
  $('isi').value = '';
  kirimPesan(isi);
  gambarPesan();
};

mulai();
