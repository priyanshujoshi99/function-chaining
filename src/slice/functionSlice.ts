import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  findFunctionByKey,
  validateFunctionInput
} from '../helpers/functionUtil';

export type FunctionItem = {
  key: string;
  value: string;
  hasError: boolean;
};

interface FunctionSliceState {
  variableValue: number;
  functions: FunctionItem[];
}

const prefix = 'function';

const initialState: FunctionSliceState = {
  variableValue: 0,
  functions: []
};

export const functionSlice = createSlice({
  name: prefix,
  initialState,
  reducers: {
    saveVariableValue: (state, action: PayloadAction<number>) => {
      state.variableValue = action.payload;
    },
    saveFunctionValue: (
      state,
      action: PayloadAction<{ functionKey: string; functionValue: string }>
    ) => {
      const { functionKey, functionValue } = action.payload;
      if (!validateFunctionInput(functionValue)) return;

      const { function: fn, index } = findFunctionByKey(
        state.functions,
        functionKey
      );

      if (fn) {
        state.functions[index] = { ...fn, value: functionValue };
      } else {
        state.functions.push({
          key: functionKey,
          value: functionValue,
          hasError: false
        });
      }
    },
    updateError: (
      state,
      action: PayloadAction<{ functionKey: string; hasError: boolean }>
    ) => {
      const { functionKey, hasError } = action.payload;
      const { function: fn, index } = findFunctionByKey(
        state.functions,
        functionKey
      );

      if (fn) {
        state.functions[index] = { ...fn, hasError };
      }
    }
  }
});

export const { saveVariableValue, saveFunctionValue, updateError } =
  functionSlice.actions;

// Selectors
export const getVariableValue = (state: { [prefix]: FunctionSliceState }) =>
  state[prefix].variableValue;

export const getFunctionValue =
  (functionKey: string) =>
  (state: { [prefix]: FunctionSliceState }): FunctionItem | undefined =>
    state[prefix].functions.find((fn) => fn.key === functionKey);
