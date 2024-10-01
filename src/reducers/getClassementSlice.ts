import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API_URL } from "../api/axiosConfig";

interface Auction {
  _id: string;
  totalSolde: number;
  totalTime: number;
  betUserName: string;
  betAvatar: string;
  betLastName: string;
  betfirstName: string;
}

interface AuctionState {
  auctionClassment: Auction[];
  isLoading: boolean;
  error: string | null;
}

const initialState: AuctionState = {
  auctionClassment: [],
  isLoading: false,
  error: null,
};

export const fetchAuctionClassment = createAsyncThunk(
  "auction/fetchAuctionClassment",
  async (productId: string) => {
    const response = await fetch(
      `${API_URL}/api/auctions/getAuctionClassment`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ productId }),
      }
    );
    return response.json();
  }
);

export const getClassementSlice = createSlice({
  name: "auction",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAuctionClassment.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(fetchAuctionClassment.fulfilled, (state, action) => {
      state.isLoading = false;
      state.auctionClassment = action.payload;
      state.error = null;
    });
    builder.addCase(fetchAuctionClassment.rejected, (state, action) => {
      state.isLoading = false;
      state.auctionClassment = [];
      state.error = "Error fetching auction classment";
    });
  },
});

export default getClassementSlice.reducer;
