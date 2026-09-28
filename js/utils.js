function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function burstConfetti(options = {}) {
  if (prefersReducedMotion()) return;
  if (typeof window.confetti !== "function") return;
  window.confetti({
    particleCount: 90,
    spread: 70,
    origin: { y: 0.6 },
    colors: ["#ff5da2", "#ffb703", "#8b5cf6", "#12b8a6"],
    ...options,
  });
}
