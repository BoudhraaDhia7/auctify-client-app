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

export const fetchAllProds = createAsyncThunk(
  "products/fetchAllProds",
  async () => {
    const response = await fetch(`${API_URL}/product/getAllProds`);
    return response.json();
  }
);

export const getAllProdsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAllProds.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchAllProds.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
      state.error = null;
    });
    builder.addCase(fetchAllProds.rejected, (state, action) => {
      state.isLoading = false;
      state.data = [];
      state.error = "Error fetching products ";
    });
  },
});

export default getAllProdsSlice.reducer;
