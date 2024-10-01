import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API_URL } from "../api/axiosConfig";

interface User {
  _id: string;
  avatar: string;
  userName: string;
  phone: string;
  solde: number;
  participationCount: number;
}

interface UsersState {
  users: User[];
  isLoading: boolean;
  error: string | null;
}

const initialState: UsersState = {
  users: [],
  isLoading: false,
  error: "",
};

export const fetchUsers = createAsyncThunk("user/fetchUsers", async () => {
  const response = await fetch(`${API_URL}/admin/usersList`);
  return response.json();
});

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchUsers.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      console.log("azeazeaze", action.payload);
      state.isLoading = false;
      state.users = action.payload;
      state.error = "";
    });
    builder.addCase(fetchUsers.rejected, (state, action) => {
      state.isLoading = false;
      state.users = [];
      state.error = "error";
    });
  },
});

// Action creators are generated for each case reducer function
export const {} = userSlice.actions;
export default userSlice.reducer;
