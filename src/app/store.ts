import { configureStore } from '@reduxjs/toolkit';
import { functionSlice } from '../slice/functionSlice';

export const store = configureStore({
  reducer: { function: functionSlice.reducer }
});

// Infer the type of `store`
export type AppStore = typeof store;
// Infer the `AppDispatch` type from the store itself
export type AppDispatch = AppStore['dispatch'];
// Infer the `RootState` type from the root reducer
export type RootState = ReturnType<typeof store.getState>;
