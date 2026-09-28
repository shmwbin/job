let mixedShortsData = [];
let currentIndex = 0;
let score = 0;
let likes = 120;

async function fetchShortsFromGoogleSheet() {
    const sheetApiUrl = "https://script.google.com/macros/s/AKfycbyy3eZ0KB4_HOJbTlTj4cMxMc5EdaO-J3jx6ZGTjfK4tmgYAZ8j7qoJQmz2nLh_K7Zi/exec";
    
    try {
        const response = await fetch(sheetApiUrl);
        const data = await response.json();
        
        if (data && data.length > 0) {
            mixedShortsData = data.map(item => ({
                type: item.type || item.Type || "video",
                tag: item.tag || item.Tag || "✨ Educational",
                title: item.title || item.Title || "N/A",
                mediaUrl: item.mediaUrl || item.media_url || item.MediaUrl || ""
            })).reverse();
            
            renderShort();
        } else {
            console.log("Google Sheet-e kono data paoya jayni!");
        }
    } catch (error) {
        console.error("Data load korte somastha hoyeche:", error);
    }
}

function renderShort() {
    const feed = document.getElementById("shorts-feed");
    
    if (mixedShortsData.length === 0) {
        feed.innerHTML = `<div class="short-card" style="display:flex; justify-content:center; align-items:center;"><h2>Load hocche... 🚀</h2></div>`;
        return;
    }

    const item = mixedShortsData[currentIndex];

    let mediaContent = "";
    if (item.type.toLowerCase() === "video") {
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

// Up and Down Swipe Logic (Upor ba niche swipe korar jonno)
let touchStartY = 0;
let touchEndY = 0;

const swipeShield = document.getElementById("swipe-shield");

swipeShield.addEventListener('touchstart', e => {
    touchStartY = e.changedTouches[0].screenY;
});

swipeShield.addEventListener('touchend', e => {
    touchEndY = e.changedTouches[0].screenY;
    handleVerticalSwipe();
});

function handleVerticalSwipe() {
    let diff = touchStartY - touchEndY;
    
    // Jodi upor er dike swipe kora hoy (Swipe Up -> Porer video asbe)
    if (diff > 50) {
        nextShort();
    }
    // Jodi nicher dike swipe kora hoy (Swipe Down -> Ager video asbe)
    else if (diff < -50) {
        prevShort();
    }
}

let deferredPrompt;
const installBanner = document.getElementById("install-banner");
const installBtn = document.getElementById("install-btn");
const closeBannerBtn = document.getElementById("close-banner");

window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
nych-deferredPrompt = e;
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

fetchShortsFromGoogleSheet();
