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
          <div class="modal-dialog modal-dialog-centered">
            <form class="modal-content" id="f-login">
              <div class="modal-header">
                <h2 class="modal-title fs-4" id="lg-judul">Masuk ke KitaSehat</h2>
                <button type="button" class="btn-close" data-bs-dismiss="modal"
                  aria-label="Tutup"></button>
              </div>
              <div class="modal-body vstack gap-3">
                <div class="alert alert-danger mb-0 d-none" id="lg-galat"></div>
                <input id="lg-nama" class="form-control" placeholder="Nama"
                  aria-label="Nama" maxlength="40" style="display: none" />
                <input id="lg-email" type="email" class="form-control" required
                  placeholder="Email" aria-label="Email" />
                <input id="lg-pass" type="password" class="form-control" required
                  minlength="6" placeholder="Kata sandi (minimal 6 karakter)"
                  aria-label="Kata sandi" />
              </div>
              <div class="modal-footer flex-column align-items-stretch gap-2">
                <button class="btn btn-primary" id="lg-kirim">Lanjut</button>
                <button type="button" class="btn btn-outline-primary" id="lg-ganti">
                  Belum punya akun? Daftar
                </button>
              </div>
            </form>
          </div>
        </div>`
      );

      let daftar = false;

      $('lg-ganti').onclick = () => {
        daftar = !daftar;
        $('lg-nama').style.display = daftar ? 'block' : 'none';
        $('lg-judul').textContent = daftar ? 'Daftar akun' : 'Masuk ke KitaSehat';
        $('lg-ganti').textContent = daftar ? 'Sudah punya akun? Masuk' : 'Belum punya akun? Daftar';
      };

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
};
