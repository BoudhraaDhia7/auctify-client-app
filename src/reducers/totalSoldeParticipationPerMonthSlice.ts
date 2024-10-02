import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API_URL } from "../api/axiosConfig";

interface TotalSoldeParticipationState {
  data: any[];
  isLoading: boolean;
  error: string | null;
}

const initialState: TotalSoldeParticipationState = {
  data: [],
  isLoading: false,
  error: null,
};

export const fetchTotalSoldeParticipation = createAsyncThunk(
  "totalSoldeParticipation/fetchTotalSoldeParticipation",
  async () => {
    const response = await fetch(
      `${API_URL}/admin/totalSoldeParticipationPerMonth`
    );
    return response.json();
  }
);

export const totalSoldeParticipationPerMonthSlice = createSlice({
  name: "totalSoldeParticipation",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchTotalSoldeParticipation.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(
      fetchTotalSoldeParticipation.fulfilled,
      (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
        state.error = null;
      }
    );
    builder.addCase(fetchTotalSoldeParticipation.rejected, (state, action) => {
      state.isLoading = false;
      state.data = [];
      state.error = "Error fetching total solde participation";
    });
  },
});

export default totalSoldeParticipationPerMonthSlice.reducer;
