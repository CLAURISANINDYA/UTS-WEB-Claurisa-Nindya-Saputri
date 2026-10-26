// ================= DARK MODE =================

const themeToggle = document.getElementById("themeToggle");
const themeIcon = document.getElementById("themeIcon");
const themeLabel = document.getElementById("themeLabel");

// Mengubah tampilan dan ikon tombol
function setTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);

    const isDark = theme === "dark";

    themeIcon.className = isDark
        ? "bi bi-sun-fill"
        : "bi bi-moon-stars-fill";

    themeToggle.setAttribute(
        "aria-label",
        isDark ? "Ganti ke mode terang" : "Ganti ke mode gelap"
    );

    themeToggle.setAttribute("aria-pressed", String(isDark));

    if (themeLabel) {
        themeLabel.textContent = isDark
            ? "Mode Terang"
            : "Mode Gelap";
    }

    // Menyimpan pilihan tema pengguna
    localStorage.setItem("portfolio-theme", theme);
}

// Mengambil tema yang tersimpan
const savedTheme = localStorage.getItem("portfolio-theme");

setTheme(savedTheme === "dark" ? "dark" : "light");

// Mengganti tema saat tombol diklik
themeToggle.addEventListener("click", function () {
    const currentTheme =
        document.documentElement.getAttribute("data-theme");

    setTheme(currentTheme === "dark" ? "light" : "dark");
});

// menghitung estimasi 
// ================= KALKULATOR ESTIMASI HARGA =================

document.addEventListener("DOMContentLoaded", function () {
    const calcForm = document.getElementById("calcForm");
    const serviceType = document.getElementById("serviceType");
    const itemCount = document.getElementById("itemCount");
    const complexity = document.getElementById("complexity");
    const calcResult = document.getElementById("calcResult");
    const calcReset = document.getElementById("calcReset");

    // Pastikan semua elemen kalkulator ditemukan
    if (
        !calcForm ||
        !serviceType ||
        !itemCount ||
        !complexity ||
        !calcResult ||
        !calcReset
    ) {
        console.error(
            "Kalkulator gagal dijalankan. Periksa ID elemen kalkulator di HTML."
        );
        return;
    }

    // Harga dasar setiap layanan per hasil karya
    const hargaLayanan = {
        fotografi: 50000,
        desain: 75000,
        senirupa: 100000
    };

    // Pengali berdasarkan tingkat detail
    const tingkatDetail = {
        simple: 1,
        medium: 1.5,
        complex: 2
    };

    // Format angka menjadi Rupiah
    function formatRupiah(angka) {
        return new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            maximumFractionDigits: 0
        }).format(angka);
    }

    // Proses perhitungan ketika tombol diklik
    calcForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const layanan = serviceType.value;
        const jumlah = Number(itemCount.value);
        const detail = complexity.value;

        // Validasi jumlah hasil karya
        if (
            itemCount.value.trim() === "" ||
            !Number.isInteger(jumlah) ||
            jumlah < 1
        ) {
            calcResult.innerHTML = `
                <div class="alert alert-warning" role="alert">
                    <strong>Jumlah belum valid!</strong>
                    <br>Masukkan jumlah hasil karya berupa bilangan bulat minimal 1.
                </div>
            `;

            itemCount.focus();
            return;
        }

        // Pastikan pilihan layanan dan tingkat detail valid
        if (
            !Object.prototype.hasOwnProperty.call(hargaLayanan, layanan) ||
            !Object.prototype.hasOwnProperty.call(tingkatDetail, detail)
        ) {
            calcResult.innerHTML = `
                <div class="alert alert-danger" role="alert">
                    Pilihan layanan atau tingkat detail tidak valid.
                </div>
            `;
            return;
        }

        // Hitung estimasi
        const hargaDasar = hargaLayanan[layanan];
        const pengali = tingkatDetail[detail];
        const totalHarga = hargaDasar * jumlah * pengali;

        // Nama layanan dan tingkat detail
        const namaLayanan = {
            fotografi: "Fotografi",
            desain: "Desain Grafis",
            senirupa: "Seni Rupa"
        };

        const namaDetail = {
            simple: "Sederhana",
            medium: "Menengah",
            complex: "Kompleks"
        };

        // Tampilkan hasil perhitungan
        calcResult.innerHTML = `
            <div class="alert alert-success" role="status">
                <h4 class="alert-heading">
                    <i class="bi bi-calculator"></i>
                    Hasil Estimasi Harga
                </h4>

                <hr>

                <p class="mb-2">
                    <strong>Jenis layanan:</strong>
                    ${namaLayanan[layanan]}
                </p>

                <p class="mb-2">
                    <strong>Jumlah hasil karya:</strong>
                    ${jumlah}
                </p>

                <p class="mb-2">
                    <strong>Tingkat detail:</strong>
                    ${namaDetail[detail]}
                </p>

                <p class="mb-2">
                    <strong>Harga dasar per karya:</strong>
                    ${formatRupiah(hargaDasar)}
                </p>

                <p class="mb-2">
                    <strong>Pengali tingkat detail:</strong>
                    ${pengali}x
                </p>

                <hr>

                <p class="mb-0">
                    <strong>Total estimasi:</strong>
                </p>

                <h3 class="mt-2 mb-0">
                    ${formatRupiah(totalHarga)}
                </h3>
            </div>
        `;

        console.log("Kalkulator berhasil menghitung:", totalHarga);
    });

    // Tombol reset
    calcReset.addEventListener("click", function () {
        calcForm.reset();
        calcResult.innerHTML = "";
    });
});