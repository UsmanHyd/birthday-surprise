function initFinale() {
  document.getElementById("finale-eyebrow").textContent = CONFIG.finale.eyebrow;
  document.getElementById("finale-greeting").textContent = CONFIG.finale.greeting;
  document.getElementById("finale-letter").textContent = CONFIG.finale.letter;
  document.getElementById("finale-signature").textContent = CONFIG.finale.signature;

  const locked = document.getElementById("letter-locked");
  const card = document.getElementById("letter-card");
  let unlocked = false;
  let unlockTimer = null;

  function burstFinaleConfetti() {
    burstConfetti({ origin: { y: 0.5 } });
    setTimeout(() => burstConfetti({ origin: { x: 0.15, y: 0.6 } }), 300);
    setTimeout(() => burstConfetti({ origin: { x: 0.85, y: 0.6 } }), 550);
  }

  // locked envelope -> tap -> flap opens + paper slides out -> the full
  // letter takes over
  function unlock() {
    if (unlocked) return;
    unlocked = true;
    locked.classList.add("unlocking");
    unlockTimer = setTimeout(() => {
      locked.classList.add("hidden");
      card.classList.remove("hidden");
      burstFinaleConfetti();
    }, 700);
  }

  locked.addEventListener("click", unlock);

  function reset() {
    unlocked = false;
    clearTimeout(unlockTimer);
    locked.classList.remove("unlocking");
    locked.classList.remove("hidden");
    card.classList.add("hidden");
  }

  return { reset };
}
