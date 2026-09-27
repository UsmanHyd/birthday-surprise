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
    colors: ["#ff8fb3", "#ffd6e8", "#b9a6f0", "#e3c15a"],
    ...options,
  });
}
