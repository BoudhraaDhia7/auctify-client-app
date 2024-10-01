import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API_URL } from "../api/axiosConfig";

interface TotalSoldeState {
  total: number;
  totalReceived: number;
  totalSent: number;
  isLoading: boolean;
  error: string | null;
}

const initialState: TotalSoldeState = {
  total: 0,
  totalReceived: 0,
  totalSent: 0,
  isLoading: false,
  error: null,
};

export const fetchTotalSolde = createAsyncThunk(
  "totalSolde/fetchTotalSolde",
  async () => {
    const response = await fetch(`${API_URL}/admin/totalSolde`);
    return response.json();
  }
);

export const totalSoldeSlice = createSlice({
  name: "totalSolde",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchTotalSolde.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchTotalSolde.fulfilled, (state, action) => {
      state.isLoading = false;
      state.total = action.payload.total;
      state.totalReceived = action.payload.totalReceived;
      state.totalSent = action.payload.totalSent;
      state.error = null;
    });
    builder.addCase(fetchTotalSolde.rejected, (state, action) => {
      state.isLoading = false;
      state.total = 0;
      state.totalReceived = 0;
      state.totalSent = 0;
      state.error = "Error fetching total dannos";
    });
  },
});

export default totalSoldeSlice.reducer;
