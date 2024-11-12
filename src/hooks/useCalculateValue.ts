import { useSelector } from 'react-redux';
import { MAX_CARDS } from '../helpers/constants';
import { evaluateEquation } from '../helpers/functionUtil';
import { getAllFunctionValues, getVariableValue } from '../slice/functionSlice';

export const useCalculateValue = () => {
  const fnValues = useSelector(getAllFunctionValues);
  const variableValue = useSelector(getVariableValue);
  let val = 0;

  if (fnValues.length !== MAX_CARDS) return;

  fnValues.forEach(({ value }) => {
    if (value.trim() === '') return;
    val += evaluateEquation(value, variableValue);
  });

  return val;
};
