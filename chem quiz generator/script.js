let questionBank = [];
let selectedQuestions = [];
let currentIndex = 0;
let score = 0;

async function loadQuestions() {
  try {
    const response = await fetch('data.json');
    const data = await response.json();
    questionBank = data.questions;
  } catch (error) {
    console.error("Failed to load questions:", error);
    alert("Could not load questions. Please try again later.");
  }
}

async function startGame() {
  await loadQuestions();
  const num = parseInt(document.getElementById("numQuestions").value);
  if (num < 1 || num > questionBank.length) {
    alert(`Please choose between 1 and ${questionBank.length} questions.`);
    return;
  }
  selectedQuestions = questionBank.sort(() => 0.5 - Math.random()).slice(0, num);
  currentIndex = 0;
  score = 0;
  document.getElementById("setup").classList.add("hidden");
  document.getElementById("quiz").classList.remove("hidden");
  showQuestion();
}

function showQuestion() {
  const q = selectedQuestions[currentIndex];
  document.getElementById("question").textContent = `Q${currentIndex + 1}: ${q.question}`;
  const optionsList = document.getElementById("options");
  optionsList.innerHTML = "";
  q.options.forEach((opt, i) => {
    const li = document.createElement("li");
    li.innerHTML = `<label><input type="radio" name="option" value="${i}"> ${opt}</label>`;
    optionsList.appendChild(li);
  });
}

function nextQuestion() {
  const selected = document.querySelector('input[name="option"]:checked');
  if (!selected) {
    alert("Please select an answer.");
    return;
  }
  if (parseInt(selected.value) === selectedQuestions[currentIndex].answer) {
    score++;
  }
  currentIndex++;
  if (currentIndex < selectedQuestions.length) {
    showQuestion();
  } else {
    endGame();
  }
}

function endGame() {
  document.getElementById("quiz").classList.add("hidden");
  document.getElementById("result").classList.remove("hidden");
  document.getElementById("score").textContent = `${score} / ${selectedQuestions.length}`;
}

function saveScore() {
  const name = document.getElementById("playerName").value.trim();
  if (!name) {
    alert("Enter your name to save score.");
    return;
  }
  const leaderboard = JSON.parse(localStorage.getItem("leaderboard") || "[]");
  leaderboard.push({ name, score });
  leaderboard.sort((a, b) => b.score - a.score);
  localStorage.setItem("leaderboard", JSON.stringify(leaderboard));
  showLeaderboard();
}

function showLeaderboard() {
  document.getElementById("result").classList.add("hidden");
  document.getElementById("leaderboard").classList.remove("hidden");
  const list = document.getElementById("leaderboardList");
  list.innerHTML = "";
  const leaderboard = JSON.parse(localStorage.getItem("leaderboard") || "[]");
  leaderboard.slice(0, 10).forEach(entry => {
    const li = document.createElement("li");
    li.textContent = `${entry.name}: ${entry.score}`;
    list.appendChild(li);
  });
}

function resetGame() {
  document.getElementById("leaderboard").classList.add("hidden");
  document.getElementById("setup").classList.remove("hidden");
}
