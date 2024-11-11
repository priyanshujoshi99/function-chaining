type MathFunction = (input: string, variableValue?: number) => number | string;

const validateInput = (input: string): boolean => {
  // Regular expression to allow numbers, whitespace, basic arithmetic operations, parentheses, and a single variable (e.g., x)
  const validPattern = /^[\d+\-*/^().\s*x]+$/;
  return validPattern.test(input);
};

const evaluateExpression = (
  expression: string,
  variableValue: number = 0
): number | string => {
  if (!validateInput(expression)) return 'Invalid input';

  try {
    // Replace variable 'x' with its actual numeric value
    const sanitizedExpression = expression.replace(/x/g, `(${variableValue})`);
    return new Function(`return ${sanitizedExpression}`)();
  } catch {
    return 'Invalid expression';
  }
};

export const mathFunctions: Record<string, MathFunction> = {
  addEquation: evaluateExpression,
  subtractEquation: evaluateExpression,
  multiplyEquation: evaluateExpression,
  divideEquation: evaluateExpression,
  exponentEquation: evaluateExpression
};
