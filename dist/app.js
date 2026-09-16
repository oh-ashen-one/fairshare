"use strict";
const button = document.querySelector(".copy-button");
const prompt = document.querySelector("#prompt-text");
const status = document.querySelector("#copy-status");
let resetTimer;
button.addEventListener("click", async () => {
  clearTimeout(resetTimer);
  try {
    await navigator.clipboard.writeText(prompt.textContent.trim());
    button.textContent = "Copied. Make it yours. ✓";
    status.textContent = "Paste it into your agent to get started.";
  } catch {
    const range = document.createRange();
    range.selectNodeContents(prompt);
    const selection = window.getSelection();
    selection.removeAllRanges();
    selection.addRange(range);
    prompt.focus();
    status.textContent = "Copy isn’t available here. Select and copy the prompt, or download the .txt file.";
    button.textContent = "Try copying again ⧉";
    return;
  }
  resetTimer = setTimeout(() => { button.innerHTML = 'Copy the prompt <span aria-hidden="true">⧉</span>'; }, 3500);
});
