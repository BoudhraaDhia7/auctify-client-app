import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API_URL } from "../api/axiosConfig";

interface topParticipationState {
  data: any[];
  isLoading: boolean;
  error: string | null;
}

const initialState: topParticipationState = {
  data: [],
  isLoading: false,
  error: null,
};

export const fetchTopParticipant = createAsyncThunk(
  "participant/fetchTopParticipant",
  async () => {
    const response = await fetch(`${API_URL}/admin/topParticipant`);
    return response.json();
  }
);

export const topParticipantSlice = createSlice({
  name: "participant",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchTopParticipant.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchTopParticipant.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
      state.error = null;
    });
    builder.addCase(fetchTopParticipant.rejected, (state, action) => {
      state.isLoading = false;
      state.data = [];
      state.error = "Error fetching total amount by company";
    });
  },
});

export default topParticipantSlice.reducer;
