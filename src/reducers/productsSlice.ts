import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "../api/axiosConfig";

interface Product {
  _id: string;
}

interface ProductState {
  products: Product[];
  pending : Product[];
  isLoading: boolean;
  error: string | null;
}

const initialState: ProductState = {
  products: [],
  pending : [],
  isLoading: false,
  error: null,
};

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async (companyId : string) => {
    const response = await axios.get(`${API_URL}/product/getProducts/${companyId}`);
    return response.data;
  }
);

export const fetchPendingProducts = createAsyncThunk(
  "products/fetchPendingProducts",
  async (companyId : string) => {
    const response = await axios.get(`${API_URL}/product/getPendingProducts/${companyId}`);
    return response.data;
  }
);



const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.isLoading = false;
      state.products = action.payload;
      state.error = null;
    });
    builder.addCase(fetchProducts.rejected, (state, action) => {
      state.isLoading = false;
      state.products = [];
      state.error = "error";
    });

    builder.addCase(fetchPendingProducts.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(fetchPendingProducts.fulfilled, (state, action) => {
      state.isLoading = false;
      state.pending = action.payload;
      state.error = null;
    });

    builder.addCase(fetchPendingProducts.rejected, (state, action) => {
      state.isLoading = false;
      state.pending = [];
      state.error = "error";
    });
  },
});

export const {} = productSlice.actions;
export default productSlice.reducer;
