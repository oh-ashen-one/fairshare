"use strict";
const motion = document.getElementById("research-motion");
const motionToggle = document.getElementById("motion-toggle");
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
let motionLoaded = false;
function loadMotion() {
  if (!motionLoaded) { motion.src = motion.dataset.src; motionLoaded = true; }
}
function motionLabel(label, description) {
  motionToggle.textContent = label;
  motionToggle.setAttribute("aria-label", description);
}
motionToggle.hidden = false;
motion.addEventListener("play", () => motionLabel("Pause Ⅱ", "Pause the process animation"));
motion.addEventListener("pause", () => motionLabel(motion.ended ? "Replay ↻" : "Play ▷", "Play the process animation"));
motion.addEventListener("ended", () => motionLabel("Replay ↻", "Replay the process animation"));
motion.addEventListener("error", () => { motion.hidden = true; motion.parentElement.style.backgroundImage = `url(${motion.poster})`; motion.parentElement.style.backgroundSize = "cover"; motionToggle.hidden = true; });
motionToggle.addEventListener("click", () => {
  if (!motion.paused) { motion.pause(); return; }
  loadMotion();
  if (motion.ended) motion.currentTime = 0;
  motion.play().catch(() => motionLabel("Play ▷", "Play the process animation"));
});
reducedMotion.addEventListener("change", () => { if (reducedMotion.matches) motion.pause(); });
if (!reducedMotion.matches && !navigator.connection?.saveData) {
  const observer = new IntersectionObserver(entries => {
    if (entries.some(entry => entry.isIntersecting)) {
      loadMotion();
      motion.play().catch(() => motionLabel("Play ▷", "Play the process animation"));
      observer.disconnect();
    }
  }, { threshold: 0.3 });
  observer.observe(motion);
}
