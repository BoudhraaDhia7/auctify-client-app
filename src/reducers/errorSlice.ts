import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface ErrorState {
  statusCode: number | null;
  message: string;
  errorModalShown: boolean;
}

const initialState: ErrorState = {
  message: "",
  statusCode: null,
  errorModalShown: false,
};

export const errorSlice = createSlice({
  name: "error",
  initialState,
  reducers: {
    setError: (state, action) => {
      state.message = action.payload.message as string;
      state.errorModalShown = true;
    },
    resetError: (state, action) => {
      state.errorModalShown = false;
      state.message = "";
      state.statusCode = null;
    },
  },
});

// Action creators are generated for each case reducer function
export const { resetError, setError } = errorSlice.actions;
export default errorSlice.reducer;
