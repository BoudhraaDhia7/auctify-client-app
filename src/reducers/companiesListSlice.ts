import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API_URL } from "../api/axiosConfig";

interface Company {
  _id: string;
  logo: string;
  companyNames: string;
  email: string;
  role: number;
}

interface CompaniesState {
  companies: Company[];
  isLoading: boolean;
  error: string | null;
}

const initialState: CompaniesState = {
  companies: [],
  isLoading: false,
  error: "",
};

export const fetchCompanies = createAsyncThunk(
  "company/fetchCompanies",
  async () => {
    const response = await fetch(`${API_URL}/admin/companiesList`);
    return response.json();
  }
);

export const companySlice = createSlice({
  name: "company",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCompanies.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchCompanies.fulfilled, (state, action) => {
      state.isLoading = false;
      state.companies = action.payload;
      state.error = "";
    });
    builder.addCase(fetchCompanies.rejected, (state, action) => {
      state.isLoading = false;
      state.companies = [];
      state.error = "error";
    });
  },
});

export const {} = companySlice.actions;
export default companySlice.reducer;
