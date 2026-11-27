const ARTIKEL = [
    {
        judul: 'Cegah Stroke Sejak Muda, Kemenkes Anjurkan Pola Hidup Sehat',
        kategori: 'Pencegahan',
        gambar: 'assets/artikel_1.png',
        ringkas: 'Stroke bisa dicegah sejak usia muda dengan menerapkan pola hidup sehat, membatasi konsumsi gula, garam, dan lemak, serta rutin memeriksa tekanan darah dan kondisi kesehatan secara berkala.',
        bagian: [
            ['Mengapa penting', 'Stroke tidak hanya menyerang lansia, tetapi juga semakin banyak dialami usia muda akibat gaya hidup tidak sehat. Menerapkan kebiasaan baik sejak dini menjaga pembuluh darah tetap sehat dan mencegah risiko penyumbatan atau pecahnya pembuluh darah otak.'],
            ['Langkah sederhana', 'Terapkan perilaku CERDIK dari Kemenkes (Cek kesehatan rutin, Enyahkan asap rokok, Rajin aktivitas fisik, Diet seimbang, Istirahat cukup, Kelola stres), serta batasi makanan cepat saji, minuman manis, dan begadang.']
        ],
        bahaya: 'muncul gejala mendadak seperti senyum tidak simetris, gerak separuh anggota tubuh melemah, bicara pelo atau sulit dimengerti, kebas/baal separuh tubuh, rabun pada satu mata, atau sakit kepala hebat yang muncul tiba-tiba (SeGeRa Ke RS).'
    },
    {
        judul: 'Pencegahan Demam Berdarah',
        kategori: 'Pencegahan',
        gambar: 'assets/artikel_2.png',
        ringkas: 'Demam berdarah dengue (DBD) dapat dicegah secara efektif dengan memutus siklus perkembangbiakan nyamuk Aedes aegypti melalui gerakan 3M Plus serta melindungi diri dari gigitan nyamuk.',
        bagian: [
            [
                'Mengapa pencegahan DBD penting',
                'Nyamuk pembawa virus dengue sangat mudah berkembang biak di genangan air bersih sekitar rumah, terutama saat musim hujan. Tanpa pemberantasan sarang nyamuk yang rutin, penularan dapat menyebar cepat ke seluruh anggota keluarga dan lingkungan sekitar'],
            [
                'Gerakan 3M Plus', 
                'Terapkan 3M Plus: Menguras tempat penampungan air secara rutin, Menutup rapat wadah penyimpanan air, dan Mendaur ulang barang bekas yang berpotensi menampung air hujan. Lengkapi dengan memakai losion antinyamuk, memasang kelambu atau kasa ventilasi, menanam tanaman pengusir nyamuk, serta mempertimbangkan vaksinasi dengue.']
        ],
        bahaya: 'mengalami demam tinggi mendadak selama 2-7 hari disertai sakit kepala berat, nyeri di belakang mata, nyeri otot/sendi, mual muntah, muncul bintik merah di kulit, mimisan, gusi berdarah, atau nyeri perut hebat.'
    },
    {
        judul: 'Pendekatan Lifestyle Medicine untuk Indonesia Sehat',
        kategori: 'Gaya hidup',
        gambar: 'assets/artikel_3.png',
        ringkas: 'Lifestyle medicine adalah pendekatan medis berbasis bukti ilmiah yang berfokus pada perubahan gaya hidup sehari-hari untuk mencegah, mengelola, bahkan memulihkan berbagai penyakit kronis.'
        bagian: [
            [
                'Mengapa lifestyle medicine penting',
                'Sebagian besar penyakit kronis seperti diabetes tipe 2, hipertensi, obesitas, dan penyakit jantung dipicu oleh kebiasaan hidup yang kurang sehat. Mengatasi akar penyebab melalui perbaikan pola hidup membantu menurunkan ketergantungan obat jangka panjang dan meningkatkan kualitas hidup secara menyeluruh.'],
            [
                'Pilar utama lifestyle medicine', 
                'Terapkan enam pilar utama: mengonsumsi makanan utuh bergizi seimbang (dominan nabati), melakukan aktivitas fisik rutin, menjaga kualitas tidur yang cukup, mengelola stres dengan sehat, menghindari zat berbahaya seperti rokok dan alkohol, serta membangun hubungan sosial yang positif.']
        ],
        bahaya: 'Anda memiliki faktor risiko atau riwayat penyakit kronis (seperti tekanan darah tinggi, gula darah tinggi, atau kolesterol tinggi) dan ingin menyusun program perubahan pola makan maupun olahraga yang aman sesuai kondisi tubuh.'
    },
    {
        judul: 'Gaya Hidup Sehat Ala Gen Z',
        kategori: 'Gaya hidup',
        gambar: 'assets/artikel_4.png',
        ringkas: 'Gaya hidup sehat bagi Gen Z perlu dijalankan secara realistis sesuai kebutuhan biologis tubuh, bukan sekadar mengikuti tren media sosial atau tekanan lingkungan pergaulan.'
        bagian: [
            [
                'Tantangan gaya hidup sehat pada generasi muda',
                'Paparan tren kebugaran di media sosial sering memicu standar yang tidak realistis, diet ekstrem, atau olahraga berlebihan demi validasi sosial. Di sisi lain, kebiasaan begadang, konsumsi minuman tinggi gula, dan stres akademik maupun pekerjaan tetap menjadi ancaman kesehatan utama anak muda urban'],
            [
                'Tips menjaga kesehatan secara seimbang bagi Gen Z', 
                'Fokus pada konsistensi kebiasaan dasar daripada tren sesaat: penuhi kebutuhan cairan dan gizi seimbang, atur jadwal tidur teratur, pilih aktivitas fisik yang disukai agar berkelanjutan, serta jaga kesehatan mental dengan membatasi paparan media sosial yang memicu perbandingan diri.']
        ],
        bahaya: 'mengalami kelelahan berkepanjangan, gangguan pola makan ekstrem, penurunan atau kenaikan berat badan drastis, gangguan tidur berat, atau kecemasan yang mengganggu aktivitas harian.'
    },
    {
        judul: 'Mengenali Gejala Diabetes Sejak Dini',
        kategori: 'Gejala',
        gambar: 'assets/artikel_5.png',
        ringkas: 'Diabetes sering berkembang secara perlahan tanpa disadari, sehingga mengenali tanda-tanda awalnya sangat penting agar kadar gula darah bisa segera dikendalikan sebelum memicu komplikasi.'
        bagian: [
            [
                'Mengapa mengenali gejala diabetes penting',
                'Kadar gula darah tinggi yang dibiarkan terus-menerus dapat merusak pembuluh darah dan saraf, sehingga berisiko menyebabkan komplikasi serius seperti gangguan penglihatan, kerusakan ginjal, penyakit jantung, hingga luka yang sulit sembuh.'],
            [
                'Gejala umum diabetes yang perlu diwaspadai', 
                'Kenali gejala klasik 3P: sering buang air kecil terutama di malam hari (poliuria), rasa haus berlebihan (polidipsia), dan mudah lapar terus-menerus (polifagia). Gejala penyerta lainnya meliputi penurunan berat badan tanpa sebab jelas, tubuh mudah lelah, pandangan kabur, kesemutan di tangan/kaki, serta luka yang lama sembuh.']
        ],
        bahaya: 'mengalami kombinasi gejala sering haus, sering buang air kecil, dan penurunan berat badan drastis, atau mengalami tanda darurat seperti napas berbau buah, mual muntah hebat, sesak napas, hingga penurunan kesadaran.'
    },
    {
        judul: 'Mengenal dan Menangani Flu Singapura',
        kategori: 'Gejala',
        gambar: 'assets/artikel_6.png',
        ringkas: 'Flu Singapura (Hand, Foot, and Mouth Disease / HFMD) adalah infeksi virus menular yang umumnya menyerang anak-anak dengan ciri khas ruam atau lenting di tangan, kaki, dan sariawan di mulut.'
        bagian: [
            [
                'Mengapa flu Singapura mudah menular',
                'Penyakit yang umumnya disebabkan oleh virus Coxsackie ini menyebar sangat cepat melalui percikan batuk/bersin, cairan dari lenting kulit, air liur, maupun permukaan benda yang terkontaminasi, terutama di lingkungan sekolah atau tempat bermain anak.'],
            [
                'Tips pencegahan dan perawatan di rumah', 
                'Biasakan mencuci tangan dengan sabun dan air mengalir, rutin membersihkan mainan serta permukaan benda yang sering disentuh, dan istirahatkan penderita di rumah hingga sembuh agar tidak menulari orang lain. Selama sakit, berikan cukup cairan dingin/sejuk dan makanan lunak agar anak tetap nyaman menelan.']
        ],
        bahaya: 'penderita tidak mau minum sama sekali sehingga muncul tanda dehidrasi (mulut kering, jarang buang air kecil, menangis tanpa air mata), demam tinggi tidak turun lebih dari 3 hari, tampak sangat lemas, atau mengalami kejang.'
    }
];

const kartuArtikel = (a) => {
    const i = ARTIKEL.indexOf(a);
    return `
        <div class="col-sm-6 col-lg-3">
            <a class="card h-100 text-decoration-none text-reset" href="artikel.html?id=${i}">
                <div class="thumb" style="background-image: url('${a.gambar}'), linear-gradient(135deg, #78c9f2, #ddf3ff)"></div>
                <div class="card-body">
                    <span class="badge ks-tag">Terverifikasi dokter</span>
                    <h3 class="h6 text-primary mt-2">${a.judul}</h3>
                    <span class="text-secondary small">${a.kategori}</span>
                </div>
            </a>
        </div>`;
};
