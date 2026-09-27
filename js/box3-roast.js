function initBox3({ onComplete }) {
  const gameEl = document.getElementById("box3-game");
  const revealEl = document.getElementById("box3-reveal");
  const leverBtn = document.getElementById("lever-btn");
  const leverArm = document.getElementById("lever-arm-group");
  const roastBubble = document.getElementById("roast-bubble");
  const machineScreen = document.getElementById("machine-screen");
  const typewriterEl = document.getElementById("box3-typewriter");

  document.getElementById("box3-title").textContent = CONFIG.box3.title;
  document.getElementById("box3-instructions").textContent = CONFIG.box3.instructions;

  const roastLines = CONFIG.box3.roastLines;
  const totalRoasts = roastLines.length;
  let pullCount = 0;
  let revealed = false;
  let typeTimer = null;

  function labelFor(count) {
    if (count === 0) return "Pull the Lever";
    if (count < totalRoasts) return "Pull Again";
    return "Pull for the Toast";
  }

  function showRoast(text) {
    roastBubble.classList.remove("visible");
    // force reflow so the pop-in animation restarts for each new line
    void roastBubble.offsetWidth;
    roastBubble.textContent = text;
    roastBubble.classList.add("visible");
  }

  function pulseLever() {
    leverArm.classList.add("pulled");
    setTimeout(() => leverArm.classList.remove("pulled"), 180);
  }

  function typewrite(text) {
    typewriterEl.textContent = "";
    typewriterEl.classList.remove("done");
    clearTimeout(typeTimer);

    if (prefersReducedMotion()) {
      typewriterEl.textContent = text;
      typewriterEl.classList.add("done");
      return;
    }

    let i = 0;
    function step() {
      typewriterEl.textContent = text.slice(0, i);
      i++;
      if (i <= text.length) {
        typeTimer = setTimeout(step, 28);
      } else {
        typewriterEl.classList.add("done");
      }
    }
    step();
  }

  function triggerToast() {
    revealed = true;
    machineScreen.classList.add("warm");
    setTimeout(() => {
      gameEl.classList.add("hidden");
      revealEl.classList.remove("hidden");
      typewrite(CONFIG.box3.finalMessage);
      burstConfetti();
      if (onComplete) onComplete();
    }, 400);
  }

  function onPull() {
    if (revealed) return;
    pulseLever();
    pullCount++;
    if (pullCount <= totalRoasts) {
      showRoast(roastLines[pullCount - 1]);
      leverBtn.textContent = labelFor(pullCount);
    } else {
      triggerToast();
    }
  }

  leverBtn.textContent = labelFor(0);
  leverBtn.addEventListener("click", onPull);

  function reset() {
    revealed = false;
    pullCount = 0;
    clearTimeout(typeTimer);
    roastBubble.classList.remove("visible");
    roastBubble.textContent = "";
    machineScreen.classList.remove("warm");
    leverBtn.textContent = labelFor(0);
    gameEl.classList.remove("hidden");
    revealEl.classList.add("hidden");
  }

  return { reset };
}
