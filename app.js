let mixedShortsData = []; // গুগল শিট থেকে ডেটা আসার জন্য খালি অ্যারে
let currentIndex = 0;
let score = 0;
let likes = 120;

// আপনার গুগল শিট থেকে ডেটা ফেচ (Fetch) করার ফাংশন
async function fetchShortsFromGoogleSheet() {
    const sheetApiUrl = "https://script.google.com/macros/s/AKfycbyy3eZ0KB4_HOJbTlTj4cMxMc5EdaO-J3jx6ZGTjfK4tmgYAZ8j7qoJQmz2nLh_K7Zi/exec";
    
    try {
        const response = await fetch(sheetApiUrl);
        const data = await response.json();
        
        if (data && data.length > 0) {
            mixedShortsData = data;
            renderShort(); // ডেটা আসার পর প্রথম শর্ট লোড হবে
        } else {
            console.log("গুগল শিটে কোনো ডেটা পাওয়া যায়নি!");
        }
    } catch (error) {
        console.error("ডেটা লোড করতে সমস্যা হয়েছে:", error);
    }
}

function renderShort() {
    const feed = document.getElementById("shorts-feed");
    
    if (mixedShortsData.length === 0) {
        feed.innerHTML = `<div class="short-card" style="display:flex; justify-content:center; align-items:center;"><h2>লোড হচ্ছে... 🚀</h2></div>`;
        return;
    }

    const item = mixedShortsData[currentIndex];

    let mediaContent = "";
    if (item.type === "video") {
        mediaContent = `<iframe src="${item.mediaUrl}" loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"></iframe>`;
    } else {
        mediaContent = `<div class="short-card" style="background-image: url('${item.mediaUrl}'); position: absolute; width: 100%; height: 100%;"></div>`;
    }

    feed.innerHTML = `
        <div class="short-card">
            ${mediaContent}
            <div class="short-content-overlay">
                <span class="short-tag">${item.tag}</span>
                <h2 class="short-title">${item.title}</h2>
            </div>
        </div>
    `;
}

function nextShort() {
    if (mixedShortsData.length === 0) return;
    currentIndex = (currentIndex + 1) % mixedShortsData.length;
    score += 15;
    document.getElementById("score").innerText = score;
    renderShort();
}

function prevShort() {
    if (mixedShortsData.length === 0) return;
    currentIndex = (currentIndex - 1 + mixedShortsData.length) % mixedShortsData.length;
    renderShort();
}

function likeShort() {
    likes++;
    score += 25;
    document.getElementById("like-count").innerText = likes;
    document.getElementById("score").innerText = score;
}

// বাম ও ডান সোয়াইপ হ্যান্ডেল করার জন্য টাচ লজিক
let touchStartX = 0;
let touchEndX = 0;

const swipeShield = document.getElementById("swipe-shield");

swipeShield.addEventListener('touchstart', e => {
    touchStartX = e.changedTouches[0].screenX;
});

swipeShield.addEventListener('touchend', e => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipeGesture();
});

function handleSwipeGesture() {
    let diff = touchStartX - touchEndX;
    if (diff > 50) {
        nextShort(); // বামে সোয়াইপ -> পরেরটা
    } else if (diff < -50) {
        prevShort(); // ডানে সোয়াইপ -> আগেরটা
    }
}

// PWA ইনস্টল ব্যানার লজিক
let deferredPrompt;
const installBanner = document.getElementById("install-banner");
const installBtn = document.getElementById("install-btn");
const closeBannerBtn = document.getElementById("close-banner");

window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    setTimeout(() => {
        installBanner.classList.remove("hidden");
    }, 2000);
});

installBtn.addEventListener('click', async () => {
    if (deferredPrompt) {
        deferredPrompt.prompt();
        const { outcome } = await deferredPrompt.userChoice;
        if (outcome === 'accepted') {
            console.log('User accepted the install prompt');
        }
        deferredPrompt = null;
        installBanner.classList.add("hidden");
    }
});

closeBannerBtn.addEventListener('click', () => {
    installBanner.classList.add("hidden");
});

// অ্যাপ চালু হওয়ার সাথে সাথে গুগল শিট থেকে ডেটা ফেচ করা শুরু করবে
fetchShortsFromGoogleSheet();
