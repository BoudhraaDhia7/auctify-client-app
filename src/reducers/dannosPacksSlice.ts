import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API_URL } from "../api/axiosConfig";

interface SoldePacks {
  _id: string;
  title: string;
  dannosValue: string | null;
  realValue: string;
}

interface SettingsState {
  dannosPacks: SoldePacks[];
  isLoading: boolean;
  error: string | null;
}

const initialState: SettingsState = {
  dannosPacks: [],
  isLoading: false,
  error: "",
};

export const fetchSoldePacks = createAsyncThunk(
  "dannosPacks/fetchSoldePacks",
  async () => {
    const response = await fetch(`${API_URL}/setting/getAllPacks`);
    return response.json();
  }
);

export const dannosPacksSlice = createSlice({
  name: "dannosPacks",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchSoldePacks.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchSoldePacks.fulfilled, (state, action) => {
      state.isLoading = false;
      state.dannosPacks = action.payload;
      state.error = "";
    });
    builder.addCase(fetchSoldePacks.rejected, (state, action) => {
      state.isLoading = false;
      state.dannosPacks = [];
      state.error = "error";
    });
  },
});

// Action creators are generated for each case reducer function
export const {} = dannosPacksSlice.actions;
export default dannosPacksSlice.reducer;
