import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "../api/axiosConfig";

interface Company {
  _id: string;
}

interface CompanyState {
  company: Company | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: CompanyState = {
  company: null,
  isLoading: false,
  error: null,
};
export const fetchCompanyProducts = createAsyncThunk(
  "companyProducts/fetchCompanyProducts",
  async (companyId: any) => {
    const response = await axios.get(
      `${API_URL}/company/getProductByCompanyId/${companyId}`
    );
    return response.data;
  }
);

const companyProductsSlice = createSlice({
  name: "companyProducts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCompanyProducts.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchCompanyProducts.fulfilled, (state, action) => {
      state.isLoading = false;
      state.company = action.payload;
      state.error = null;
    });
    builder.addCase(fetchCompanyProducts.rejected, (state, action) => {
      state.isLoading = false;
      state.company = null;
      state.error = "error";
    });
  },
});

export const {} = companyProductsSlice.actions;
export default companyProductsSlice.reducer;
