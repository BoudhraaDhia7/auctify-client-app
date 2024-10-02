import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API_URL } from "../api/axiosConfig";

interface SoldePacks {
  _id: string;
  title: string;
  soldeValue: string | null;
  realValue: string;
}

interface SettingsState {
  soldePacks: SoldePacks[];
  isLoading: boolean;
  error: string | null;
}

const initialState: SettingsState = {
  soldePacks: [],
  isLoading: false,
  error: "",
};

export const fetchSoldePacks = createAsyncThunk(
  "soldePacks/fetchSoldePacks",
  async () => {
    const response = await fetch(`${API_URL}/setting/getAllPacks`);
    return response.json();
  }
);

export const soldePacksSlice = createSlice({
  name: "soldePacks",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchSoldePacks.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchSoldePacks.fulfilled, (state, action) => {
      state.isLoading = false;
      state.soldePacks = action.payload;
      state.error = "";
    });
    builder.addCase(fetchSoldePacks.rejected, (state, action) => {
      state.isLoading = false;
      state.soldePacks = [];
      state.error = "error";
    });
  },
});

// Action creators are generated for each case reducer function
export const {} = soldePacksSlice.actions;
export default soldePacksSlice.reducer;
