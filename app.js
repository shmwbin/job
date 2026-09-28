const mixedShortsData = [
    {
        type: "video",
        tag: "✨ স্পেশাল শর্টস ১",
        title: "মনোরম রোমান্টিক ও সুন্দর মুহূর্তের শর্টস ভিডিও উপভোগ করো! 💖 (বাম/ডান সোয়াইপ করুন)",
        mediaUrl: "https://www.youtube.com/embed/QvxqoXJxVxM?autoplay=1&mute=1&loop=1&playlist=QvxqoXJxVxM&controls=0"
    },
    {
        type: "image",
        tag: "🇮🇳 পশ্চিমবঙ্গ ইতিহাস",
        title: "হাওড়া ব্রিজ তৈরি করতে কোনো নাট-বল্টু লাগেনি! এটি পুরোপুরি রিভেট দিয়ে আটকানো ইঞ্জিনিয়ারিং মার্ভেল। 🌉",
        mediaUrl: "https://images.unsplash.com/photo-1558431382-27e303142255?q=80&w=600&auto=format&fit=crop"
    },
    {
        type: "video",
        tag: "✨ স্পেশাল শর্টস ২",
        title: "বিশ্বকে ভালোবাসার বার্তা ছড়ানোর দারুণ একটি সুন্দর মুহূর্ত! 🌸",
        mediaUrl: "https://www.youtube.com/embed/vYZcp-o4VSo?autoplay=1&mute=1&loop=1&playlist=vYZcp-o4VSo&controls=0"
    },
    {
        type: "image",
        tag: "🐅 সুন্দরবন রহস্য",
        title: "রয়্যাল বেঙ্গল টাইগার একমাত্র বাঘ যারা নোনা জলে সাঁতার কাটতে পারে এবং কুমির শিকার করতে পটু! 🌊",
        mediaUrl: "https://images.unsplash.com/photo-1534188753412-3e26d0d618d6?q=80&w=600&auto=format&fit=crop"
    },
    {
        type: "video",
        tag: "✨ স্পেশাল শর্টস ৩",
        title: "প্রকৃতির মাঝে সুন্দর এক রূপকথার ছোঁয়া! 🍂",
        mediaUrl: "https://www.youtube.com/embed/tjBJV_soGEA?autoplay=1&mute=1&loop=1&playlist=tjBJV_soGEA&controls=0"
    },
    {
        type: "image",
        tag: "🚊 নস্টালজিয়া",
        title: "কলকাতার ইলেকট্রিক ট্রাম এশিয়ার মধ্যে প্রাচীনতম চালু থাকা ট্রাম নেটওয়ার্ক। আজও এর জুড়ি মেলা ভার! ✨",
        mediaUrl: "https://images.unsplash.com/photo-1570168007204-dfb528c6958f?q=80&w=600&auto=format&fit=crop"
    },
    {
        type: "video",
        tag: "✨ স্পেশাল শর্টস ৪",
        title: "ফুলের রানী ও বहारের চমৎকার ব্যাকগ্রাউন্ড মিউজিক শর্টস! 🌷",
        mediaUrl: "https://www.youtube.com/embed/-W-Cky9skw4?autoplay=1&mute=1&loop=1&playlist=-W-Cky9skw4&controls=0"
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
        mediaContent = `<iframe src="${item.mediaUrl}" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"></iframe>`;
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

function prevShort() {
    currentIndex = (currentIndex - 1 + mixedShortsData.length) % mixedShortsData.length;
    renderShort();
}

function likeShort() {
    likes++;
    score += 25;
    document.getElementById("like-count").innerText = likes;
    document.getElementById("score").innerText = score;
}

// বাম ও ডান সোয়াইপ (Left / Right Swipe) হ্যান্ডেল করার জন্য টাচ লজিক
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
    
    // যদি বাম দিকে সোয়াইপ করা হয় (Swipe Left -> পরের ভিডিও/ছবি আসবে)
    if (diff > 50) {
        nextShort();
    }
    // যদি ডান দিকে সোয়াইপ করা হয় (Swipe Right -> আগের ভিডিও/ছবি আসবে)
    else if (diff < -50) {
        prevShort();
    }
}

// প্রথম লোড
renderShort();
