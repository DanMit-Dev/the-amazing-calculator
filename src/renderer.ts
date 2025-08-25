// src/renderer.ts
import { evaluateExpression, solveLinear, solveQuadratic, solveCubic, ruleOfThree } from './math';

function safeParse(n: string | null): number {
  const v = parseFloat((n ?? '').trim());
  if (Number.isNaN(v) || !Number.isFinite(v)) throw new Error('Invalid number');
  return v;
}

window.addEventListener('DOMContentLoaded', () => {
  const display = document.getElementById('display') as HTMLInputElement;
  const buttonsContainer = document.getElementById('buttons')!;
  const themeToggle = document.getElementById('theme-toggle')!;
  const linearBtn = document.getElementById('linear-btn')!;
  const quadBtn = document.getElementById('quadratic-btn')!;
  const cubicBtn = document.getElementById('cubic-btn')!;
  const rule3Btn = document.getElementById('rule3-btn')!;
  const body = document.body;

  const keys = ['7','8','9','/','4','5','6','*','1','2','3','-','0','.','=','+'];
  keys.forEach(k => {
    const b = document.createElement('button');
    b.textContent = (k === '/' ? '÷' : k === '*' ? '×' : k);
    b.dataset.value = k;
    b.addEventListener('click', () => {
      const val = b.dataset.value!;
      if (val === '=') {
        try { display.value = evaluateExpression(display.value || '0'); } catch { display.value = 'Error'; }
      } else display.value += val;
    });
    buttonsContainer.appendChild(b);
  });

  const clear = document.createElement('button');
  clear.textContent = 'Clear';
  clear.style.gridColumn = 'span 4';
  clear.addEventListener('click', () => { display.value = ''; });
  buttonsContainer.appendChild(clear);

  window.addEventListener('keydown', (e) => {
    if (/^[0-9+\-*/.=]$/.test(e.key)) {
      if (e.key === '=' || e.key === 'Enter') {
        try { display.value = evaluateExpression(display.value || '0'); } catch { display.value = 'Error'; }
      } else display.value += e.key;
    } else if (e.key === 'Backspace') display.value = display.value.slice(0,-1);
    else if (e.key === 'Escape' || e.key.toLowerCase() === 'c') display.value = '';
  });

  linearBtn.addEventListener('click', () => {
    try {
      const a = safeParse(prompt('Enter a (ax + b = 0):'));
      const b = safeParse(prompt('Enter b (ax + b = 0):'));
      display.value = solveLinear(a, b);
    } catch { display.value = 'Error'; }
  });

  quadBtn.addEventListener('click', () => {
    try {
      const a = safeParse(prompt('Enter a (ax² + bx + c = 0):'));
      const b = safeParse(prompt('Enter b (ax² + bx + c = 0):'));
      const c = safeParse(prompt('Enter c (ax² + bx + c = 0):'));
      display.value = solveQuadratic(a, b, c);
    } catch { display.value = 'Error'; }
  });

  cubicBtn.addEventListener('click', () => {
    try {
      const a = safeParse(prompt('Enter a (ax³ + bx² + cx + d = 0):'));
      const b = safeParse(prompt('Enter b (ax³ + bx² + cx + d = 0):'));
      const c = safeParse(prompt('Enter c (ax³ + bx² + cx + d = 0):'));
      const d = safeParse(prompt('Enter d (ax³ + bx² + cx + d = 0):'));
      display.value = solveCubic(a, b, c, d);
    } catch { display.value = 'Error'; }
  });

  rule3Btn.addEventListener('click', () => {
    try {
      const a = safeParse(prompt('Enter a:'));
      const b = safeParse(prompt('Enter b:'));
      const c = safeParse(prompt('Enter c:'));
      display.value = ruleOfThree(a, b, c).toString();
    } catch { display.value = 'Error'; }
  });

  themeToggle.addEventListener('click', () => {
    body.setAttribute('data-theme', body.getAttribute('data-theme') === 'light' ? 'dark' : 'light');
  });
});