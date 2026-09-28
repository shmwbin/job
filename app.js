const contents = [
    { type: "fact", text: "🚀 মহাকাশে যদি আপনি কান্নাকাটি করেন, তবে আপনার চোখের জল নিচে পড়বে না, মুখের চারপাশে বুদবুদের মতো ঘুরে বেড়াবে!" },
    { type: "fact", text: "🧠 মানুষের মস্তিষ্ক দিনে প্রায় ৭০,০০০টি চিন্তা করে, যার বেশিরভাগই আগের দিনের পুনরাবৃত্তি।" },
    { type: "fact", text: "💡 ইন্টারনেট প্রতি সেকেন্ডে প্রায় ৭৩,০০০ গিগাবাইট ডাটা ট্রান্সফার করে!" },
    { type: "fact", text: "⚡ বিদ্যুতের চমক বা বজ্রপাতের তাপমাত্রা সূর্যের উপরিভাগের চেয়েও প্রায় ৫ গুণ বেশি গরম হয়!" },
    { type: "fact", text: "🌊 প্রশান্ত মহাসাগরের তলদেশে এমন গভীর খাদ রয়েছে, যেখানে মাউন্ট এভারেস্টকেও পুরোপুরি ডুবিয়ে দেওয়া সম্ভব!" }
];

const quizzes = [
    {
        question: "প্রশ্ন ১: মানুষের মস্তিষ্ক দিনে গড়ে কতটি চিন্তা করে?",
        options: ["১০,০০০টি", "৭০,০০০টি", "৫ লক্ষটি"],
        correct: 1
    },
    {
        question: "প্রশ্ন ২: বজ্রপাতের তাপমাত্রা সূর্যের উপরিভাগের চেয়ে প্রায় কতগুণ বেশি?",
        options: ["২ গুণ", "৫ গুণ", "১০ গুণ"],
        correct: 1
    }
];

let currentIndex = 0;
let score = 0;
let level = 1;

function loadCard() {
    const cardBox = document.getElementById("card-box");
    const quizSection = document.getElementById("quiz-section");
    
    cardBox.classList.remove("hidden");
    quizSection.classList.add("hidden");

    cardBox.innerHTML = `<h2>${contents[currentIndex].text}</h2>`;
}

function nextCard() {
    currentIndex = (currentIndex + 1) % contents.length;
    score += 15;
    
    // Level up logic: every 50 points increases level
    level = Math.floor(score / 50) + 1;
    
    document.getElementById("score").innerText = score;
    document.getElementById("level").innerText = level;
    
    loadCard();
}

function startQuiz() {
    const cardBox = document.getElementById("card-box");
    const quizSection = document.getElementById("quiz-section");
    
    cardBox.classList.add("hidden");
    quizSection.classList.remove("hidden");

    // Randomly pick a quiz
    const randomQuiz = quizzes[Math.floor(Math.random() * quizzes.length)];
    
    document.getElementById("question-text").innerText = randomQuiz.question;
    const optionsContainer = document.getElementById("options-container");
    optionsContainer.innerHTML = "";

    randomQuiz.options.forEach((opt, index) => {
        const btn = document.createElement("button");
        btn.innerText = opt;
        btn.className = "option-btn";
        btn.onclick = () => checkAnswer(index, randomQuiz.correct);
        optionsContainer.appendChild(btn);
    });
}

function checkAnswer(selected, correct) {
    if (selected === correct) {
        score += 30;
        alert("সঠিক উত্তর! +৩০ পয়েন্ট অর্জন হয়েছে 🎉");
    } else {
        alert("আহা, ভুল হলো! আবার চেষ্টা করো।");
    }
    document.getElementById("score").innerText = score;
    level = Math.floor(score / 50) + 1;
    document.getElementById("level").innerText = level;
    loadCard();
}

// Initial load
loadCard();
