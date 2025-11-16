export const moveCursorToEnd = (input: HTMLInputElement | null) => {
  if (!input) return;
  setTimeout(() => {
    input.selectionStart = input.value.length;
    input.selectionEnd = input.value.length;
  }, 0);
};
