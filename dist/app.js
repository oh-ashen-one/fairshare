"use strict";
const prompt = document.querySelector("#prompt-text");
const buttons = document.querySelectorAll(".copy-button");
for (const button of buttons) {
  button.hidden = false;
  const status = document.getElementById(button.dataset.copyStatus);
  const initialLabel = button.innerHTML;
  let resetTimer;
  button.addEventListener("click", async (event) => {
    event.preventDefault();
    clearTimeout(resetTimer);
    try {
      await navigator.clipboard.writeText(prompt.textContent.trim());
      button.textContent = "Copied. Paste into your AI. ✓";
      status.textContent = "Copied! Open your AI agent and paste to begin.";
    } catch {
      // Move to the always-readable prompt when clipboard permission is denied.
      prompt.scrollIntoView({ block: "center" });
      prompt.focus({ preventScroll: true });
      const selection = window.getSelection();
      if (selection) {
        const range = document.createRange();
        range.selectNodeContents(prompt);
        selection.removeAllRanges();
        selection.addRange(range);
      }
      const message = "Copy isn’t available here. Select and copy the prompt, or download the .txt file.";
      status.textContent = message;
      document.getElementById("copy-status").textContent = message;
      button.textContent = "Try copying again ⧉";
      return;
    }
    resetTimer = setTimeout(() => { button.innerHTML = initialLabel; }, 3500);
  });
}
