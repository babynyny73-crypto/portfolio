const display = document.getElementById('display');
const buttons = document.querySelectorAll('button');
const primeMessage = document.getElementById('prime-message');
let currentInput = "";

function isPrime(n) {
    if (n <= 1 || !Number.isInteger(n)) return false;
    if (n === 2) return true;
    if (n % 2 === 0) return false;
    for (let i = 3; i <= Math.sqrt(n); i += 2) {
        if (n % i === 0) return false;
    }
    return true;
}

buttons.forEach(button => {
    button.addEventListener('click', () => {
        const value = button.textContent;
        primeMessage.textContent = ""; // Clear previous message

        if (value === '=') {
            try {
                // Check for divide-by-zero
                if (/\/0(?!\d)/.test(currentInput)) {
                    display.value = "Nice try! Dividing by zero creates a black hole. 🌌";
                    currentInput = "";
                    return;
                }

                const result = eval(currentInput);
                display.value = result;
                currentInput = result.toString();

                if (isPrime(result)) {
                    primeMessage.textContent = `${result} is a prime number! 🎉`;
                }
            } catch (error) {
                display.value = "Oops! That math broke reality. 🧨";
            }
        } else {
            currentInput += value;
            display.value = currentInput;
        }
    });
});
document.getElementById('clear').addEventListener('click', () => {
    currentInput = "";
    display.value = "";
    primeMessage.textContent = "";
});