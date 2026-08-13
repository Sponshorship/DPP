tailwind.config = {
    theme: {
        extend: {
            colors: {
                brand: {
                    dark: '#03191e',
                    navy: '#0b2545',
                    emerald: '#064e3b',
                    accent: '#d97706',
                    gold: '#f59e0b',
                    goldlight: '#fef3c7'
                }
            },
            fontFamily: {
                sans: ['Poppins', 'sans-serif']
            }
        }
    }
};

const targetDate = new Date("August 22, 2026 08:00:00").getTime();

function updateCountdown() {
    const now = new Date().getTime();
    const difference = targetDate - now;

    if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        document.getElementById("cd-days").innerText = days < 10 ? "0" + days : days;
        document.getElementById("cd-hours").innerText = hours < 10 ? "0" + hours : hours;
        document.getElementById("cd-minutes").innerText = minutes < 10 ? "0" + minutes : minutes;
        document.getElementById("cd-seconds").innerText = seconds < 10 ? "0" + seconds : seconds;
    } else {
        document.getElementById("cd-days").innerText = "00";
        document.getElementById("cd-hours").innerText = "00";
        document.getElementById("cd-minutes").innerText = "00";
        document.getElementById("cd-seconds").innerText = "00";
    }
}

function selectPackage(packageName) {
    const selectElement = document.getElementById("pilihanKolaborasi");
    selectElement.value = packageName;
    document.getElementById("kontak").scrollIntoView({ behavior: "smooth" });
}

function sendToWhatsApp(event) {
    event.preventDefault();

    const namaOrtu = document.getElementById("namaOrtu").value.trim();
    const namaSantri = document.getElementById("namaSantri").value.trim();
    const namaUsaha = document.getElementById("namaUsaha").value.trim() || "-";
    const bentukKolaborasi = document.getElementById("pilihanKolaborasi").value;
    const phoneNumber = document.getElementById("nomorTelepon").value;

    if (!phoneNumber) {
        alert("Silakan pilih nomor telepon tujuan terlebih dahulu.");
        return;
    }

    let message = "Assalamu'alaikum Warahmatullahi Wabarakatuh,\n\n";
    message += "Kami bermaksud untuk menyampaikan kesediaan sinergi untuk Acara Debat Terbuka & Pelantikan SLC - TVC.\n\n";
    message += "*Detail Data Wali Santri:*\n";
    message += `• *Nama Orang Tua/Wali:* ${namaOrtu}\n`;
    message += `• *Nama Santri:* ${namaSantri}\n`;
    message += `• *Nama Usaha/Brand:* ${namaUsaha}\n`;
    message += `• *Bentuk Kolaborasi:* ${bentukKolaborasi}\n\n`;
    message += "Mohon info petunjuk dan koordinasi selanjutnya dari Panitia. Terima kasih.\n\nWassalamu'alaikum Warahmatullahi Wabarakatuh.";

    const encodedMessage = encodeURIComponent(message);
    const waUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

    window.open(waUrl, "_blank");
}

setInterval(updateCountdown, 1000);
updateCountdown();
