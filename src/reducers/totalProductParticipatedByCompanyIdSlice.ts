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
export const fetchTotalProductParticipatedByCompanyId = createAsyncThunk(
  "companyProducts/fetchProductsParticipationByCompanyId",
  async (companyId: any) => {
    const response = await axios.get(
      `${API_URL}/admin/getTotalProductParticipatedByCompanyId/${companyId}`
    );
    return response.data;
  }
);

const totalProductsParticipationByCompanyId = createSlice({
  name: "totalProductParticipatedByCompanyId",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      fetchTotalProductParticipatedByCompanyId.pending,
      (state) => {
        state.isLoading = true;
      }
    );
    builder.addCase(
      fetchTotalProductParticipatedByCompanyId.fulfilled,
      (state, action) => {
        state.isLoading = false;
        state.company = action.payload;
        state.error = null;
      }
    );
    builder.addCase(
      fetchTotalProductParticipatedByCompanyId.rejected,
      (state, action) => {
        state.isLoading = false;
        state.company = null;
        state.error = "error";
      }
    );
  },
});

export const {} = totalProductsParticipationByCompanyId.actions;
export default totalProductsParticipationByCompanyId.reducer;
