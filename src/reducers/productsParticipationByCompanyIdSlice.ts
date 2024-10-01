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
export const fetchProductsParticipationByCompanyId = createAsyncThunk(
  "prod/fetchProductsParticipationByCompanyId",
  async (companyId: any) => {
    const response = await axios.get(
      `${API_URL}/admin/productsParticipationByCompanyId/${companyId}`
    );
    return response.data;
  }
);

const productsParticipationByCompanyId = createSlice({
  name: "prod",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchProductsParticipationByCompanyId.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(
      fetchProductsParticipationByCompanyId.fulfilled,
      (state, action) => {
        state.isLoading = false;
        state.company = action.payload;
        state.error = null;
      }
    );
    builder.addCase(
      fetchProductsParticipationByCompanyId.rejected,
      (state, action) => {
        state.isLoading = false;
        state.company = null;
        state.error = "error";
      }
    );
  },
});

export const {} = productsParticipationByCompanyId.actions;
export default productsParticipationByCompanyId.reducer;
