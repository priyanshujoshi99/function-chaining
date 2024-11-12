import { FunctionItem } from '../slice/functionSlice';

export const validateFunctionInput = (input: string): boolean => {
  // Regular expression to allow numbers, whitespace, basic arithmetic operations, parentheses, and a single variable (e.g., x)
  const validPattern = /^[\d+\-*/^().\s*x]+$/;
  return validPattern.test(input);
};

export const evaluateExpression = (
  expression: string,
  variableValue: number = 0
): number => {
  // Replace variable 'x' with its actual numeric value
  const sanitizedExpression = expression.replace(/x/g, `(${variableValue})`);
  return new Function(`return ${sanitizedExpression}`)();
};

export const findFunctionByKey = (
  functions: FunctionItem[],
  functionKey: string
): { function: FunctionItem | undefined; index: number } => {
  const index = functions.findIndex((fn) => fn.key === functionKey);
  return { function: functions[index], index };
};
