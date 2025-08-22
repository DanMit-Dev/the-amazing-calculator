import { evaluateExpression, solveLinear, solveQuadratic, solveCubic, ruleOfThree } from './math';

function safeParse(n: string | null): number {
  const v = parseFloat(n ?? 'NaN');
  if (Number.isNaN(v) || !Number.isFinite(v)) throw new Error('Invalid number');
  return v;
}

window.addEventListener('DOMContentLoaded', () => {
  const display = document.getElementById('display') as HTMLInputElement;
  const buttons = document.querySelectorAll('button[data-value]');
  const linearBtn = document.getElementById('linear-btn')!;
  const quadBtn = document.getElementById('quadratic-btn')!;
  const cubicBtn = document.getElementById('cubic-btn')!;
  const rule3Btn = document.getElementById('rule3-btn')!;
  const themeToggle = document.getElementById('theme-toggle')!;
  const body = document.body;

  const setOutput = (t: string) => { display.value = t; };

  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      const val = (btn as HTMLButtonElement).dataset.value!;
      if (val === 'C') setOutput('');
      else if (val === '=') setOutput(evaluateExpression(display.value));
      else setOutput(display.value + val);
    });
  });

  window.addEventListener('keydown', (e) => {
    if (/^[\d+\-*/.=]$/.test(e.key)) {
      if (e.key === '=' || e.key === 'Enter') setOutput(evaluateExpression(display.value));
      else setOutput(display.value + (e.key === 'Enter' ? '' : e.key));
    } else if (e.key.toLowerCase() === 'c') { setOutput(''); }
    else if (e.key === 'Backspace') { setOutput(display.value.slice(0, -1)); }
  });

  linearBtn.addEventListener('click', () => {
    try {
      const a = safeParse(prompt('Enter a (ax + b = 0):'));
      const b = safeParse(prompt('Enter b (ax + b = 0):'));
      setOutput(solveLinear(a, b));
    } catch { setOutput('Error'); }
  });

  quadBtn.addEventListener('click', () => {
    try {
      const a = safeParse(prompt('Enter a (ax² + bx + c = 0):'));
      const b = safeParse(prompt('Enter b (ax² + bx + c = 0):'));
      const c = safeParse(prompt('Enter c (ax² + bx + c = 0):'));
      setOutput(solveQuadratic(a, b, c));
    } catch { setOutput('Error'); }
  });

  cubicBtn.addEventListener('click', () => {
    try {
      const a = safeParse(prompt('Enter a (ax³ + bx² + cx + d = 0):'));
      const b = safeParse(prompt('Enter b (ax³ + bx² + cx + d = 0):'));
      const c = safeParse(prompt('Enter c (ax³ + bx² + cx + d = 0):'));
      const d = safeParse(prompt('Enter d (ax³ + bx² + cx + d = 0):'));
      setOutput(solveCubic(a, b, c, d));
    } catch { setOutput('Error'); }
  });

  rule3Btn.addEventListener('click', () => {
    try {
      const a = safeParse(prompt('Enter a:'));
      const b = safeParse(prompt('Enter b:'));
      const c = safeParse(prompt('Enter c:'));
      setOutput(ruleOfThree(a, b, c).toString());
    } catch { setOutput('Error'); }
  });

  themeToggle.addEventListener('click', () => {
    body.setAttribute('data-theme', body.getAttribute('data-theme') === 'light' ? 'dark' : 'light');
  });
});
