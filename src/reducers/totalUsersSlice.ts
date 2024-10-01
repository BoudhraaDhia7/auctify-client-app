import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API_URL } from "../api/axiosConfig";

interface TotalUsersState {
  total: number;
  active: number;
  inactive: number;
  isLoading: boolean;
  error: string | null;
}

const initialState: TotalUsersState = {
  total: 0,
  active: 0,
  inactive: 0,
  isLoading: false,
  error: null,
};

export const fetchTotalUsers = createAsyncThunk(
  "totalUsers/fetchTotalUsers",
  async () => {
    const response = await fetch(`${API_URL}/admin/totalUsers`);
    return response.json();
  }
);

export const totalUsersSlice = createSlice({
  name: "totalUsers",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchTotalUsers.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchTotalUsers.fulfilled, (state, action) => {
      state.isLoading = false;
      state.total = action.payload.users[0].total;
      state.active = action.payload.users[0].active;
      state.inactive = action.payload.users[0].inactive;
      state.error = null;
    });
    builder.addCase(fetchTotalUsers.rejected, (state, action) => {
      state.isLoading = false;
      state.total = 0;
      state.active = 0;
      state.inactive = 0;
      state.error = "Error fetching total users";
    });
  },
});

export default totalUsersSlice.reducer;
