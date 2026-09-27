function initFinale() {
  document.getElementById("finale-heading").textContent = CONFIG.finale.heading;
  document.getElementById("finale-name").textContent = CONFIG.herName;
  document.getElementById("finale-note").textContent = CONFIG.finale.closingNote;
}

function playFinale() {
  burstConfetti({ origin: { y: 0.5 } });
  setTimeout(() => burstConfetti({ origin: { x: 0.15, y: 0.6 } }), 300);
  setTimeout(() => burstConfetti({ origin: { x: 0.85, y: 0.6 } }), 550);
}
