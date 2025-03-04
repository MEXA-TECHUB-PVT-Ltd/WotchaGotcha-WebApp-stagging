import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { client } from "../../../configs/client";

export const getUserProfileData = createAsyncThunk(
  "user/getUser",
  async ({ userId, token }, { rejectWithValue }) => {
    try {
      const { data } = await client.get(`/user/getUser/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data || error);
    }
  }
);

const userSlice = createSlice({
  name: "user",

  initialState: {
    isLoading: false,
    isFetching: false,
    error: null,
    user: null,
  },

  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(getUserProfileData.pending, (state) => {
        state.isFetching = true;
      })
      .addCase(getUserProfileData.fulfilled, (state, action) => {
        state.isFetching = false;
        state.user = action?.payload?.user;
      })
      .addCase(getUserProfileData.rejected, (state, action) => {
        state.isFetching = false;
        state.error = action?.payload;
      });
  },
});

export default userSlice.reducer;
