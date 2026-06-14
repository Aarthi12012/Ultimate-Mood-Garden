let flowerCount = 0;
let goldenCount = 0;


let moodStats = {
    happy: 0,
    sad: 0,
    cool: 0,
    angry: 0,
    sleepy: 0
};

const quotes = [
    "🌸 Every flower blooms at its own pace.",
    "✨ Small progress is still progress.",
    "🌈 Better days are coming.",
    "🌻 Happiness grows when shared.",
    "💖 Be proud of how far you've come.",
    "🌷 You are stronger than you think.",
    "⭐ Great things take time.",
    "🦋 Keep growing."
];

function getRandomQuote() {
    return quotes[Math.floor(Math.random() * quotes.length)];
}

function updateStats() {

    document.getElementById("flowerCount").textContent = flowerCount;
    document.getElementById("goldCount").textContent = goldenCount;

    let level = 1;
    let levelText = "🌱 Seedling";

    if (flowerCount >= 10) {
        level = 2;
        levelText = "🌿 Gardener";
    }

    if (flowerCount >= 25) {
        level = 3;
        levelText = "🌷 Flower Master";
    }

    if (flowerCount >= 50) {
        level = 4;
        levelText = "👑 Garden Legend";
    }

    document.getElementById("levelNum").textContent = level;
    document.getElementById("levelText").textContent = levelText;

    let favoriteMood = "😊";
    let highest = 0;

    for (let mood in moodStats) {
        if (moodStats[mood] > highest) {

            highest = moodStats[mood];

            if (mood === "happy") favoriteMood = "😊";
            if (mood === "sad") favoriteMood = "😢";
            if (mood === "cool") favoriteMood = "😎";
            if (mood === "angry") favoriteMood = "😡";
            if (mood === "sleepy") favoriteMood = "😴";
        }
    }

    document.getElementById("favMood").textContent = favoriteMood;

    let achievement = "🌱 Keep planting flowers!";

    if (flowerCount >= 10)
        achievement = "🏆 First Garden Built";

    if (flowerCount >= 25)
        achievement = "🌷 Flower Collector";

    if (flowerCount >= 50)
        achievement = "👑 Garden Legend";

    if (goldenCount >= 1)
        achievement += " ✨ Golden Flower Found!";

    document.getElementById("achievement").textContent = achievement;

    saveGarden();
}

function createConfetti() {

    for (let i = 0; i < 40; i++) {

        const confetti = document.createElement("div");

        confetti.className = "confetti";

        confetti.innerHTML =
            ["🎉", "✨", "🌸", "🌟"][Math.floor(Math.random() * 4)];

        confetti.style.left = Math.random() * 100 + "vw";

        confetti.style.animationDuration =
            (2 + Math.random() * 2) + "s";

        document.body.appendChild(confetti);

        setTimeout(() => {
            confetti.remove();
        }, 4000);
    }
}

function plantFlower(mood) {

    const garden = document.getElementById("garden");

    const flower = document.createElement("span");

    flower.className = "flower";

    let goldenChance = Math.floor(Math.random() * 100);

    if (goldenChance === 0) {

        flower.innerHTML = "🌟";

        goldenCount++;

        createConfetti();

    } else {

        if (mood === "happy") {
            flower.innerHTML = "🌻";
            moodStats.happy++;
        }

        if (mood === "sad") {
            flower.innerHTML = "🪻";
            moodStats.sad++;
        }

        if (mood === "cool") {
            flower.innerHTML = "🌺";
            moodStats.cool++;
        }

        if (mood === "angry") {
            flower.innerHTML = "🌹";
            moodStats.angry++;
        }

        if (mood === "sleepy") {
            flower.innerHTML = "🌼";
            moodStats.sleepy++;
        }
    }

    garden.appendChild(flower);

    flowerCount++;

    document.getElementById("quote").textContent =
        getRandomQuote();

    updateStats();
}

function toggleDarkMode() {

    document.body.classList.toggle("dark");

    localStorage.setItem(
        "darkMode",
        document.body.classList.contains("dark")
    );
}

function saveGarden() {

    localStorage.setItem(
        "gardenHTML",
        document.getElementById("garden").innerHTML
    );

    localStorage.setItem(
        "flowerCount",
        flowerCount
    );

    localStorage.setItem(
        "goldenCount",
        goldenCount
    );

    localStorage.setItem(
        "moodStats",
        JSON.stringify(moodStats)
    );
}

function loadGarden() {

    const savedGarden =
        localStorage.getItem("gardenHTML");

    if (savedGarden) {
        document.getElementById("garden").innerHTML =
            savedGarden;
    }

    flowerCount =
        parseInt(localStorage.getItem("flowerCount")) || 0;

    goldenCount =
        parseInt(localStorage.getItem("goldenCount")) || 0;

    const savedStats =
        localStorage.getItem("moodStats");

    if (savedStats) {
        moodStats = JSON.parse(savedStats);
    }

    if (localStorage.getItem("darkMode") === "true") {
        document.body.classList.add("dark");
    }

    updateStats();
}

function resetGarden() {

    if (confirm("Are you sure you want to reset your garden?")) {

        flowerCount = 0;
        goldenCount = 0;

        moodStats = {
            happy: 0,
            sad: 0,
            cool: 0,
            angry: 0,
            sleepy: 0
        };

        document.getElementById("garden").innerHTML = "";

        localStorage.removeItem("gardenHTML");
        localStorage.removeItem("flowerCount");
        localStorage.removeItem("goldenCount");
        localStorage.removeItem("moodStats");

        updateStats();

        document.getElementById("quote").textContent =
            "🌱 Your garden has been reset.";
    }
}

function createButterflies() {

    const emojis = [
        "🦋",
        "🌸",
        "✨",
        "🌺",
        "🌷"
    ];

    setInterval(() => {

        const item = document.createElement("div");

        item.className = "floating";

        item.innerHTML =
            emojis[Math.floor(Math.random() * emojis.length)];

        item.style.left =
            Math.random() * 100 + "vw";

        item.style.animationDuration =
            (8 + Math.random() * 8) + "s";

        document.body.appendChild(item);

        setTimeout(() => {
            item.remove();
        }, 16000);

    }, 1200);
}

loadGarden();
createButterflies();
