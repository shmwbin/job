// পশ্চিমবঙ্গের লোকাল কালচার, ইতিহাস ও বৈজ্ঞানিক রোমাঞ্চকর তথ্য
const westBengalContents = [
    { type: "fact", text: "tram 🚊 কলকাতার ট্রাম্প দেশের প্রাচীনতম ইলেকট্রিক ট্রাম সিস্টেম, যা আজও আমাদের নস্টালজিয়া ধরে রেখেছে!" },
    { type: "fact", text: "☕ কলকাতার কফি হাউসের আড্ডা মানেই সুবোধ মল্লিক স্কোয়ারের পাশে বসে বুদ্ধিদীপ্ত আলোচনা ও ইতিহাসের ঘ্রাণ।" },
    { type: "fact", text: "🐅 সুন্দরবনের রয়্যাল বেঙ্গল টাইগার একমাত্র বাঘ যারা নোনা জলে সাঁতার কাটতে এবং শিকার ধরতে পারদর্শী!" },
    { type: "fact", text: "🌉 হাওড়া ব্রিজ কোনো নাট-বল্টু ছাড়াই কেবল রিভেট (Rivet) দিয়ে জোড়া হয়েছিল, যা এক অপূর্ব ইঞ্জিনিয়ারিং মার্ভেল।" },
    { type: "fact", text: "📚 দার্জিলিং হিমালয়েন রেলওয়ে (Toy Train) একটি ইউনেস্কো ওয়ার্ল্ড হেরিটেজ সাইট, যা পাহাড়ের বাঁকে বাঁকে বিজ্ঞান ও প্রকৌশলের এক দারুণ নিদর্শন।" }
];

const westBengalQuizzes = [
    {
        question: "প্রশ্ন ১: ভারতের একমাত্র কোন বনে রয়্যাল বেঙ্গল টাইগার পাওয়া যায় যা জলে সাঁতার কাটে?",
        options: ["করবেট ন্যাশনাল পার্ক", "সুন্দরবন", "গির অরণ্য"],
        correct: 1
    },
    {
        question: "প্রশ্ন ২: কলকাতার ঐতিহ্যবাহী কোন বাহনটি এশিয়ার মধ্যে প্রাচীনতম চালু থাকা ইলেকট্রিক ট্রাম?",
        options: ["কলকাতা ট্রাম", "দার্জিলিং টয় ট্রেন", "মেট্রো রেল"],
        correct: 0
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

    // রি-ট্রিগার অ্যানিমেশনের জন্য ক্লাস রিমুভ ও অ্যাড করা
    cardBox.style.animation = 'none';
    cardBox.offsetHeight; // trigger reflow
    cardBox.style.animation = 'popIn 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards';

    cardBox.innerHTML = `<h2>${westBengalContents[currentIndex].text}</h2>`;
}

function nextCard() {
    currentIndex = (currentIndex + 1) % westBengalContents.length;
    score += 20; // প্রতি সোয়াইপে পয়েন্ট বৃদ্ধি
    
    // লেভেল আপ লজিক: প্রতি ১০০ পয়েন্টে লেভেল বাড়বে
    level = Math.floor(score / 100) + 1;
    
    document.getElementById("score").innerText = score;
    document.getElementById("level").innerText = level;
    
    loadCard();
}

function startQuiz() {
    const cardBox = document.getElementById("card-box");
    const quizSection = document.getElementById("quiz-section");
    
    cardBox.classList.add("hidden");
    quizSection.classList.remove("hidden");

    const randomQuiz = westBengalQuizzes[Math.floor(Math.random() * westBengalQuizzes.length)];
    
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
        score += 50;
        alert("দারুণ বুদ্ধি! সঠিক উত্তর হয়েছে 🎉 +৫০ XP");
    } else {
        alert("আরে না! একটু ভুল হয়ে গেল, পরেরটায় ঠিক জিতে যাবে।");
    }
    document.getElementById("score").innerText = score;
    level = Math.floor(score / 100) + 1;
    document.getElementById("level").innerText = level;
    loadCard();
}

// প্রথম লোড
loadCard();
