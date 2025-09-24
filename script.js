// === 1. DATA HARDCODED ===
// (woordenlijst.js moet vooraf ingeladen zijn)

// === 2. ELEMENTEN ===
const themaSelect = document.getElementById("themaSelect");
const subthemaSelect = document.getElementById("subthemaSelect");
const startBtn = document.getElementById("startBtn");
const quizDiv = document.getElementById("quiz");
const translationP = document.getElementById("translation");
const answerInput = document.getElementById("answer");
const feedbackP = document.getElementById("feedback");

// ✅ extra element voor resterende woorden
const remainingP = document.createElement("p");
remainingP.style.marginTop = "1rem";
remainingP.style.fontWeight = "600";
quizDiv.appendChild(remainingP);

let currentWord = null;
let toLearn = []; // woorden die nog minstens 1x juist moeten zijn

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
function nextWord() {
  feedbackP.textContent = "";
  answerInput.value = "";

  if (toLearn.length === 0) {
    translationP.textContent = "🎉 Alle woorden correct beantwoord!";
    remainingP.textContent = "Nog te beheersen: 0";
    currentWord = null;
    return;
  }

  const idx = Math.floor(Math.random() * toLearn.length);
  currentWord = toLearn[idx];
  translationP.textContent = `Vertaling: ${currentWord.vertaling}`;
  remainingP.textContent = `Nog te beheersen: ${toLearn.length}`;
  answerInput.focus();
}

startBtn.addEventListener("click", () => {
  // Filter selectie
  const selectedThema = themaSelect.value;
  const selectedSub = subthemaSelect.value;
  toLearn = woordenlijst.filter(
    w => w.thema === selectedThema && w.subthema === selectedSub
  );

  if (toLearn.length === 0) {
    alert("Geen woorden gevonden voor deze selectie.");
    return;
  }

  quizDiv.style.display = "block";
  nextWord();
});

answerInput.addEventListener("keydown", e => {
  if (e.key === "Enter" && currentWord) {
    const guess = answerInput.value.trim().toLowerCase();
    if (guess === currentWord.woord.toLowerCase()) {
      feedbackP.textContent = "✅ Juist!";
      feedbackP.style.color = "green";
      // ✅ verwijder pas als correct
      toLearn = toLearn.filter(w => w !== currentWord);
    } else {
      feedbackP.textContent = `❌ Fout. Juist was: ${currentWord.woord}`;
      feedbackP.style.color = "red";
      // ❌ fout → blijft in toLearn
    }
    setTimeout(nextWord, 1500);
  }
});
