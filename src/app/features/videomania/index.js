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

export const getVideoSubCategoryByCategory = createAsyncThunk(
  "video/sub_category/getAllByCategory",
  async ({ token, id }, { rejectWithValue }) => {
    try {
      const { data } = await client.get(`/video/sub_category/getAllByCategory?category_id=${id}`, {
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

export const getTopVideo = createAsyncThunk(
  "/top/app/top_video",
  async ({ token, id }, { rejectWithValue }) => {
    try {
      const { data } = await client.get(`/top/app/top_video/${id}`, {
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
    isVideoFetching: false,
    isTopVideoFetching: false,
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
        state.isVideoFetching = true;
      })
      .addCase(getVideosByCategory.fulfilled, (state, action) => {
        state.isVideoFetching = false;
      })
      .addCase(getVideosByCategory.rejected, (state, action) => {
        state.isVideoFetching = false;
        state.error = action?.payload;
      })
      .addCase(getTopVideo.pending, (state) => {
        state.isTopVideoFetching = true;
      })
      .addCase(getTopVideo.fulfilled, (state, action) => {
        state.isTopVideoFetching = false;
      })
      .addCase(getTopVideo.rejected, (state, action) => {
        state.isTopVideoFetching = false;
        state.error = action?.payload;
      });
  },
});

export default videoManiaSlice.reducer;
