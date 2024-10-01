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

export const fetchEndedProducts = createAsyncThunk(
  "endedProducts/fetchEndedProducts",
  async (companyid : string) => {
    const response = await axios.get(`${API_URL}/product/getEndedProducts/${companyid}`);
    return response.data;
  }
);

const endedProductsSlice = createSlice({
  name: "endedProducts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchEndedProducts.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchEndedProducts.fulfilled, (state, action) => {
      state.isLoading = false;
      state.products = action.payload;
      state.error = null;
    });
    builder.addCase(fetchEndedProducts.rejected, (state, action) => {
      state.isLoading = false;
      state.products = [];
      state.error = "error";
    });
  },
});

export const {} = endedProductsSlice.actions;
export default endedProductsSlice.reducer;
