const facts = [
    "🚀 মহাকাশে যদি আপনি কান্নাকাটি করেন, তবে আপনার চোখের জল নিচে পড়বে না, মুখের চারপাশে বুদবুদের মতো ঘুরে বেড়াবে!",
    "🧠 মানুষের মস্তিষ্ক দিনে প্রায় ৭০,০০০টি চিন্তা করে, যার বেশিরভাগই আগের দিনের পুনরাবৃত্তি।",
    "💡 আপনি কি জানেন? ইন্টারনেট প্রতি সেকেন্ডে প্রায় ৭৩,০০০ গিগাবাইট ডাটা ট্রান্সফার করে!",
    "⚡ বিদ্যুতের চমক বা বজ্রপাতের তাপমাত্রা সূর্যের উপরিভাগের চেয়েও প্রায় ৫ গুণ বেশি গরম হয়!",
    "📚 একটু একটু করে প্রতিদিন নতুন কিছু শেখা মানে গেমিংয়ের চেয়েও বেশি লেভেল আপ করা!"
];

let currentIndex = 0;
let score = 0;

function loadCard() {
    const cardBox = document.getElementById("card-box");
    cardBox.innerHTML = `<h2>${facts[currentIndex]}</h2>`;
}

function nextCard() {
    currentIndex = (currentIndex + 1) % facts.length;
    score += 10;
    document.getElementById("score").innerText = score;
    loadCard();
}

function likeCard() {
    score += 25;
    document.getElementById("score").innerText = score;
    alert("Awesome! +25 XP Added! 🔥");
    nextCard();
}

// Initial load
loadCard();
