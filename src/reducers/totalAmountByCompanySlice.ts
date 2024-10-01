import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API_URL } from "../api/axiosConfig";

interface TotalAmountByCompanyState {
  data: any[]; // Update the type based on the API response structure
  isLoading: boolean;
  error: string | null;
}

const initialState: TotalAmountByCompanyState = {
  data: [],
  isLoading: false,
  error: null,
};

export const fetchTotalAmountByCompany = createAsyncThunk(
  "totalAmountByCompany/fetchTotalAmountByCompany",
  async () => {
    const response = await fetch(`${API_URL}/admin/totalAmountByCompany`);
    return response.json();
  }
);

export const totalAmountByCompanySlice = createSlice({
  name: "totalAmountByCompany",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchTotalAmountByCompany.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchTotalAmountByCompany.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
      state.error = null;
    });
    builder.addCase(fetchTotalAmountByCompany.rejected, (state, action) => {
      state.isLoading = false;
      state.data = [];
      state.error = "Error fetching total amount by company";
    });
  },
});

export default totalAmountByCompanySlice.reducer;
