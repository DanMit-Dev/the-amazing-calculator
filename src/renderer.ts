import { evaluateExpression, solveLinear, solveQuadratic, solveCubic, ruleOfThree } from "./math";

window.addEventListener("DOMContentLoaded", () => {
  const display = document.getElementById("display") as HTMLInputElement;
  const buttons = document.querySelectorAll("button[data-value]");
  const linearBtn = document.getElementById("linear-btn")!;
  const quadBtn = document.getElementById("quadratic-btn")!;
  const cubicBtn = document.getElementById("cubic-btn")!;
  const rule3Btn = document.getElementById("rule3-btn")!;
  const themeToggle = document.getElementById("theme-toggle")!;
  const body = document.body;

  // Normal calculator buttons
  buttons.forEach(btn => {
    btn.addEventListener("click", () => {
      const val = (btn as HTMLButtonElement).dataset.value!;
      if (val === "C") display.value = "";
      else if (val === "=") {
        try { display.value = evaluateExpression(display.value); } 
        catch { display.value = "Error"; }
      } else display.value += val;
    });
  });

  // Prompt-based solvers
  linearBtn.addEventListener("click", () => {
    const a = parseFloat(prompt("Enter a (ax + b = 0):")!);
    const b = parseFloat(prompt("Enter b (ax + b = 0):")!);
    display.value = solveLinear(a, b);
  });

  quadBtn.addEventListener("click", () => {
    const a = parseFloat(prompt("Enter a (ax² + bx + c = 0):")!);
    const b = parseFloat(prompt("Enter b (ax² + bx + c = 0):")!);
    const c = parseFloat(prompt("Enter c (ax² + bx + c = 0):")!);
    display.value = solveQuadratic(a, b, c);
  });

  cubicBtn.addEventListener("click", () => {
    const a = parseFloat(prompt("Enter a (ax³ + bx² + cx + d = 0):")!);
    const b = parseFloat(prompt("Enter b (ax³ + bx² + cx + d = 0):")!);
    const c = parseFloat(prompt("Enter c (ax³ + bx² + cx + d = 0):")!);
    const d = parseFloat(prompt("Enter d (ax³ + bx² + cx + d = 0):")!);
    display.value = solveCubic(a, b, c, d);
  });

  rule3Btn.addEventListener("click", () => {
    const a = parseFloat(prompt("Enter a:")!);
    const b = parseFloat(prompt("Enter b:")!);
    const c = parseFloat(prompt("Enter c:")!);
    display.value = ruleOfThree(a, b, c).toString();
  });

  // Dark/Light mode toggle
  themeToggle.addEventListener("click", () => {
    if (body.getAttribute("data-theme") === "light") body.setAttribute("data-theme", "dark");
    else body.setAttribute("data-theme", "light");
  });
});
