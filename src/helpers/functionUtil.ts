import { FunctionItem } from '../slice/functionSlice';

export const validateFunctionInput = (input: string): boolean => {
  if (input.trim() === '') return true;

  // Regular expression to allow numbers, whitespace, basic arithmetic operations, parentheses, and a single variable (e.g., x)
  const validPattern = /^[\d+\-*/^().\s*x]+$/;
  return validPattern.test(input);
};

export const evaluateEquation = (
  equation: string,
  variableValue: number
): number => {
  // Remove all spaces from the equation
  equation = equation.replace(/\s/g, '');

  // Replace any number followed by 'x' or 'x' followed by number with multiplication
  // For example: 2x becomes 2*x
  equation = equation.replace(/(\d)x/g, `$1*${variableValue}`);
  equation = equation.replace(/x(\d)/g, `${variableValue}*$1`);

  // Replace any remaining 'x' with the variable value
  equation = equation.replace(/x/g, variableValue.toString());

  try {
    const result = new Function('return ' + equation)();
    return typeof result === 'number' ? result : variableValue;
  } catch (e) {
    console.error('Error evaluating equation:', e);
    return variableValue;
  }
};

export const findFunctionByKey = (
  functions: FunctionItem[],
  functionKey: string
): { function: FunctionItem | undefined; index: number } => {
  const index = functions.findIndex((fn) => fn.key === functionKey);
  return { function: functions[index], index };
};

export function sortFunctionArrayInSequence(arr: FunctionItem[]) {
  let current = arr.find((element) => element.key === 'Function: 1');
  let sequence = [];

  while (current && current.nextFn !== '-') {
    sequence.push(current);
    current = arr.find((element) => element.key === current?.nextFn);
  }

  if (current) {
    sequence.push(current);
  }

  return sequence;
}
