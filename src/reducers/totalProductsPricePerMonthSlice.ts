import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API_URL } from "../api/axiosConfig";

interface TotalProductsSoldePerMonthState {
  data: any[];
  isLoading: boolean;
  error: string | null;
}

const initialState: TotalProductsSoldePerMonthState = {
  data: [],
  isLoading: false,
  error: null,
};

export const fetchTotalProductsSoldePerMonth = createAsyncThunk(
  "totalProductsSoldePerMonth/fetchTotalProductsSoldePerMonth",
  async () => {
    const response = await fetch(
      `${API_URL}/admin/totalProductsSoldePerMonth`
    );
    return response.json();
  }
);

export const totalProductsSoldePerMonthSlice = createSlice({
  name: "totalProductsSoldePerMonth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchTotalProductsSoldePerMonth.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(
      fetchTotalProductsSoldePerMonth.fulfilled,
      (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
        state.error = null;
      }
    );
    builder.addCase(
      fetchTotalProductsSoldePerMonth.rejected,
      (state, action) => {
        state.isLoading = false;
        state.data = [];
        state.error = "Error fetching total products dannos per month";
      }
    );
  },
});

export default totalProductsSoldePerMonthSlice.reducer;
