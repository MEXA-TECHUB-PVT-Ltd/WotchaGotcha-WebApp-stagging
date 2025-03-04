import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { client } from "../../../configs/client";

export const getVideoCategories = createAsyncThunk(
  "videoCategory/getAllVideoCategories",
  async ({ token }, { rejectWithValue }) => {
    try {
      const { data } = await client.get(`/videoCategory/getAllVideoCategories`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          page: 1,
          limit: 10,
        },
      });

      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data || error);
    }
  }
);

export const getVideosByCategory = createAsyncThunk(
  "videoCategory/getAllVideosBycategory",
  async ({ token, id }, { rejectWithValue }) => {
    try {
      const { data } = await client.get(`/xpi/getAllVideosBycategory/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          page: 1,
          limit: 10,
        },
      });

      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data || error);
    }
  }
);

const videoManiaSlice = createSlice({
  name: "user",

  initialState: {
    isLoading: false,
    isFetching: false,
    error: null,
    categories: null,
  },

  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(getVideoCategories.pending, (state) => {
        state.isFetching = true;
      })
      .addCase(getVideoCategories.fulfilled, (state, action) => {
        state.isFetching = false;
        state.categories = action?.payload;
      })
      .addCase(getVideoCategories.rejected, (state, action) => {
        state.isFetching = false;
        state.error = action?.payload;
      })
      .addCase(getVideosByCategory.pending, (state) => {
        state.isFetching = true;
      })
      .addCase(getVideosByCategory.fulfilled, (state, action) => {
        state.isFetching = false;
      })
      .addCase(getVideosByCategory.rejected, (state, action) => {
        state.isFetching = false;
        state.error = action?.payload;
      });
  },
});

export default videoManiaSlice.reducer;
