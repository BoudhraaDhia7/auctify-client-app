import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API_URL } from "../api/axiosConfig";

interface TotalProdsState {
  total: number;
  encours: number;
  terminer: number;
  isLoading: boolean;
  error: string | null;
}

const initialState: TotalProdsState = {
  total: 0,
  encours: 0,
  terminer: 0,
  isLoading: false,
  error: null,
};

export const fetchTotalProds = createAsyncThunk(
  "totalProds/fetchTotalProds",
  async () => {
    const response = await fetch(`${API_URL}/admin/totalProds`);
    return response.json();
  }
);

export const totaProdsSlice = createSlice({
  name: "totalProds",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchTotalProds.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchTotalProds.fulfilled, (state, action) => {
      state.isLoading = false;
      state.total = action.payload.prods[0]?.total ?? 0;
      state.encours = action.payload.prods[0]?.encours ?? 0;
      state.terminer = action.payload.prods[0]?.terminer ?? 0;
      state.error = null;
    });
    builder.addCase(fetchTotalProds.rejected, (state, action) => {
      state.isLoading = false;
      state.total = 0;
      state.encours = 0;
      state.terminer = 0;
      state.error = "Error fetching total prods";
    });
  },
});

export default totaProdsSlice.reducer;
