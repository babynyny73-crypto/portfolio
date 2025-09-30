document.addEventListener("DOMContentLoaded", function () {
    let targetNumber;
    let attempts;
    let playerName;

    const nameInput = document.getElementById("nameInput");
    const startBtn = document.getElementById("startBtn");
    const startScreen = document.getElementById("startScreen");
    const gameScreen = document.getElementById("gameScreen");
    const welcomeMsg = document.getElementById("welcomeMsg");
    const guessInput = document.getElementById("guessInput");
    const submitBtn = document.getElementById("submitBtn");
    const restartBtn = document.getElementById("restartBtn");
    const output = document.getElementById("output");
    const leaderboard = document.getElementById("leaderboard");

    function generateNumber() {
        return Math.floor(Math.random() * 10) + 1;
    }

    function updateLeaderboard() {
        const scores = JSON.parse(localStorage.getItem("leaderboard")) || [];
        scores.sort((a, b) => b.score - a.score); // Highest score first

        leaderboard.innerHTML = "";
        scores.forEach(entry => {
            const li = document.createElement("li");
            li.textContent = `${entry.name} - ${entry.score} points`;
            leaderboard.appendChild(li);
        });
    }

    startBtn.addEventListener("click", function () {
        playerName = nameInput.value.trim();
        if (!playerName) {
            alert("Please enter your name to start.");
            return;
        }

        targetNumber = generateNumber();
        attempts = 0;

        startScreen.style.display = "none";
        gameScreen.style.display = "block";
        welcomeMsg.textContent = `Welcome, ${playerName}! Try to guess the number between 1 and 10.`;

        updateLeaderboard();
    });

    submitBtn.addEventListener("click", function () {
        const guess = parseInt(guessInput.value);
        if (isNaN(guess) || guess < 1 || guess > 10) {
            output.textContent = "⚠️ Enter a number between 1 and 10.";
            return;
        }

        attempts++;

        if (guess === targetNumber) {
            const score = Math.max(100 - (attempts - 1) * 10, 10); // Score formula

            output.textContent = `🎉 Correct, ${playerName}! You scored ${score} points in ${attempts} attempts.`;

            // Save score
            const scores = JSON.parse(localStorage.getItem("leaderboard")) || [];
            scores.push({ name: playerName, score });
            localStorage.setItem("leaderboard", JSON.stringify(scores));

            updateLeaderboard();
        } else if (guess < targetNumber) {
            output.textContent = "📉 Too low. Try again!";
        } else {
            output.textContent = "📈 Too high. Try again!";
        }

        guessInput.value = "";
    });

    restartBtn.addEventListener("click", function () {
        targetNumber = generateNumber();
        attempts = 0;
        output.textContent = `🔄 Game restarted, ${playerName}. Try a new number!`;
        guessInput.value = "";
    });

    // Load leaderboard on page refresh
    updateLeaderboard();
});