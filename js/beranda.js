$('a-terbaru').innerHTML = ARTIKEL.map(kartuArtikel).join('');

chipGroup($('hero-chips'), ['Demam', 'Batuk', 'Sakit kepala', 'Diare'], { 
    onChange: (v) => {        
        $('hero-q').value = v[0];
    }
});

$('hero-form').onsubmit = (e) => {
    e.preventDefault();
    const q = $('hero-q').value.trim();
    location.href = 'cek-gejala.html' + (q ? '?q=' + encodeURIComponent(q) : '');
};

$('btn-lokasi').onclick = () => {
    if (!navigator.geolocation) return bukaMaps('puskesmas terdekat');

    navigator.geolocation.getCurrentPosition(
        (p) => bukaMaps('puskesmas', p.coords.latitude + ',' + p.coords.longitude),
        () => bukaMaps('puskesmas terdekat'),
        { timeout: 6000 }
    );
};

$('form-faskes').onsubmit = (e) => {
    e.preventDefault();
    const v = $('q-faskes').value.trim();
    bukaMaps('puskesmas dan klinik ' + (v ? 'di ' + v : 'terdekat'));
};