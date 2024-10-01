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
export const fetchParticipationDetails = createAsyncThunk(
  "companyProducts/fetchParticipationDetails",
  async (companyId: any) => {
    const response = await axios.get(
      `${API_URL}/admin/getTotalProductParticipatedByCompanyId/${companyId}`
    );
    return response.data;
  }
);

const participationDetailsSlice = createSlice({
  name: "companyProducts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchParticipationDetails.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchParticipationDetails.fulfilled, (state, action) => {
      state.isLoading = false;
      state.company = action.payload;
      state.error = null;
    });
    builder.addCase(fetchParticipationDetails.rejected, (state, action) => {
      state.isLoading = false;
      state.company = null;
      state.error = "error";
    });
  },
});

export const {} = participationDetailsSlice.actions;
export default participationDetailsSlice.reducer;
