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

function openFormModal(packageName) {
    const sinergiInput = document.getElementById("sinergi");
    const kontakSection = document.getElementById("kontak");
    const selectedPackageLabel = document.getElementById("selectedPackageLabel");

    if (sinergiInput) sinergiInput.value = packageName;
    if (selectedPackageLabel) {
        selectedPackageLabel.textContent = packageName;

        // Apply color and border based on package
        const base = 'inline-block px-4 py-2 rounded-xl border text-sm font-semibold mt-4';
        let variant = ' bg-slate-900 border-slate-800 text-white';

        if (packageName.toLowerCase().includes('gold')) {
            variant = ' bg-amber-500/10 border-amber-500/30 text-amber-400';
        } else if (packageName.toLowerCase().includes('silver')) {
            variant = ' bg-slate-800/40 border-slate-700/40 text-slate-300';
        } else if (packageName.toLowerCase().includes('in-kind') || packageName.toLowerCase().includes('in kind')) {
            variant = ' bg-emerald-500/10 border-emerald-500/30 text-emerald-400';
        }

        selectedPackageLabel.className = base + variant;
    }
    kontakSection.classList.remove("hidden");
    document.body.classList.add("overflow-hidden");
    setTimeout(() => document.getElementById("nomorTelepon").focus(), 100);
}

function closeFormModal() {
    const kontakSection = document.getElementById("kontak");
    kontakSection.classList.add("hidden");
    document.body.classList.remove("overflow-hidden");
}


function sendToWhatsApp(event) {
    event.preventDefault();

    const namaOrtu = document.getElementById("namaOrtu").value.trim();
    const namaSantri = document.getElementById("namaSantri").value.trim();
    const namaUsaha = document.getElementById("namaUsaha").value.trim() || "-";
    const bentukKolaborasi = document.getElementById("sinergi")?.value || document.getElementById("pilihanKolaborasi")?.value || "-";
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

document.querySelectorAll("[data-package]").forEach((button) => {
    button.addEventListener("click", () => {
        openFormModal(button.dataset.package);
    });
});

document.getElementById("closeForm")?.addEventListener("click", closeFormModal);
document.getElementById("kontak")?.addEventListener("click", (event) => {
    if (event.target === event.currentTarget) {
        closeFormModal();
    }
});

document.getElementById("synergyForm")?.addEventListener("submit", sendToWhatsApp);

setInterval(updateCountdown, 1000);
updateCountdown();

// ------------------ Auto-scroll + staggered reveal for paket section ------------------
(function(){
    const wrapper = document.getElementById('paketScrollWrapper');
    const track = document.getElementById('paketTrack');
    if (!wrapper || !track) return;

    const items = Array.from(track.querySelectorAll('.reveal-item'));
    let triggered = false;

    function easeInOutQuad(t){ return t<0.5 ? 2*t*t : -1+(4-2*t)*t; }

    function animateScrollTo(element, to, duration){
        const start = element.scrollLeft;
        const change = to - start;
        const startTime = performance.now();

        return new Promise((resolve) => {
            function tick(now){
                const elapsed = now - startTime;
                const t = Math.min(1, elapsed / duration);
                const eased = easeInOutQuad(t);
                element.scrollLeft = start + change * eased;
                if (t < 1) requestAnimationFrame(tick);
                else resolve();
            }
            requestAnimationFrame(tick);
        });
    }

    function revealItems(){
        items.forEach((it, idx) => {
            it.style.transitionDelay = `${idx * 120}ms`;
            requestAnimationFrame(() => it.classList.add('is-visible'));
        });
    }

    async function playAutoScroll(){
        // start from far right
        const maxScroll = track.scrollWidth - wrapper.clientWidth;
        if (maxScroll <= 0) return;

        wrapper.scrollLeft = maxScroll;

        // small pause then smooth scroll to 0 over duration
        await new Promise(r => setTimeout(r, 250));
        const duration = Math.max(700, Math.min(2200, Math.floor(maxScroll * 4))); // dynamic duration
        await animateScrollTo(wrapper, 0, duration);
    }

    const io = new IntersectionObserver((entries) =>{
        entries.forEach(entry => {
            if (entry.isIntersecting && !triggered){
                triggered = true;
                revealItems();
                // only run auto-scroll on small screens (mobile)
                if (window.matchMedia && window.matchMedia('(max-width: 1023px)').matches) {
                    playAutoScroll().catch(()=>{});
                }
            }
        });
    },{threshold: 0.45});

    io.observe(document.getElementById('paket'));
})();
