// ছবি ও ইউটিউব শর্টস ভিডিও অল্টারনেট করে সাজানো ডাটাবেজ
const mixedShortsData = [
    {
        type: "image",
        tag: "🇮🇳 পশ্চিমবঙ্গ ইতিহাস",
        title: "হাওড়া ব্রিজ তৈরি করতে কোনো নাট-বল্টু লাগেনি! এটি পুরোপুরি রিভেট দিয়ে আটকানো ইঞ্জিনিয়ারিং মার্ভেল। 🌉",
        mediaUrl: "https://images.unsplash.com/photo-1558431382-27e303142255?q=80&w=600&auto=format&fit=crop"
    },
    {
        type: "video",
        tag: "🚀 বিজ্ঞান ও মহাকাশ",
        title: "মহাকাশে কান্নাকাটি করলে চোখের জল কোথায় যায়? জেনে নাও মজার এই বিজ্ঞান! 🌌",
        mediaUrl: "https://www.youtube.com/embed/jfKfPfyJRdk?autoplay=1&mute=1&controls=0&loop=1"
    },
    {
        type: "image",
        tag: "🐅 সুন্দরবন রহস্য",
        title: "রয়্যাল বেঙ্গল টাইগার একমাত্র বাঘ যারা নোনা জলে সাঁতার কাটতে পারে এবং কুমির শিকার করতে পটু! 🌊",
        mediaUrl: "https://images.unsplash.com/photo-1534188753412-3e26d0d618d6?q=80&w=600&auto=format&fit=crop"
    },
    {
        type: "video",
        tag: "💡 ব্রেন বুস্টার",
        title: "মস্তিষ্ককে শার্প রাখার জাদুকরী কিছু সহজ টেকনিক যা তোমার পড়শোনাতেও সাহায্য করবে! 🧠",
        mediaUrl: "https://www.youtube.com/embed/5qap5aO4i9A?autoplay=1&mute=1&controls=0&loop=1"
    },
    {
        type: "image",
        tag: "🚊 নস্টালজিয়া",
        title: "কলকাতার ইলেকট্রিক ট্রাম এশিয়ার মধ্যে প্রাচীনতম চালু থাকা ট্রাম নেটওয়ার্ক। আজও এর জুড়ি মেলা ভার! ✨",
        mediaUrl: "https://images.unsplash.com/photo-1570168007204-dfb528c6958f?q=80&w=600&auto=format&fit=crop"
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
        mediaContent = `<iframe src="${item.mediaUrl}" allow="autoplay"></iframe>`;
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

// মোবাইল বা টাচ স্ক্রিনে আঙুল দিয়ে ওপরের দিকে টানলে (Swipe Up) পরের শর্ট আসবে
let touchStartY = 0;
let touchEndY = 0;

document.addEventListener('touchstart', e => {
    touchStartY = e.changedTouches[0].screenY;
});

document.addEventListener('touchend', e => {
    touchEndY = e.changedTouches[0].screenY;
    handleSwipe();
});

function handleSwipe() {
    // যদি আঙুল ওপরের দিকে টানা হয় (Swipe Up)
    if (touchStartY - touchEndY > 50) {
        nextShort();
    }
    // যদি আঙুল নিচের দিকে টানা হয় (Swipe Down) আগেরটায় যাওয়ার জন্য চাইলে রাখতে পারেন
    else if (touchEndY - touchStartY > 50) {
        currentIndex = (currentIndex - 1 + mixedShortsData.length) % mixedShortsData.length;
        renderShort();
    }
}

// প্রথম লোড
renderShort();
