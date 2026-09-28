function showScreen(id) {
  document.querySelectorAll(".screen").forEach((s) => s.classList.remove("active"));
  const target = document.getElementById(id);
  target.classList.add("active");
  target.scrollTop = 0;
  window.scrollTo(0, 0);
}

function fillLandingText() {
  document.getElementById("landing-greeting-1").textContent = CONFIG.landing.greetingLine1;
  document.getElementById("landing-briefing").textContent = CONFIG.landing.briefing;
  document.getElementById("boxes-subtitle").textContent = CONFIG.landing.boxesSubtitle;
}

function initTeaseBubble() {
  const bubble = document.getElementById("tease-bubble");
  let lastLine = null;

  function pickLine() {
    const lines = CONFIG.teaseLines;
    if (!lines.length) return "";
    let line;
    do {
      line = lines[Math.floor(Math.random() * lines.length)];
    } while (line === lastLine && lines.length > 1);
    lastLine = line;
    return line;
  }

  document.querySelectorAll(".box-card").forEach((card) => {
    card.addEventListener("mouseenter", () => {
      bubble.textContent = pickLine();
      const rect = card.getBoundingClientRect();
      bubble.style.left = `${rect.left + rect.width / 2}px`;
      bubble.style.top = `${rect.top - 12}px`;
      bubble.style.transform = "translate(-50%, -100%)";
      bubble.classList.add("visible");
    });
    card.addEventListener("mouseleave", () => {
      bubble.classList.remove("visible");
    });
    card.addEventListener("touchstart", () => {
      bubble.textContent = pickLine();
      const rect = card.getBoundingClientRect();
      bubble.style.left = `${rect.left + rect.width / 2}px`;
      bubble.style.top = `${rect.top - 12}px`;
      bubble.style.transform = "translate(-50%, -100%)";
      bubble.classList.add("visible");
      setTimeout(() => bubble.classList.remove("visible"), 1400);
    }, { passive: true });
  });
}

function init() {
  fillLandingText();
  initTeaseBubble();
  initFinale();

  const completed = { 1: false, 2: false, 3: false };

  function completeBox(n) {
    completed[n] = true;
    const card = document.querySelector(`.box-card[data-box="${n}"]`);
    if (card) card.classList.add("completed");
    if (completed[1] && completed[2] && completed[3]) {
      document.getElementById("finale-banner").classList.remove("hidden");
    }
  }

  const box1 = initBox1({ onComplete: () => completeBox(1) });
  const box2 = initBox2({ onComplete: () => completeBox(2) });
  const box3 = initBox3({ onComplete: () => completeBox(3) });
  const boxes = { 1: box1, 2: box2, 3: box3 };

  document.querySelectorAll(".box-card").forEach((card) => {
    card.addEventListener("click", () => {
      const n = card.dataset.box;
      boxes[n].reset();
      showScreen(`screen-box${n}`);
    });
  });

  document.querySelectorAll("[data-back]").forEach((btn) => {
    btn.addEventListener("click", () => showScreen("screen-boxes"));
  });

  document.getElementById("finale-banner").addEventListener("click", () => {
    showScreen("screen-finale");
    playFinale();
  });
}

document.addEventListener("DOMContentLoaded", init);
