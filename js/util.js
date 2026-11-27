const $ = (id) => document.getElementById(id);
const esc = (s) => { 
    const d = document.createElement('div'); 
    d.textContent = s; 
    return d.innerHTML; 
};

const rupiah = (n) => 'Rp ' + n.toLocaleString('id-ID');

const param = (k) => new URLSearchParams(location.search).get(k);

const store = {
    get(k, d) { 
        try { 
            const v = JSON.parse(localStorage.getItem(k)); 
            return v === null ? d : v; 
        } catch (e) { 
            return d;
        } 
    },
    set(k, v) {
        try { 
            localStorage.setItem(k, JSON.stringify(v));
        } catch (e) {} 
    }
};

function chipGroup(el, items, opsi = {}) {
    let pilih = opsi.awal || [];
    const gambar = () => {
        el.innerHTML = items
        .map((t) => {
            const aktif = pilih.includes(t);
            return `<button type="button" class="chip btn btn-outline-primary${aktif ? ' active' : ''}" aria-pressed="${aktif}">${esc(t)}</button>`;
        })
        .join('');
    };

    el.onclick = (e) => {
        const tombol = e.target.closest('.chip');
        if (!tombol) return;
        const teks = tombol.textContent;

        if (opsi.multi) {
            pilih = pilih.includes(teks) ? pilih.filter((x) => x !== teks) : [...pilih, teks];
        } else {
            pilih = [teks];
        }
        gambar();
        if (opsi.onChange) opsi.onChange(pilih);
    };

    gambar();
    return {
        set(v) {
            pilih = v;
            gambar();
        },
        get: () => pilih
    };
}

function accordion(id, items) {
    const isi = items
        .map(
            (x, i) => `
        <div class="accordion-item">
            <h3 class="accordion-header">
                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#${id}-${i}">${x[0]}</button>
            </h3>
            <div id="${id}-${i}" class="accordion-collapse collapse" data-bs-parent="#${id}">
                <div class="accordion-body">${x[1]}</div>
            </div>
        </div>`
        )
        .join('');
    return `<div class="accordion" id="${id}">${isi}</div>`;
}

function bukaMaps(q, ll) {
    const alamat = 'https://www.google.com/maps/search/' + encodeURIComponent(q);
    window.open(alamat + (ll ? '/@' + ll + ',15z' : ''), '_blank', 'noopener');
}

//DATA OBAT 
const DAFTAR_OBAT = [
    { id: 'parasetamol', nama: 'Parasetamol 500 mg', kemasan: 'Strip 10 tablet', harga: 5000, kategori: 'Demam dan flu' },
    { id: 'sirup-batuk', nama: 'Obat batuk sirup', kemasan: 'Botol 60 ml', harga: 15000, kategori: 'Demam dan flu' },
    { id: 'oralit', nama: 'Oralit', kemasan: 'Sachet', harga: 3000, kategori: 'Pencernaan' },
    { id: 'antasida', nama: 'Antasida tablet kunyah', kemasan: 'Strip 10 tablet', harga: 8000, kategori: 'Pencernaan' },
    { id: 'vit-c', nama: 'Vitamin C 500 mg', kemasan: 'Botol 30 tablet', harga: 25000, kategori: 'Vitamin' },
    { id: 'zinc', nama: 'Zinc 20 mg', kemasan: 'Strip 10 tablet', harga: 20000, kategori: 'Vitamin' }
];

//DATA DOKTER
const DAFTAR_DOKTER = [
    { id: 0, nama: 'dr. Bagas Pratama', spesialis: 'Dokter umum', level: 1, online: true },
    { id: 1, nama: 'dr. Amanda Putri', spesialis: 'Dokter umum', level: 1, online: false },
    { id: 2, nama: 'dr. Nadya Kusuma, Sp.KK', spesialis: 'Kulit dan kelamin', level: 2, online: true },
    { id: 3, nama: 'dr. Hendra Wijaya, Sp.KJ', spesialis: 'Kesehatan jiwa', level: 3, online: false },
    { id: 4, nama: 'dr. Clara Salsabila, S.Gz', spesialis: 'Gizi', level: 2, online: true }
];