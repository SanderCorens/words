// === 1. DATA HARDCODED ===
// Simuleer je Excel-data als een array van objecten

// === 2. ELEMENTEN ===
const themaSelect = document.getElementById("themaSelect");
const subthemaSelect = document.getElementById("subthemaSelect");
const startBtn = document.getElementById("startBtn");
const quizDiv = document.getElementById("quiz");
const translationP = document.getElementById("translation");
const answerInput = document.getElementById("answer");
const feedbackP = document.getElementById("feedback");

let currentWord = null;

// === 3. INIT dropdowns ===
const themaSet = [...new Set(woordenlijst.map(w => w.thema))];
themaSet.forEach(t => {
  const opt = document.createElement("option");
  opt.value = t;
  opt.textContent = t;
  themaSelect.appendChild(opt);
});

function updateSubthema() {
  subthemaSelect.innerHTML = "";
  const subSet = [...new Set(
    woordenlijst
      .filter(w => w.thema === themaSelect.value)
      .map(w => w.subthema)
  )];
  subSet.forEach(s => {
    const opt = document.createElement("option");
    opt.value = s;
    opt.textContent = s;
    subthemaSelect.appendChild(opt);
  });
}
updateSubthema();
themaSelect.addEventListener("change", updateSubthema);

// === 4. QUIZ ===
function pickRandomWord() {
  const filtered = woordenlijst.filter(w =>
    w.thema === themaSelect.value && w.subthema === subthemaSelect.value
  );
  return filtered[Math.floor(Math.random() * filtered.length)];
}

startBtn.addEventListener("click", () => {
  currentWord = pickRandomWord();
  translationP.textContent = `Vertaling: ${currentWord.vertaling}`;
  answerInput.value = "";
  feedbackP.textContent = "";
  quizDiv.style.display = "block";
  answerInput.focus();
});

answerInput.addEventListener("keydown", e => {
  if (e.key === "Enter" && currentWord) {
    const guess = answerInput.value.trim().toLowerCase();
    if (guess === currentWord.woord.toLowerCase()) {
      feedbackP.textContent = "✅ Juist!";
      feedbackP.style.color = "green";
    } else {
      feedbackP.textContent = `❌ Fout. Het juiste woord is: ${currentWord.woord}`;
      feedbackP.style.color = "red";
    }
    // Nieuw woord na korte pauze
    setTimeout(() => {
      currentWord = pickRandomWord();
      translationP.textContent = `Vertaling: ${currentWord.vertaling}`;
      answerInput.value = "";
      feedbackP.textContent = "";
      answerInput.focus();
    }, 1500);
  }
});
