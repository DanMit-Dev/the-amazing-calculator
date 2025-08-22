import { create, all } from 'mathjs';
const math = create(all);

// Basic expression evaluator
export const evaluateExpression = (expr: string) => {
  return math.evaluate(expr).toString();
};

// Linear equation solver: ax + b = 0
export const solveLinear = (a: number, b: number) => {
  if (a === 0) return "No solution";
  return ((-b) / a).toString();
};

// Quadratic equation solver: ax² + bx + c = 0
export const solveQuadratic = (a: number, b: number, c: number) => {
  const discriminant = math.subtract(math.square(b), math.multiply(4, a, c));
  if (discriminant < 0) return "No real solution";
  const root1 = math.divide(math.add(-b, math.sqrt(discriminant)), 2 * a);
  const root2 = math.divide(math.subtract(-b, math.sqrt(discriminant)), 2 * a);
  return `${root1}, ${root2}`;
};

// Cubic equation solver: ax³ + bx² + cx + d = 0
export const solveCubic = (a: number, b: number, c: number, d: number) => {
  // Add logic for solving cubic equations (optional complexity)
  return "Cubic solver not implemented yet";
};

// Rule of Three
export const ruleOfThree = (a: number, b: number, c: number) => {
  return math.multiply(b, c) / a;
};
