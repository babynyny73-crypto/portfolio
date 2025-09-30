document.addEventListener("DOMContentLoaded", function () {
    let targetNumber = Math.floor(Math.random() * 10) + 1;

    const guessInput = document.getElementById("guessInput");
    const output = document.getElementById("output");
    const submitBtn = document.getElementById("submitBtn");
    const restartBtn = document.getElementById("restartBtn");

    submitBtn.addEventListener("click", function () {
        const guess = parseInt(guessInput.value);

        if (isNaN(guess) || guess < 1 || guess > 10) {
            output.textContent = "⚠️ Please enter a number between 1 and 10.";
            return;
        }

        if (guess === targetNumber) {
            output.textContent = `🎉 Correct! The number was ${targetNumber}.`;
        } else if (guess < targetNumber) {
            output.textContent = "📉 Too low. Try again!";
        } else {
            output.textContent = "📈 Too high. Try again!";
        }

        // Clear input after feedback
        guessInput.value = "";

        // Optional: Clear output after 2 seconds
        setTimeout(() => {
            output.textContent = "";
        }, 2000);
    });

    restartBtn.addEventListener("click", function () {
        targetNumber = Math.floor(Math.random() * 10) + 1;
        guessInput.value = "";
        output.textContent = "🔄 Game restarted! Try a new number.";
    });
});