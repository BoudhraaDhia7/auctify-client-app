import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API_URL } from "../api/axiosConfig";

interface TotalCompaniesState {
  total: number;
  active: number;
  inactive: number;
  isLoading: boolean;
  error: string | null;
}

const initialState: TotalCompaniesState = {
  total: 0,
  active: 0,
  inactive: 0,
  isLoading: false,
  error: null,
};

export const fetchTotalCompanies = createAsyncThunk(
  "totalCompanies/fetchTotalCompanies",
  async () => {
    const response = await fetch(`${API_URL}/admin/totalCompanies`);
    return response.json();
  }
);

export const totalCompaniesSlice = createSlice({
  name: "totalCompanies",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchTotalCompanies.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchTotalCompanies.fulfilled, (state, action) => {
      state.isLoading = false;
      state.total = action.payload.companies[0]?.total ?? 0;
      state.active = action.payload.companies[0]?.active ?? 0;
      state.inactive = action.payload.companies[0]?.inactive ?? 0;
      state.error = null;
    });
    builder.addCase(fetchTotalCompanies.rejected, (state, action) => {
      state.isLoading = false;
      state.total = 0;
      state.active = 0;
      state.inactive = 0;
      state.error = "Error fetching total companies";
    });
  },
});

export default totalCompaniesSlice.reducer;
