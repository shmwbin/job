const mixedShortsData = [
    {
        type: "video",
        tag: "✨ Spesal Shorts ১",
        title: "Monorom romantic o sundor muhurter shorts video upobhog koro! 💖",
        mediaUrl: "https://www.youtube.com/embed/QvxqoXJxVxM?autoplay=1&mute=1&loop=1&playlist=QvxqoXJxVxM"
    },
    {
        type: "image",
        tag: "🇮🇳 Poschimbonggo Itihas",
        title: "Haora bridge toiri korte kono nat-boltu lageni! Eta puropuri rivet diye atkano engineering marvel. 🌉",
        mediaUrl: "https://images.unsplash.com/photo-1558431382-27e303142255?q=80&w=600&auto=format&fit=crop"
    },
    {
        type: "video",
        tag: "✨ Spesal Shorts ২",
        title: "Biswo ke bhalobasar barta choranor darun ekti sundor muhurto! 🌸",
        mediaUrl: "https://www.youtube.com/embed/vYZcp-o4VSo?autoplay=1&mute=1&loop=1&playlist=vYZcp-o4VSo"
    },
    {
        type: "image",
        tag: "🐅 Sundarban Rohoshyo",
        title: "Royalty Bengal Tiger ekmatro bag jara nona jole satar kat te pare o kumir shikar korte potu! 🌊",
        mediaUrl: "https://images.unsplash.com/photo-1534188753412-3e26d0d618d6?q=80&w=600&auto=format&fit=crop"
    },
    {
        type: "video",
        tag: "✨ Spesal Shorts ৩",
        title: "Prokritir majhe sundor ek rupkothar chhoa! 🍂",
        mediaUrl: "https://www.youtube.com/embed/tjBJV_soGEA?autoplay=1&mute=1&loop=1&playlist=tjBJV_soGEA"
    },
    {
        type: "image",
        tag: "🚊 Nostalgia",
        title: "Kolkatar electric tram eashiyar modhye prachintamo chalu thaka tram network. Aajoer juri mela bhar! ✨",
        mediaUrl: "https://images.unsplash.com/photo-1570168007204-dfb528c6958f?q=80&w=600&auto=format&fit=crop"
    },
    {
        type: "video",
        tag: "✨ Spesal Shorts ৪",
        title: "Fuler rani o baharer chomotkar background music shorts! 🌷",
        mediaUrl: "https://www.youtube.com/embed/-W-Cky9skw4?autoplay=1&mute=1&loop=1&playlist=-W-Cky9skw4"
    }
];

let currentIndex = 0;
let score = 0;
let likes = 120;

function renderShort() {
    const feed = document.getElementById("shorts-feed");
    const item = mixedShortsData[currentIndex];

    let mediaContent = "";
    if (item.type === "video") {
        mediaContent = `<iframe src="${item.mediaUrl}" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
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
    currentIndex = (currentIndex + 1) % mixedShortsData.length;
    score += 15;
    document.getElementById("score").innerText = score;
    renderShort();
}

function likeShort() {
    likes++;
    score += 25;
    document.getElementById("like-count").innerText = likes;
    document.getElementById("score").innerText = score;
}

// Touch layer er upor swipe gesture handle korar jonno
let touchStartY = 0;
let touchEndY = 0;

const touchLayer = document.getElementById("touch-layer");

touchLayer.addEventListener('touchstart', e => {
    touchStartY = e.changedTouches[0].screenY;
});

touchLayer.addEventListener('touchend', e => {
    touchEndY = e.changedTouches[0].screenY;
    handleSwipe();
});

function handleSwipe() {
    if (touchStartY - touchEndY > 50) {
        nextShort(); // Uporer dike swipe korle porer short asbe
    } else if (touchEndY - touchStartY > 50) {
        currentIndex = (currentIndex - 1 + mixedShortsData.length) % mixedShortsData.length;
        renderShort(); // Nicher dike swipe korle ager tai jabe
    }
}

// Initial load
renderShort();
