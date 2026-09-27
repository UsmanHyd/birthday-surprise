const HUB = { x: 210, y: 145 }; // crank hub center, in the SVG's own viewBox units

function initBox2({ onComplete }) {
  const wrap = document.getElementById("crank-target");
  const svg = wrap.querySelector(".joker-svg");
  const handle = document.getElementById("crank-handle");
  const lid = document.getElementById("joker-lid");
  const figure = document.getElementById("joker-figure");
  const fill = document.getElementById("box2-progress-fill");
  const label = document.getElementById("box2-progress-label");
  const instructions = document.getElementById("box2-instructions");
  const progressTrack = wrap.parentElement.querySelector(".progress-track");
  const revealEl = document.getElementById("box2-reveal");
  const gameEl = document.getElementById("box2-game");
  const captionEl = document.getElementById("box2-caption");
  const audio = document.getElementById("box2-audio");

  document.getElementById("box2-title").textContent = CONFIG.box2.title;
  instructions.textContent = CONFIG.box2.instructions;
  captionEl.textContent = CONFIG.box2.revealCaption;
  audio.src = CONFIG.box2.audioSrc;

  const turnsNeeded = CONFIG.box2.turnsNeeded;
  const degreesNeeded = turnsNeeded * 360;

  let totalDegrees = 0;
  let visualAngle = 0;
  let dragging = false;
  let lastAngle = null;
  let done = false;

  function localPoint(clientX, clientY) {
    const rect = svg.getBoundingClientRect();
    const vb = svg.viewBox.baseVal;
    const scaleX = vb.width / rect.width;
    const scaleY = vb.height / rect.height;
    return {
      x: (clientX - rect.left) * scaleX + vb.x,
      y: (clientY - rect.top) * scaleY + vb.y,
    };
  }

  function angleAt(clientX, clientY) {
    const p = localPoint(clientX, clientY);
    return (Math.atan2(p.y - HUB.y, p.x - HUB.x) * 180) / Math.PI;
  }

  function updateUI() {
    const pct = Math.min(100, (totalDegrees / degreesNeeded) * 100);
    fill.style.width = pct + "%";
    const turns = Math.min(turnsNeeded, totalDegrees / 360);
    label.textContent = `${turns.toFixed(1)} / ${turnsNeeded} turns`;
  }

  function onPointerDown(e) {
    if (done) return;
    dragging = true;
    lastAngle = angleAt(e.clientX, e.clientY);
    wrap.setPointerCapture(e.pointerId);
  }

  function onPointerMove(e) {
    if (!dragging || done) return;
    const angle = angleAt(e.clientX, e.clientY);
    let delta = angle - lastAngle;
    if (delta > 180) delta -= 360;
    if (delta < -180) delta += 360;
    lastAngle = angle;

    totalDegrees += Math.abs(delta);
    visualAngle += delta;
    handle.style.transform = `rotate(${visualAngle}deg)`;
    updateUI();

    if (totalDegrees >= degreesNeeded) {
      done = true;
      triggerPop();
    }
  }

  function onPointerUp(e) {
    dragging = false;
    if (wrap.hasPointerCapture && wrap.hasPointerCapture(e.pointerId)) {
      wrap.releasePointerCapture(e.pointerId);
    }
  }

  function triggerPop() {
    lid.classList.add("open");
    figure.classList.add("popped");
    instructions.classList.add("hidden");
    if (progressTrack) progressTrack.classList.add("hidden");
    label.classList.add("hidden");
    audio.currentTime = 0;
    audio.play().catch(() => {});
    setTimeout(() => {
      revealEl.classList.remove("hidden");
      burstConfetti();
      if (onComplete) onComplete();
    }, 550);
  }

  wrap.addEventListener("pointerdown", onPointerDown);
  wrap.addEventListener("pointermove", onPointerMove);
  wrap.addEventListener("pointerup", onPointerUp);
  wrap.addEventListener("pointercancel", onPointerUp);

  updateUI();

  function reset() {
    done = false;
    dragging = false;
    totalDegrees = 0;
    visualAngle = 0;
    handle.style.transform = "rotate(0deg)";
    lid.classList.remove("open");
    figure.classList.remove("popped");
    instructions.classList.remove("hidden");
    if (progressTrack) progressTrack.classList.remove("hidden");
    label.classList.remove("hidden");
    audio.pause();
    gameEl.classList.remove("hidden");
    revealEl.classList.add("hidden");
    updateUI();
  }

  return { reset };
}
