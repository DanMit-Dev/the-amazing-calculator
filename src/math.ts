import { create, all } from 'mathjs';
const math = create(all);

// Evaluate numeric expression
export function evaluateExpression(expr: string): string {
  try { return math.evaluate(expr).toString(); }
  catch { return 'Error'; }
}

export function solveLinear(a: number, b: number): string {
  if (a === 0) return b === 0 ? 'Infinite solutions' : 'No solution';
  return (-b / a).toString();
}

export function solveQuadratic(a: number, b: number, c: number): string {
  if (a === 0) return solveLinear(b, c);
  const D = b * b - 4 * a * c;
  if (D < 0) return 'No real solution';
  const x1 = (-b + Math.sqrt(D)) / (2 * a);
  const x2 = (-b - Math.sqrt(D)) / (2 * a);
  return `${x1}, ${x2}`;
}

export function solveCubic(a: number, b: number, c: number, d: number): string {
  if (a === 0) return solveQuadratic(b, c, d);
  const f = ((3 * c / a) - (b * b) / (a * a)) / 3;
  const g = ((2 * b * b * b) / (a * a * a) - (9 * b * c) / (a * a) + (27 * d) / a) / 27;
  const h = g * g / 4 + f * f * f / 27;

  if (h > 0) {
    const R = -(g / 2) + Math.sqrt(h);
    const S = Math.cbrt(R);
    const T = -(g / 2) - Math.sqrt(h);
    const U = Math.cbrt(T);
    const x = S + U - b / (3 * a);
    return `${x}`;
  } else {
    const i = Math.sqrt((g * g / 4) - h);
    const j = Math.cbrt(i);
    const k = Math.acos(-(g / (2 * i)));
    const p = -b / (3 * a);
    const x1 = 2 * j * Math.cos(k / 3) + p;
    const x2 = -j * (Math.cos(k / 3) + Math.sqrt(3) * Math.sin(k / 3)) + p;
    const x3 = -j * (Math.cos(k / 3) - Math.sqrt(3) * Math.sin(k / 3)) + p;
    return `${x1}, ${x2}, ${x3}`;
  }
}

export function ruleOfThree(a: number, b: number, c: number): number {
  if (a === 0) throw new Error('Division by zero');
  return (b * c) / a;
}
