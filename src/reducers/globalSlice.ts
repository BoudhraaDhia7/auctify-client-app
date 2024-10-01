import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { AppNotification } from "../api/interfaces";

export interface GlobalState {
  globalSearch : string;
  isAddProduct : boolean;
  appNotifications : AppNotification[];
}

const initialState: GlobalState = {
    globalSearch: "", 
    isAddProduct : false,
    appNotifications : []
};

export const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    setGlobalSearch: (state, action : PayloadAction<string>) => {
      state.globalSearch = action.payload;
    },
    resetGlobalSearch: (state) => {
        state.globalSearch = "";
    },
    setIsAddProduct: (state, action : PayloadAction<boolean>) => {
      state.isAddProduct = action.payload;
    },
    setAppNotifications: (state, action : PayloadAction<AppNotification[]>) => {
      state.appNotifications = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setGlobalSearch, resetGlobalSearch, setIsAddProduct, setAppNotifications } = globalSlice.actions;
export default globalSlice.reducer;
