// Fungsi Pindah ke Login
let touchStartY = 0;
let touchEndY = 0;

const lockScreen = document.getElementById('lockScreen');
const touchArea = document.getElementById('touchArea');

// 1. Tangkap posisi awal jari
touchArea.addEventListener('touchstart', (e) => {
    touchStartY = e.changedTouches[0].screenY;
}, {passive: true});

// 2. Tangkap posisi akhir jari saat dilepas
touchArea.addEventListener('touchend', (e) => {
    touchEndY = e.changedTouches[0].screenY;
    handleSwipe();
}, {passive: true});

// 3. Logika untuk menentukan apakah itu swipe ke atas
function handleSwipe() {
    // Jika posisi akhir lebih kecil dari posisi awal (berarti geser ke atas)
    // Dan jarak gesernya lebih dari 50px agar tidak tidak sengaja terpicu
    if (touchStartY - touchEndY > 50) {
        goToLogin();
    }
}

function goToLogin() {
    lockScreen.style.transform = 'translateY(-100%)';
    lockScreen.style.transition = 'transform 0.5s ease-in-out';
    
    setTimeout(() => {
        lockScreen.style.display = 'none';
        document.getElementById('loginScreen').style.display = 'flex';
    }, 500);
}

// Update jam agar sesuai format 24 jam (seperti 20.30 di gambar)
function updateLockTime() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    document.getElementById('lockTime').textContent = `${hours}.${minutes}`;
}

setInterval(updateLockTime, 1000);
updateLockTime();function updateDateTime() {
    const sekarang = new Date();

    // 1. MENGATUR JAM (Format 20.30)
    const jam = String(sekarang.getHours()).padStart(2, '0');
    const menit = String(sekarang.getMinutes()).padStart(2, '0');
    document.getElementById('lockTime').textContent = `${jam}.${menit}`;

    // 2. MENGATUR TANGGAL (Format: Minggu, 15 Juni)
    // Menggunakan locale 'id-ID' untuk Bahasa Indonesia
    const opsiTanggal = { 
        weekday: 'long', 
        day: 'numeric', 
        month: 'long' 
    };
    const tanggalIndo = sekarang.toLocaleDateString('id-ID', opsiTanggal);
    
    document.getElementById('lockDate').textContent = tanggalIndo;
}

// Jalankan fungsi setiap 1 detik (1000 milidetik)
setInterval(updateDateTime, 1000);

// Panggil sekali di awal agar tidak menunggu 1 detik saat refresh
function updateDateTime() {
    const sekarang = new Date();

    // 1. JAM FORMAT 24 JAM (00 - 23)
    // jam 8 malam akan muncul sebagai 20, bukan 08
    const jam = String(sekarang.getHours()).padStart(2, '0'); 
    const menit = String(sekarang.getMinutes()).padStart(2, '0');
    
    // Menampilkan jam dengan format 24 jam menggunakan pemisah titik (.)
    document.getElementById('lockTime').textContent = `${jam}.${menit}`;

    // 2. TANGGAL INDONESIA
    const opsiTanggal = { 
        weekday: 'long', 
        day: 'numeric', 
        month: 'long' 
    };
    const tanggalIndo = sekarang.toLocaleDateString('id-ID', opsiTanggal);
    
    document.getElementById('lockDate').textContent = tanggalIndo;
}

// Update setiap detik
setInterval(updateDateTime, 1000);
updateDateTime();

// Update Jam Real-time
function updateClock() {
    const now = new Date();
    const time = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    
    // Update jam di Lock Screen
    if(document.getElementById('lockTime')) 
        document.getElementById('lockTime').textContent = time;
    
    // Update jam di Taskbar
    if(document.getElementById('trayTime')) 
        document.getElementById('trayTime').textContent = time;
}

setInterval(updateClock, 1000);
updateClock();

// Fungsi kembali ke Lock Screen
function backToLock() {
    const login = document.getElementById('loginScreen');
    const lock = document.getElementById('lockScreen');
    
    login.style.display = 'none';
    lock.style.display = 'flex';
    lock.style.transform = 'translateY(0)'; // Reset posisi swipe
}

// Fungsi masuk ke Desktop
// Atur password yang kamu inginkan di sini
const PASSWORD_BENAR = "2911919"; 

function goToDesktop() {
    const inputField = document.getElementById('passwordField');
    const loginScreen = document.getElementById('loginScreen');
    const inputPass = inputField.value;

    if (inputPass === PASSWORD_BENAR) {
        // Efek visual sebelum pindah halaman
        loginScreen.style.opacity = '0';
        loginScreen.style.transition = '0.5s ease-in-out';
        
        setTimeout(() => {
            // PERINTAH PINDAH HALAMAN
            window.location.href = "desktop.html"; 
        }, 500);
        
    } else {
        // Efek getar jika salah
        const loginContainer = document.querySelector('.login-form');
        loginContainer.classList.add('shake-animation');
        setTimeout(() => loginContainer.classList.remove('shake-animation'), 300);
        
        inputField.value = "";
        alert("Password Salah!");
    }
}
