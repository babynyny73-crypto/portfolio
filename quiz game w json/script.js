const quizData = [
  { q: "Worcester is located in which U.S. state?", choices: ["Massachusetts", "Connecticut", "New York", "Vermont"], a: 0 },
  { q: "Worcester is the ___ largest city in Massachusetts by population.", choices: ["1st", "2nd", "3rd", "4th"], a: 1 },
  { q: "Which technological university is located in Worcester?", choices: ["WPI", "Harvard", "Yale", "Princeton"], a: 0 },
  { q: "Which museum is located in Worcester?", choices: ["Worcester Art Museum", "MFA Boston", "Gardner Museum", "Fogg Museum"], a: 0 },
  { q: "Which interstate runs through Worcester?", choices: ["I-290", "I-95", "I-84", "I-93"], a: 0 },
  { q: "Worcester is the county seat of which county?", choices: ["Worcester County", "Middlesex", "Suffolk", "Norfolk"], a: 0 },
  { q: "What is Worcester's Triple-A baseball team?", choices: ["WooSox", "Red Sox", "Thunder", "Yard Goats"], a: 0 },
  { q: "Polar Park is used for which sport?", choices: ["Baseball", "Soccer", "Basketball", "Hockey"], a: 0 },
  { q: "Worcester nickname?", choices: ["Heart of the Commonwealth", "Big Apple", "Windy City", "Motor City"], a: 0 },
  { q: "Which university is in Worcester?", choices: ["Clark", "Brown", "Princeton", "Duke"], a: 0 }
];

let current = 0;
let answers = new Array(quizData.length).fill(null);
let timeLeft = 60;
let timer;

const startBtn = document.getElementById('start-btn');
const form = document.getElementById('quiz-form');
const questionsDiv = document.getElementById('questions');
const progressEl = document.getElementById('progress');
const timerEl = document.getElementById('timer');
const resultArea = document.getElementById('result-area');
const scoreText = document.getElementById('score-text');
const percentText = document.getElementById('percent-text');
const summaryNote = document.getElementById('summary-note');
const resetBtn = document.getElementById('reset-btn');
const submitBtn = document.getElementById('submit-btn');
const nextBtn = document.getElementById('next-btn');
const prevBtn = document.getElementById('prev-btn');
const leaderboard = document.getElementById('leaderboard');
const leaderboardList = document.getElementById('leaderboard-list');

startBtn.onclick = () => {
  startBtn.style.display = 'none';
  form.style.display = 'block';
  leaderboard.style.display = 'none';
  resultArea.style.display = 'none';
  current = 0;
  answers.fill(null);
  timeLeft = 60;
  startTimer();
  renderQuestion();
};

function startTimer() {
  timerEl.textContent = `Time left: ${timeLeft}s`;
  clearInterval(timer);
  timer = setInterval(() => {
    timeLeft--;
    timerEl.textContent = `Time left: ${timeLeft}s`;
    if (timeLeft <= 0) {
      clearInterval(timer);
      gradeQuiz();
    }
  }, 1000);
}

function renderQuestion() {
  questionsDiv.innerHTML = '';
  const q = quizData[current];
  const box = document.createElement('div');
  box.className = 'question';

  const title = document.createElement('h3');
  title.textContent = `${current + 1}. ${q.q}`;
  box.appendChild(title);

  const choices = document.createElement('div');
  choices.className = 'choices';

  q.choices.forEach((text, i) => {
    const label = document.createElement('label');
    label.className = 'choice';

    const input = document.createElement('input');
    input.type = 'radio';
    input.name = `q${current}`;
    input.value = i;
    if (answers[current] === i) input.checked = true;

    input.onchange = () => answers[current] = i;

    label.appendChild(input);
    label.appendChild(document.createTextNode(text));
    choices.appendChild(label);
  });

  box.appendChild(choices);
  questionsDiv.appendChild(box);

  progressEl.textContent = `Question ${current + 1} of ${quizData.length}`;
  prevBtn.style.display = current > 0 ? 'inline-block' : 'none';
  nextBtn.style.display = current < quizData.length - 1 ? 'inline-block' : 'none';
  submitBtn.style.display = current === quizData.length - 1 ? 'inline-block' : 'none';
}

nextBtn.onclick = () => {
  if (current < quizData.length - 1) {
    current++;
    renderQuestion();
  }
};

prevBtn.onclick = () => {
  if (current > 0) {
    current--;
    renderQuestion();
  }
};

form.onsubmit = (e) => {
  e.preventDefault();
  clearInterval(timer);
  gradeQuiz();
};

resetBtn.onclick = () => {
  clearInterval(timer);
  current = 0;
  answers.fill(null);
  form.style.display = 'none';
  startBtn.style.display = 'block';
  resultArea.style.display = 'none';
  leaderboard.style.display = 'block';
  timerEl.textContent = `Time left: 60s`;
};

function gradeQuiz() {
  let score = 0;
  quizData.forEach((q, i) => {
    if (answers[i] === q.a) score++;
  });

  const percent = Math.round((score / quizData.length) * 100);
  scoreText.textContent = `Score: ${score} / ${quizData.length}`;
  percentText.textContent = `${percent}%`;

  if (percent === 100) {
    summaryNote.textContent = "Perfect! Excellent knowledge of Worcester.";
  } else if (percent >= 70) {
    summaryNote.textContent = "Nice job — you know Worcester fairly well!";
  } else {
    summaryNote.textContent = "Good effort — read up a bit more and try again!";
  }

  resultArea.style.display = 'block';
  updateLeaderboard(score);
}

function updateLeaderboard(score) {
  const name = prompt("Enter your name for the leaderboard:");
  if (!name) return;

  const entry = { name, score };
  const data = JSON.parse(localStorage.getItem('worcesterLeaderboard') || '[]');
  data.push(entry);
  data.sort((a, b) => b.score - a.score);
  localStorage.setItem('worcesterLeaderboard', JSON.stringify(data.slice(0, 5)));

  leaderboardList.innerHTML = '';
  data.slice(0, 5).forEach((entry, i) => {
    const li = document.createElement('li');
    li.textContent = `${i + 1}. ${entry.name} — ${entry.score}/10`;
    leaderboardList.appendChild(li);
  });

  leaderboard.style.display = 'block';
}