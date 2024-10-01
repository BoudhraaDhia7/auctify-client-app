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
export const fetchTotalProdsByCompany = createAsyncThunk(
  "companyProducts/fetchTotalProdsByCompany",
  async (companyId: any) => {
    const response = await axios.get(
      `${API_URL}/admin/totalProdsByCompanyId/${companyId}`
    );
    return response.data;
  }
);

const totalProdsByCompanyIdSlice = createSlice({
  name: "totalProdsByCompanyId",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchTotalProdsByCompany.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchTotalProdsByCompany.fulfilled, (state, action) => {
      state.isLoading = false;
      state.company = action.payload;
      state.error = null;
    });
    builder.addCase(fetchTotalProdsByCompany.rejected, (state, action) => {
      state.isLoading = false;
      state.company = null;
      state.error = "error";
    });
  },
});

export const {} = totalProdsByCompanyIdSlice.actions;
export default totalProdsByCompanyIdSlice.reducer;
