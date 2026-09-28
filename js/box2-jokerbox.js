function initBox2({ onComplete }) {
  const wrap = document.getElementById("crank-target");
  const handle = document.getElementById("crank-handle");
  const lid = document.getElementById("joker-lid");
  const fill = document.getElementById("box2-progress-fill");
  const revealEl = document.getElementById("box2-reveal");
  const gameEl = document.getElementById("box2-game");
  const captionEl = document.getElementById("box2-caption");
  const audio = document.getElementById("box2-audio");
  const windAudio = document.getElementById("box2-wind-audio");
  const videoWrap = document.getElementById("box2-video-wrap");
  const video = document.getElementById("box2-video");

  document.getElementById("box2-title").textContent = CONFIG.box2.title;
  document.getElementById("box2-instructions").textContent = CONFIG.box2.instructions;
  captionEl.textContent = CONFIG.box2.revealCaption;
  audio.src = CONFIG.box2.audioSrc;
  windAudio.src = CONFIG.box2.windAudioSrc;
  video.src = CONFIG.box2.videoSrc;

  const windMs = CONFIG.box2.windMs || 3000;
  let started = false;
  let done = false;
  let autoStartTimer = null;
  let windTimer = null;
  let popTimer = null;

  // fully automatic wind-up: the handle spins two full turns on its own
  // over `windMs`, the fill bar tracks the same duration, then the lid
  // pops open and the video emerges from the box — no tap needed
  function startWind() {
    if (started || done) return;
    started = true;
    wrap.classList.add("winding");

    windAudio.currentTime = 0;
    windAudio.play().catch(() => {});

    handle.style.transition = `transform ${windMs}ms cubic-bezier(0.45, 0, 0.2, 1)`;
    void handle.offsetWidth; // force reflow so the transition starts from 0deg
    handle.style.transform = "rotate(720deg)";

    fill.style.transition = `width ${windMs}ms linear`;
    void fill.offsetWidth; // force reflow so the transition starts from 0%
    fill.style.width = "100%";

    windTimer = setTimeout(() => {
      done = true;
      windAudio.pause();
      triggerPop();
    }, windMs);
  }

  function triggerPop() {
    wrap.classList.remove("winding");
    lid.classList.add("open");
    audio.currentTime = 0;
    audio.play().catch(() => {});

    // gives the lid a beat to visibly swing open before the video
    // springs out of the box in its place
    popTimer = setTimeout(() => {
      gameEl.classList.add("hidden");
      playVideo();
    }, 450);
  }

  function playVideo() {
    videoWrap.classList.remove("hidden");
    videoWrap.classList.remove("needs-tap");
    video.currentTime = 0;
    const playPromise = video.play();
    if (playPromise && playPromise.catch) {
      // autoplay can be blocked by the browser — fall back to a one-time
      // tap-to-start prompt; once it's playing there is still no
      // pause/skip control
      playPromise.catch(() => videoWrap.classList.add("needs-tap"));
    }
  }

  function onVideoEnded() {
    videoWrap.classList.add("hidden");
    videoWrap.classList.remove("needs-tap");
    revealEl.classList.remove("hidden");
    burstConfetti();
    if (onComplete) onComplete();
  }

  video.addEventListener("ended", onVideoEnded);
  videoWrap.addEventListener("click", () => {
    if (videoWrap.classList.contains("needs-tap")) {
      videoWrap.classList.remove("needs-tap");
      video.play().catch(() => {});
    }
  });

  function reset() {
    started = false;
    done = false;
    clearTimeout(autoStartTimer);
    clearTimeout(windTimer);
    clearTimeout(popTimer);
    wrap.classList.remove("winding");
    handle.style.transition = "none";
    handle.style.transform = "rotate(0deg)";
    fill.style.transition = "none";
    fill.style.width = "0%";
    lid.classList.remove("open");
    gameEl.classList.remove("hidden");
    revealEl.classList.add("hidden");
    videoWrap.classList.add("hidden");
    videoWrap.classList.remove("needs-tap");
    windAudio.pause();
    video.pause();
    video.currentTime = 0;

    // small delay so this fires after the screen is actually shown
    // (reset() runs just before showScreen()) — otherwise the wind-up
    // transition would be set while still display:none and never animate
    autoStartTimer = setTimeout(startWind, 150);
  }

  return { reset };
}
