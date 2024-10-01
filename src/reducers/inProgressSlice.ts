import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "../api/axiosConfig";

interface Product {
  _id: string;
}

interface ProductState {
  products: Product[];
  isLoading: boolean;
  error: string | null;
}

const initialState: ProductState = {
  products: [],
  isLoading: false,
  error: null,
};

export const fetchInProgressProducts = createAsyncThunk(
  "products/fetchInProgressProducts",
  async (companyid: string) => {
    const response = await axios.get(
      `${API_URL}/product/getInProgressProducts/${companyid}`
    );
    return response.data;
  }
);

const inProgressSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchInProgressProducts.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchInProgressProducts.fulfilled, (state, action) => {
      state.isLoading = false;
      state.products = action.payload;
      state.error = null;
    });
    builder.addCase(fetchInProgressProducts.rejected, (state, action) => {
      state.isLoading = false;
      state.products = [];
      state.error = "error";
    });
  },
});

export const {} = inProgressSlice.actions;
export default inProgressSlice.reducer;
