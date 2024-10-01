import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API_URL } from "../api/axiosConfig";

interface TotalProdsSoldeState {
  totalPrice: number;
  multipliedBenefit: number;
  totalBenefit: number;
  isLoading: boolean;
  error: string | null;
}

const initialState: TotalProdsSoldeState = {
  totalPrice: 0,
  multipliedBenefit: 0,
  totalBenefit: 0,
  isLoading: false,
  error: null,
};

export const fetchTotalProdsSolde = createAsyncThunk(
  "totalProdsBenefits/fetchTotalProdsSolde",
  async () => {
    const response = await fetch(`${API_URL}/admin/totalProdsSolde`);
    return response.json();
  }
);

export const totalProdsBenefitsSlice = createSlice({
  name: "totalProdsBenefits",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchTotalProdsSolde.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchTotalProdsSolde.fulfilled, (state, action) => {
      state.isLoading = false;
      state.totalPrice = action.payload.prodsSolde[0]?.totalPrice ?? 0;
      state.multipliedBenefit = action.payload.prodsSolde[0]?.multipliedBenefit ?? 0;
      state.totalBenefit = action.payload.prodsSolde[0]?.totalBenefit ?? 0;
      state.error = null;
    });
    builder.addCase(fetchTotalProdsSolde.rejected, (state, action) => {
      state.isLoading = false;
      state.totalPrice = 0;
      state.multipliedBenefit = 0;
      state.totalBenefit = 0;
      state.error = "Error fetching total prods price";
    });
  },
});

export default totalProdsBenefitsSlice.reducer;
