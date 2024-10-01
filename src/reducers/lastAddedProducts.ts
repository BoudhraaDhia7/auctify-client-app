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

export const fetchLastAddedProducts = createAsyncThunk(
  "products/fetchLastAddedProducts",
  async () => {
    const response = await fetch(`${API_URL}/admin/lastAddedProducts`);
    return response.json();
  }
);

export const lastAddedProductsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchLastAddedProducts.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchLastAddedProducts.fulfilled, (state, action) => {
      console.log("azeazeaze", action.payload);
      state.isLoading = false;
      state.data = action.payload;
      state.error = null;
    });
    builder.addCase(fetchLastAddedProducts.rejected, (state, action) => {
      state.isLoading = false;
      state.data = [];
      state.error = "Error fetching last added products";
    });
  },
});

export default lastAddedProductsSlice.reducer;
