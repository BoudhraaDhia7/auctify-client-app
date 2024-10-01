import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { api } from "./api";
import { API_URL } from "../api/axiosConfig";

const initialState = {
  user: null,
  isLoading: false,
  error: null,
};

export const fetchUserInfo = createAsyncThunk(
  "currentUser/fetchUserInfo",
  async (userId: string) => {
    const response = await axios.get(
      `${API_URL}/company/getCurrentConnectedUserInfos/${userId}`
    );
    return response.data;
  }
);

export const currentUserSlice = createSlice({
  name: "currentUser",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchUserInfo.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchUserInfo.fulfilled, (state, action) => {
      state.isLoading = false;
      state.user = action.payload;
      state.error = null;
    });
    builder.addCase(fetchUserInfo.rejected, (state, action) => {
      state.isLoading = false;
      state.user = null;
      //state.error = "error";
    });
  },
});

export const {} = currentUserSlice.actions;
export default currentUserSlice.reducer;
