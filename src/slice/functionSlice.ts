import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { findFunctionByKey } from '../helpers/functionUtil';

export type FunctionItem = {
  key: string;
  value: string;
  nextFn: string;
};

interface FunctionSliceState {
  variableValue: number;
  functions: FunctionItem[];
}

const prefix = 'function';

const initialState: FunctionSliceState = {
  variableValue: 2,
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
      action: PayloadAction<{
        functionKey: string;
        functionValue: string;
        nextFn: string;
      }>
    ) => {
      const { functionKey, functionValue, nextFn } = action.payload;

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
          nextFn
        });
      }
    }
  }
});

export const { saveVariableValue, saveFunctionValue } = functionSlice.actions;

// Selectors
export const getVariableValue = (state: { [prefix]: FunctionSliceState }) =>
  state[prefix].variableValue;

export const getFunction =
  (functionKey: string) =>
  (state: { [prefix]: FunctionSliceState }): FunctionItem =>
    state[prefix].functions.find((fn) => fn.key === functionKey) ?? {
      key: '',
      value: '',
      nextFn: ''
    };

export const getAllFunctions = (state: {
  [prefix]: FunctionSliceState;
}): FunctionItem[] => state[prefix].functions;
