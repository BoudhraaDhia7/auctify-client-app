import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API_URL } from "../api/axiosConfig";

export interface Setting {
  _id: string;
  title: string;
  value: string | null;
  unit : string
}

export interface SettingsState {
  settings: Setting[];
  isLoading: boolean;
  error: string | null;
  devise: string; 
  appDevise : string;
  changeTaux : number
  
}

const initialState: SettingsState = {
  settings: [],
  isLoading: false,
  error: "",
  devise : "TND",
  appDevise : "Solde",
  changeTaux : 0.80
  
};

export const fetchSettings = createAsyncThunk(
  "setting/fetchSettings",
  async (userId: any) => {
    const response = await fetch(
      `${API_URL}/setting/getUserSettings/${userId}`
    );
    return response.json();
  }
);

export const settingSlice = createSlice({
  name: "setting",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchSettings.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchSettings.fulfilled, (state, action) => {
      state.isLoading = false;
      state.settings = action.payload;
      state.error = "";
    });
    builder.addCase(fetchSettings.rejected, (state, action) => {
      state.isLoading = false;
      state.settings = [];
      state.error = "error";
    });
  },
});

// Action creators are generated for each case reducer function
export const {} = settingSlice.actions;
export default settingSlice.reducer;
