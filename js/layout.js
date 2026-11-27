(function () {
    const MENU = [
        ['index.html', 'Beranda', 'beranda'],
        ['cek-gejala.html', 'Cek Gejala', 'cek-gejala'],
        ['konsultasi.html', 'Konsultasi', 'konsultasi'],
        ['apotek.html', 'Apotek', 'apotek'],
        ['artikel.html', 'Artikel', 'artikel']
    ];
    const aktif = document.body.dataset.page;

    const itemMenu = MENU.map(([href, nama, kode]) => {
        const kelas = kode === aktif ? ' active' : '';
        const cur = kode === aktif ? ' aria-current="page"' : '';
        return `<li class="nav-item"><a class="nav-link${kelas}" href="${href}"${cur}>${nama}</a></li>`;
    }).join('');

    const linkFooter = MENU.map(
        ([href, nama]) => `<li><a class="text-white text-decoration-none" href="${href}">${nama}</a></li>`
    ).join('');

    $('site-header').innerHTML = `
        <div id="banner"></div>
        <nav class="navbar navbar-expand-md bg-primary" data-bs-theme="dark">
            <div class="container">
                <a class="navbar-brand fw-bold fs-4" href="index.html">
                    <img src="assets/logo.png" alt="" width="34" height="34" class="me-2" onerror="this.remove()" />KitaSehat
                </a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#menu" aria-label="Buka menu">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="menu">
                    <ul class="navbar-nav ms-auto align-items-md-center gap-md-3">
                        ${itemMenu}
                        <li class="nav-item mt-2 mt-md-0" id="slot-akun"></li>
                    </ul>
                </div>
            </div>
        </nav>`;

    $('site-footer').innerHTML = `
        <footer class="bg-primary text-white py-4 position-relative">
            <div class="container">
                <button class="btn btn-danger position-absolute top-0 end-0 mt-3 me-3" data-bs-toggle="modal" data-bs-target="#m-darurat">Darurat</button>
                <div class="row g-3">
                    <div class="col-md-8">
                        <div class="fw-bold fs-5">KitaSehat</div>
                        <p class="mb-0" style="max-width: 36ch">
                            Menemani anda menemukan layanan dan informasi kesehatan untuk langkah yang lebih baik, bersama.
                        </p>
                    </div>
                    <div class="col-md-4">
                        <div class="fw-bold">KitaSehat</div>
                        <ul class="list-unstyled mb-0">${linkFooter}</ul>
                    </div>
                </div>
                <p class="text-center small mt-4 mb-0">© 2026 KitaSehat. Konsep desain untuk hidup lebih sehat. Informasi bersifat edukatif dan bukan pengganti diagnosis tenaga kesehatan.</p>
            </div>
        </footer>

        <div class="modal fade" id="m-darurat" tabindex="-1" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        <h2 class="modal-title fs-4">Butuh bantuan sekarang?</h2>
                        <button class="btn-close" data-bs-dismiss="modal" aria-label="Tutup"></button>
                    </div>
                    <div class="modal-body vstack gap-2">
                        <p class="text-secondary mb-1">Jangan menunggu hasil cek gejala.</p>
                        <a class="btn btn-danger" href="tel:119">Ambulans dan gawat darurat: 119</a>
                        <a class="btn btn-danger" href="tel:112">Layanan darurat umum: 112</a>
                    </div>
                </div>
            </div>
        </div>`;        

    Auth.init();
    Auth.renderButton();
})();