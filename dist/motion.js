"use strict";
const motion = document.getElementById("research-motion");
const playButton = document.getElementById("demo-play");
const panel = document.getElementById("demo-panel");
const description = document.getElementById("demo-description");
const tabs = Array.from(document.querySelectorAll(".demo-tabs [role=tab]"));
const mobile = window.matchMedia("(max-width: 700px)");
const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
const descriptions = {
  context: "Share only what you choose: a service, a location, and approximate dates. Your agent starts there.",
  search: "Your agent searches for possible cases, follows links to official notices, and checks the current claim status.",
  verify: "It compares the actual rules with your context and flags any missing facts or evidence. A familiar brand alone is not enough.",
  results: "You get potential matches, sourced payout estimates, deadlines, and official filing links. You review and file yourself. The amounts shown here are fictional."
};
let active = tabs[0];
let visible = false;
let attempted = false;
let loaded = false;
let generation = 0;
motion.muted = true;
motion.defaultMuted = true;
motion.playsInline = true;
motion.loop = false;
function assets(tab) {
  return mobile.matches ? {src:tab.dataset.mobileSrc,poster:tab.dataset.mobilePoster} : {src:tab.dataset.desktopSrc,poster:tab.dataset.desktopPoster};
}
function showPoster() {
  generation++;
  motion.pause();
  motion.removeAttribute("src");
  motion.poster = assets(active).poster;
  motion.load();
  loaded = false;
  playButton.textContent = "Watch this stage ↗";
  playButton.hidden = false;
}
function playStage() {
  const ticket = ++generation;
  if (!loaded) { motion.src = assets(active).src; loaded = true; }
  motion.currentTime = 0;
  attempted = true;
  motion.play().catch(() => {
    if (ticket === generation) { playButton.textContent = "Watch this stage ↗"; playButton.hidden = false; }
  });
}
function selectStage(tab, play = true) {
  active = tab;
  for (const item of tabs) {
    item.setAttribute("aria-selected", String(item === tab));
    item.tabIndex = item === tab ? 0 : -1;
  }
  panel.setAttribute("aria-labelledby", tab.id);
  description.textContent = descriptions[tab.dataset.phase];
  attempted = false;
  showPoster();
  if (play && !reduced.matches && !navigator.connection?.saveData) playStage();
}
for (const [index,tab] of tabs.entries()) {
  tab.disabled = false;
  tab.addEventListener("click", () => selectStage(tab));
  tab.addEventListener("keydown", event => {
    let next;
    if (event.key === "ArrowRight") next = (index + 1) % tabs.length;
    if (event.key === "ArrowLeft") next = (index + tabs.length - 1) % tabs.length;
    if (event.key === "Home") next = 0;
    if (event.key === "End") next = tabs.length - 1;
    if (next === undefined) return;
    event.preventDefault();
    tabs[next].focus();
    selectStage(tabs[next]);
  });
}
playButton.addEventListener("click", playStage);
motion.addEventListener("playing", () => {
  if (!visible || document.hidden) { motion.pause(); playButton.hidden = false; return; }
  playButton.hidden = true;
});
motion.addEventListener("ended", () => { playButton.textContent = "Replay stage ↗"; playButton.hidden = false; });
motion.addEventListener("error", () => {
  generation++;
  motion.removeAttribute("src");
  loaded = false;
  motion.load();
  playButton.textContent = "Retry stage ↗";
  playButton.hidden = false;
});
mobile.addEventListener("change", () => { attempted = true; showPoster(); });
reduced.addEventListener("change", () => { if (reduced.matches) { attempted = true; showPoster(); } });
document.addEventListener("visibilitychange", () => {
  if (document.hidden && !motion.paused) { motion.pause(); playButton.textContent = "Replay stage ↗"; playButton.hidden = false; }
});
showPoster();
if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(entries => {
    visible = entries.some(entry => entry.isIntersecting && entry.intersectionRatio >= 0.35);
    if (!visible && !motion.paused) { motion.pause(); playButton.hidden = false; }
    if (visible && !attempted && !reduced.matches && !navigator.connection?.saveData) playStage();
  }, {threshold:[0,.35]});
  observer.observe(motion);
} else { visible = true; }
