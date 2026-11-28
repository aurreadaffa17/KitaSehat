const Auth = {
  _u: null,
  _pending: null,
  ready: Promise.resolve(),

  init() {
    const id = store.get('ks_sesi', null);
    const u = store.get('ks_users', []).find((x) => x.id === id);
    Auth._u = u ? { id: u.id, nama: u.nama, email: u.email } : null;
    return Auth.ready;
  },

  user() {
    return Auth._u ? Auth._u.nama : null;
  },

  need(fn) {
    if (Auth._u) {
      fn();
    } else {
      Auth._pending = fn;
      Auth.modal().show();
    }
  },

  daftar(nama, email, pass) {
    nama = nama.trim();
    email = email.trim().toLowerCase();
    if (!nama) throw new Error('Nama wajib diisi');
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) throw new Error('Format email tidak benar');
    if (pass.length < 6) throw new Error('Kata sandi minimal 6 karakter');

    const semua = store.get('ks_users', []);
    if (semua.some((u) => u.email === email)) throw new Error('Email sudah terdaftar');

    const id = semua.reduce((m, u) => Math.max(m, u.id), 0) + 1;
    semua.push({ id, nama, email, sandi: pass });
    store.set('ks_users', semua);
    store.set('ks_sesi', id);
    Auth._u = { id, nama, email };
  },

  masuk(email, pass) {
    email = email.trim().toLowerCase();
    const u = store.get('ks_users', []).find((x) => x.email === email && x.sandi === pass);
    if (!u) throw new Error('Email atau kata sandi salah');
    store.set('ks_sesi', u.id);
    Auth._u = { id: u.id, nama: u.nama, email: u.email };
  },

  keluar() {
    store.set('ks_sesi', null);
    Auth._u = null;
    location.href = 'index.html';
  },

  renderButton() {
    const slot = $('slot-akun');
    if (!slot) return;

    if (Auth._u) {
      slot.innerHTML = `
        <div class="dropdown">
          <button class="btn btn-light dropdown-toggle" data-bs-toggle="dropdown">
            Halo, ${esc(Auth._u.nama)}
          </button>
          <ul class="dropdown-menu dropdown-menu-end">
            <li><a class="dropdown-item" href="pesanan.html">Pesanan saya</a></li>
            <li><button class="dropdown-item" id="btn-keluar">Keluar</button></li>
          </ul>
        </div>`;
      $('btn-keluar').onclick = Auth.keluar;
    } else {
      slot.innerHTML = '<button class="btn btn-light" id="btn-login">Log in</button>';
      $('btn-login').onclick = () => Auth.modal().show();
    }
  },

    modal() {
    if (!$('m-login')) {
      document.body.insertAdjacentHTML(
        'beforeend',
        `
        <div class="modal fade" id="m-login" tabindex="-1" aria-hidden="true">
          <div class="modal-dialog modal-dialog-centered modal-lg ks-auth">
            <form class="modal-content" id="f-login">
              <div class="row g-0">

                <!-- panel biru kiri -->
                <div class="col-md-5 ks-auth-side d-none d-md-flex flex-column">
                  <div class="fw-bold fs-4 d-flex align-items-center gap-2">
                    <img src="assets/logo.png" alt="" width="30" height="30"
                      onerror="this.remove()" />KitaSehat
                  </div>
                  <div class="ks-glass mt-auto">
                    <svg class="ks-ic" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z" />
                    </svg>
                    <h3 class="h6">Akses Layanan Kesehatan Terpercaya</h3>
                    <p class="small mb-0">
                      Pesan obat, konsultasi apoteker, dan pantau riwayat kesehatan Anda dalam
                      satu platform yang aman.
                    </p>
                  </div>
                  <div class="row g-2 mt-1">
                    <div class="col-6">
                      <div class="ks-glass h-100">
                        <b class="fs-4">100%</b>
                        <div class="small">Obat Resmi BPOM</div>
                      </div>
                    </div>
                    <div class="col-6">
                      <div class="ks-glass h-100">
                        <b class="fs-4">24/7</b>
                        <div class="small">Layanan Konsultasi</div>
                      </div>
                    </div>
                  </div>
                  <div class="small mt-4 opacity-75">
                    © 2026 KitaSehat. Konsep desain untuk hidup lebih sehat.
                  </div>
                </div>

                <!-- form kanan -->
                <div class="col-md-7 p-4 p-md-5 position-relative">
                  <button type="button" class="btn-close position-absolute top-0 end-0 m-3"
                    data-bs-dismiss="modal" aria-label="Tutup"></button>

                  <span class="ks-pill">Portal Pengguna</span>
                  <h2 class="h3 fw-bold mt-3 mb-1" id="lg-judul">Selamat Datang Kembali</h2>
                  <p class="small text-secondary" id="lg-sub">
                    Silakan masukkan detail identitas Anda untuk melanjutkan akses.
                  </p>

                  <div class="alert alert-danger py-2 d-none" id="lg-galat"></div>

                  <div class="mb-3 d-none" id="box-nama">
                    <label for="lg-nama">Nama Lengkap</label>
                    <input id="lg-nama" class="form-control" maxlength="40"
                      placeholder="Masukkan minimal 3 karakter" />
                  </div>
                  <div class="mb-3">
                    <label for="lg-email">Alamat Email</label>
                    <input id="lg-email" type="email" class="form-control" required
                      placeholder="nama@email.com" />
                  </div>
                  <div class="mb-3">
                    <div class="d-flex justify-content-between">
                      <label for="lg-pass">Password</label>
                      <a href="#" class="ks-link small" data-belum>Lupa Password?</a>
                    </div>
                    <div class="input-group">
                      <input id="lg-pass" type="password" class="form-control" required
                        minlength="6" placeholder="Masukkan minimal 6 karakter" />
                      <button type="button" class="btn btn-outline-primary" id="lg-mata">
                        Lihat
                      </button>
                    </div>
                  </div>

                  <div class="form-check mb-3">
                    <input class="form-check-input" type="checkbox" id="lg-ingat" />
                    <label class="form-check-label small fw-normal" for="lg-ingat">
                      Ingat saya di perangkat ini
                    </label>
                  </div>

                  <button class="btn btn-primary w-100 mb-2" id="lg-kirim">Sign In →</button>
                  <button type="button" class="btn btn-outline-primary w-100" data-belum>
                    Sign in dengan Google
                  </button>

                  <p class="text-center small mt-4 mb-0">
                    <span id="lg-tanya">Belum memiliki akun?</span>
                    <button type="button" class="btn btn-link ks-link p-0 align-baseline"
                      id="lg-ganti">Daftar sekarang</button>
                  </p>
                </div>

              </div>
            </form>
          </div>
        </div>`
      );

      let daftar = false;

      $('lg-ganti').onclick = () => {
        daftar = !daftar;
        $('box-nama').classList.toggle('d-none', !daftar);
        $('lg-judul').textContent = daftar ? 'Buat Akun Baru' : 'Selamat Datang Kembali';
        $('lg-sub').textContent = daftar
          ? 'Lengkapi nama, email, dan password untuk mendaftar layanan.'
          : 'Silakan masukkan detail identitas Anda untuk melanjutkan akses.';
        $('lg-kirim').textContent = daftar ? 'Daftar & Sign In →' : 'Sign In →';
        $('lg-tanya').textContent = daftar ? 'Sudah memiliki akun?' : 'Belum memiliki akun?';
        $('lg-ganti').textContent = daftar ? 'Sign In di sini' : 'Daftar sekarang';
      };

      $('lg-mata').onclick = () => {
        const tampak = $('lg-pass').type === 'text';
        $('lg-pass').type = tampak ? 'password' : 'text';
        $('lg-mata').textContent = tampak ? 'Lihat' : 'Sembunyi';
      };

      document.querySelectorAll('#m-login [data-belum]').forEach((el) => {
        el.onclick = (e) => {
          e.preventDefault();
          $('lg-galat').textContent = 'Fitur ini belum tersedia di versi prototipe.';
          $('lg-galat').classList.remove('d-none');
        };
      });

      $('f-login').onsubmit = (e) => {
        e.preventDefault();
        $('lg-galat').classList.add('d-none');

        try {
          if (daftar) Auth.daftar($('lg-nama').value, $('lg-email').value, $('lg-pass').value);
          else Auth.masuk($('lg-email').value, $('lg-pass').value);

          Auth.modal().hide();
          e.target.reset();
          Auth.renderButton();

          const lanjut = Auth._pending;
          Auth._pending = null;
          if (lanjut) lanjut();
        } catch (err) {
          $('lg-galat').textContent = err.message;
          $('lg-galat').classList.remove('d-none');
        }
      };
    }
    return bootstrap.Modal.getOrCreateInstance($('m-login'));
  }
}