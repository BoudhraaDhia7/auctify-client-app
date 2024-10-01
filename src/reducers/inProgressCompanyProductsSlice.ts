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

export const fetchInProgressCompanyProducts = createAsyncThunk(
  "products/fetchInProgressCompanyProducts",
  async (companyId: any) => {
    const response = await axios.get(
      `${API_URL}/company/getInProgressCompanyProducts/${companyId}`
    );
    return response.data;
  }
);

const inProgressCompanyProductsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchInProgressCompanyProducts.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(
      fetchInProgressCompanyProducts.fulfilled,
      (state, action) => {
        state.isLoading = false;
        state.products = action.payload;
        state.error = null;
      }
    );
    builder.addCase(
      fetchInProgressCompanyProducts.rejected,
      (state, action) => {
        state.isLoading = false;
        state.products = [];
        state.error = "error";
      }
    );
  },
});

export const {} = inProgressCompanyProductsSlice.actions;
export default inProgressCompanyProductsSlice.reducer;
