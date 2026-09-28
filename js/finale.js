function initFinale() {
  document.getElementById("finale-eyebrow").textContent = CONFIG.finale.eyebrow;
  document.getElementById("finale-greeting").textContent = CONFIG.finale.greeting;
  document.getElementById("finale-letter").textContent = CONFIG.finale.letter;
  document.getElementById("finale-signature").textContent = CONFIG.finale.signature;
}

function playFinale() {
  burstConfetti({ origin: { y: 0.5 } });
  setTimeout(() => burstConfetti({ origin: { x: 0.15, y: 0.6 } }), 300);
  setTimeout(() => burstConfetti({ origin: { x: 0.85, y: 0.6 } }), 550);
}
