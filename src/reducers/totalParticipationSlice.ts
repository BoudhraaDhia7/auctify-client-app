import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API_URL } from "../api/axiosConfig";

interface TotalParticipationState {
  totalWinners: number;
  participation: number;
  losers: number;
  isLoading: boolean;
  error: string | null;
}

const initialState: TotalParticipationState = {
  totalWinners: 0,
  participation: 0,
  losers: 0,
  isLoading: false,
  error: null,
};

export const fetchTotalParticipations = createAsyncThunk(
  "totalParticipation/fetchTotalParticipations",
  async () => {
    const response = await fetch(`${API_URL}/admin/totalParticipant`);
    return response.json();
  }
);

export const totalParticipationSlice = createSlice({
  name: "totalParticipations",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchTotalParticipations.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchTotalParticipations.fulfilled, (state, action) => {
      state.isLoading = false;
      state.totalWinners = action.payload.totalWinners;
      state.participation = action.payload.participation;
      state.losers = action.payload.losers;
      state.error = null;
    });
    builder.addCase(fetchTotalParticipations.rejected, (state, action) => {
      state.isLoading = false;
      state.totalWinners = 0;
      state.participation = 0;
      state.losers = 0;
      state.error = "Error fetching total participation";
    });
  },
});

export default totalParticipationSlice.reducer;
