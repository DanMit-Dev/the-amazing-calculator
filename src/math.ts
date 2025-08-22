import { create, all } from 'mathjs';
const math = create(all);

export const evaluateExpression = (expr: string) => {
  try { return math.evaluate(expr).toString(); }
  catch { return "Error"; }
};

export const solveLinear = (a: number, b: number) => a === 0 ? "No solution" : (-b / a).toString();

export const solveQuadratic = (a: number, b: number, c: number) => {
  const D = b*b - 4*a*c;
  if(D < 0) return "No real solution";
  const sqrtD = Math.sqrt(D);
  return `${(-b+sqrtD)/(2*a)}, ${(-b-sqrtD)/(2*a)}`;
};

// Cubic solver (Cardano's method)
export const solveCubic = (a: number, b: number, c: number, d: number) => {
  if(a===0) return solveQuadratic(b,c,d);
  const f = ((3*c/a)-(b*b)/(a*a))/3;
  const g = ((2*b*b*b)/(a*a*a)-(9*b*c)/(a*a)+(27*d)/a)/27;
  const h = g*g/4 + f*f*f/27;
  if(h>0){ 
    const R = -(g/2) + Math.sqrt(h);
    const S = Math.cbrt(R);
    const T = -(g/2) - Math.sqrt(h);
    const U = Math.cbrt(T);
    return `${S+U-b/(3*a)}`;
  } else { 
    const i = Math.sqrt((g*g/4)-h);
    const j = Math.cbrt(i);
    const k = Math.acos(-(g/(2*i)));
    const L = -j;
    const M = Math.cos(k/3);
    const N = Math.sqrt(3)*Math.sin(k/3);
    const P = -b/(3*a);
    return `${2*j*Math.cos(k/3)-b/(3*a)}, ${L*(M+N)+P}, ${L*(M-N)+P}`;
  }
};

export const ruleOfThree = (a: number, b: number, c: number) => b*c/a;
