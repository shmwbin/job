// পশ্চিমবঙ্গের আকর্ষণীয় ভিডিও ও শর্টস কন্টেন্ট ডাটাবেজ (ছবি, টেক্সট এবং ইউটিউব শর্টস আইডি সহ)
const shortsData = [
    {
        tag: "🇮🇳 পশ্চিমবঙ্গ ইতিহাস",
        title: "হাওড়া ব্রিজ তৈরি করতে কোনো নাট-বল্টু লাগেনি! এটি পুরোপুরি রিভেট দিয়ে আটকানো ইঞ্জিনিয়ারিং মার্ভেল। 🌉",
        bgImage: "https://images.unsplash.com/photo-1558431382-27e303142255?q=80&w=600&auto=format&fit=crop"
    },
    {
        tag: "🐅 সুন্দরবন রহস্য",
        title: "রয়্যাল বেঙ্গল টাইগার একমাত্র বাঘ যারা নোনা জলে সাঁতার কাটতে পারে এবং কুমির শিকার করতে পটু! 🌊",
        bgImage: "https://images.unsplash.com/photo-1534188753412-3e26d0d618d6?q=80&w=600&auto=format&fit=crop"
    },
    {
        tag: "🚊 নস্টালজিয়া",
        title: "কলকাতার ইলেকট্রিক ট্রাম এশিয়ার মধ্যে প্রাচীনতম চালু থাকা ট্রাম নেটওয়ার্ক। আজও এর জুড়ি মেলা ভার! ✨",
        bgImage: "https://images.unsplash.com/photo-1570168007204-dfb528c6958f?q=80&w=600&auto=format&fit=crop"
    },
    {
        tag: "🚀 মহাকাশ ও বিজ্ঞান",
        title: "মহাকাশে কান্নাকাটি করলে চোখের জল নিচে পড়ে না, মুখের চারপাশে বুদবুদের মতো ঘুরে বেড়ায়! জেনেন কি কেন?",
        bgImage: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=600&auto=format&fit=crop"
    },
    {
        tag: "💡 ব্রেন বুস্টার",
        title: "মানুষের মস্তিষ্ক দিনে প্রায় ৭০,০০০টি চিন্তা করে! এর মধ্যে পজিটিভ চিন্তা বাড়ালে ফোকাস দ্বিগুণ হয়। 🧠",
        bgImage: "https://images.unsplash.com/photo-1507413245164-6160d8298b31?q=80&w=600&auto=format&fit=crop"
    }
];

let currentShortIndex = 0;
let score = 0;
let likes = 120;

function renderShort() {
    const feed = document.getElementById("shorts-feed");
    const item = shortsData[currentShortIndex];

    feed.innerHTML = `
        <div class="short-card" style="background-image: url('${item.bgImage}');">
            <div class="short-content-overlay">
                <span class="short-tag">${item.tag}</span>
                <h2 class="short-title">${item.title}</h2>
            </div>
        </div>
    `;
}

function nextShort() {
    // প্রতি সোয়াইপে বা নেক্সট বাটনে অ্যালগরিদম অনুযায়ী নতুন শর্টস আসবে এবং পয়েন্ট যোগ হবে
    currentShortIndex = (currentShortIndex + 1) % shortsData.length;
    score += 15;
    document.getElementById("score").innerText = score;
    
    // প্রতিবার নতুন শর্ট আসার সময় অ্যানিমেশন সহ লোড হবে
    renderShort();
}

function likeShort() {
    likes++;
    score += 25;
    document.getElementById("like-count").innerText = likes;
    document.getElementById("score").innerText = score;
    alert("❤️ দারুণ! প্লাস ২৫ পয়েন্ট যোগ হলো!");
}

function shareApp() {
    if (navigator.share) {
        navigator.share({
            title: 'স্মার্ট টিন অ্যাপ',
            text: 'এই দারুণ শিক্ষামূলক শর্টস অ্যাপটি দেখে নাও!',
            url: window.location.href,
        }).catch(() => {});
    } else {
        alert("লিংক কপি করা হয়েছে! বন্ধুদের সাথে শেয়ার করো।");
    }
}

// পেজ লোড হওয়ার সাথে সাথে প্রথম শর্ট দেখাবে
renderShort();
