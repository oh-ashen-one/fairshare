"use strict";
const motion = document.getElementById("research-motion");
const motionToggle = document.getElementById("motion-toggle");
const motionOverlay = document.getElementById("motion-overlay");
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
let motionLoaded = false;
let inView = false;
let userPaused = false;
let userStarted = false;
let failed = false;
let attempt = 0;
// Set properties before loading a source for mobile inline/autoplay behavior.
motion.muted = true;
motion.defaultMuted = true;
motion.playsInline = true;
motion.loop = true;
function loadMotion() {
  if (!motionLoaded) { motion.src = motion.dataset.src; motionLoaded = true; }
}
function showState(playing) {
  const label = playing ? "Pause animation" : "Play animation";
  motionToggle.textContent = label;
  motionToggle.setAttribute("aria-label", label);
  motionToggle.setAttribute("aria-pressed", String(playing));
  motionOverlay.hidden = playing || failed;
}
function allowed() {
  return userStarted || (!reducedMotion.matches && !navigator.connection?.saveData);
}
function playMotion() {
  if (failed) return;
  loadMotion();
  const currentAttempt = ++attempt;
  motion.play().catch(() => {
    if (currentAttempt === attempt) showState(false);
  });
}
function pauseMotion() { attempt++; motion.pause(); showState(false); }
function toggleMotion() {
  if (!motion.paused) { userPaused = true; pauseMotion(); return; }
  userPaused = false;
  userStarted = true;
  playMotion();
}
motionToggle.hidden = false;
showState(false);
motion.addEventListener("playing", () => {
  // A play promise can resolve after the card has left the viewport.
  if (!inView || document.hidden || userPaused) { pauseMotion(); return; }
  showState(true);
});
motion.addEventListener("pause", () => showState(false));
motion.addEventListener("error", () => {
  failed = true;
  motion.hidden = true;
  motion.parentElement.style.backgroundImage = `url(${motion.poster})`;
  motion.parentElement.style.backgroundSize = "cover";
  motionToggle.textContent = "Animation unavailable";
  motionToggle.disabled = true;
  motionOverlay.hidden = true;
});
motionToggle.addEventListener("click", toggleMotion);
motionOverlay.addEventListener("click", toggleMotion);
reducedMotion.addEventListener("change", () => {
  userStarted = false;
  if (reducedMotion.matches) pauseMotion();
  else if (inView && !userPaused && !document.hidden && allowed()) playMotion();
});
document.addEventListener("visibilitychange", () => {
  if (document.hidden) pauseMotion();
  else if (inView && !userPaused && allowed()) playMotion();
});
if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(entries => {
    inView = entries.some(entry => entry.isIntersecting && entry.intersectionRatio >= 0.5);
    if (!inView) pauseMotion();
    else if (!userPaused && !document.hidden && allowed()) playMotion();
  }, { threshold: [0, 0.5] });
  observer.observe(motion);
} else {
  // Older browsers retain the explicit play control.
  inView = true;
}
