import { useSelector } from 'react-redux';
import { MAX_CARDS } from '../helpers/constants';
import {
  evaluateEquation,
  sortFunctionArrayInSequence
} from '../helpers/functionUtil';
import { getAllFunctions, getVariableValue } from '../slice/functionSlice';

export const useCalculateValue = () => {
  const functionsFromState = useSelector(getAllFunctions);
  const variableValue = useSelector(getVariableValue);

  if (functionsFromState.length !== MAX_CARDS) return;

  let res = variableValue;

  const sortedFnArray = sortFunctionArrayInSequence(functionsFromState);

  sortedFnArray.forEach(({ value }) => {
    if (value.trim() === '') return;
    res = evaluateEquation(value, res);
  });

  return res;
};
