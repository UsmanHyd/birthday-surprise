function initBox1({ onComplete }) {
  const target = document.getElementById("chest-target");
  const fill = document.getElementById("box1-progress-fill");
  const percent = document.getElementById("box1-progress-percent");
  const flash = document.getElementById("box1-flash");
  const gameEl = document.getElementById("box1-game");
  const revealEl = document.getElementById("box1-reveal");
  const revealImage = document.getElementById("box1-reveal-image");
  const swapPopup = document.getElementById("box1-swap-popup");
  const swapText = document.getElementById("box1-swap-text");

  document.getElementById("box1-title").textContent = CONFIG.box1.title;
  document.getElementById("box1-instructions").textContent = CONFIG.box1.instructions;
  swapText.textContent = CONFIG.box1.swapMessage;

  let clicks = 0;
  let done = false;
  let idleTimer = null;
  const swapTimers = [];

  function updateUI() {
    const pct = Math.min(100, (clicks / CONFIG.box1.clicksNeeded) * 100);
    fill.style.width = pct + "%";
    percent.textContent = Math.round(pct) + "%";
    percent.classList.remove("pop");
    void percent.offsetWidth;
    percent.classList.add("pop");
  }

  function resetProgress() {
    if (clicks === 0) return;
    clicks = 0;
    updateUI();
    target.classList.add("shake");
    setTimeout(() => target.classList.remove("shake"), 350);
  }

  function scheduleIdleReset() {
    clearTimeout(idleTimer);
    idleTimer = setTimeout(resetProgress, CONFIG.box1.idleResetMs);
  }

  function clearSwapTimers() {
    swapTimers.forEach(clearTimeout);
    swapTimers.length = 0;
  }

  // first shows the joke photo, then a couple seconds later pops up an
  // "oops, wrong gift" note and swaps in the real photo underneath it
  function playSwapSequence() {
    clearSwapTimers();
    revealImage.src = CONFIG.box1.jokeImageSrc;

    swapTimers.push(setTimeout(() => {
      swapPopup.classList.remove("hidden");
      void swapPopup.offsetWidth;
      swapPopup.classList.add("visible");
    }, 1400));

    swapTimers.push(setTimeout(() => {
      swapPopup.classList.remove("visible");
      revealImage.classList.add("swapping");
      setTimeout(() => {
        revealImage.src = CONFIG.box1.realImageSrc;
        revealImage.classList.remove("swapping");
      }, 200);
    }, 3400));

    swapTimers.push(setTimeout(() => {
      swapPopup.classList.add("hidden");
    }, 3900));
  }

  function triggerSuccess() {
    target.classList.add("opened");
    flash.classList.add("flashing");
    setTimeout(() => {
      gameEl.classList.add("hidden");
      revealEl.classList.remove("hidden");
      burstConfetti();
      playSwapSequence();
      if (onComplete) onComplete();
    }, 380);
    setTimeout(() => flash.classList.remove("flashing"), 760);
  }

  function onClick() {
    if (done) return;
    clicks++;
    target.classList.add("pulse");
    setTimeout(() => target.classList.remove("pulse"), 120);
    updateUI();
    if (clicks >= CONFIG.box1.clicksNeeded) {
      done = true;
      clearTimeout(idleTimer);
      triggerSuccess();
    } else {
      scheduleIdleReset();
    }
  }

  target.addEventListener("click", onClick);
  updateUI();

  function reset() {
    done = false;
    clicks = 0;
    clearTimeout(idleTimer);
    clearSwapTimers();
    target.classList.remove("opened");
    updateUI();
    gameEl.classList.remove("hidden");
    revealEl.classList.add("hidden");
    swapPopup.classList.add("hidden");
    swapPopup.classList.remove("visible");
    revealImage.src = CONFIG.box1.jokeImageSrc;
  }

  return { reset };
}
