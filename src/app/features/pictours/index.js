import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { client } from "../../../configs/client.js";

export const getPicTourCategories = createAsyncThunk(
  "picCategory/getAllPicCategories",
  async ({ token }, { rejectWithValue }) => {
    try {
      const { data } = await client.get(`/picCategory/getAllPicCategories`, {
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

export const getPicTourSubCategoryByCategory = createAsyncThunk(
  "pic/sub_category/getAllByCategory",
  async ({ token, id }, { rejectWithValue }) => {
    try {
      const { data } = await client.get(
        `/pic/sub_category/getAllByCategory?category_id=${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data || error);
    }
  }
);

export const getTopPicTour = createAsyncThunk(
  "/top/app/top_tour",
  async ({ token, id }, { rejectWithValue }) => {
    try {
      const { data } = await client.get(`/top/app/top_tour/${id}`, {
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

export const getPicTourByCategory = createAsyncThunk(
  "picTour/getAllPicTourByCategory",
  async ({ token, id }, { rejectWithValue }) => {
    try {
      const { data } = await client.get(
        `/picTour/getAllPicTourByCategory/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: {
            page: 1,
            limit: 10,
          },
        }
      );

      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data || error);
    }
  }
);

export const addPicTour = createAsyncThunk(
  "/picTour/createPicTour",
  async ({ token, payload }, { rejectWithValue }) => {
    try {
      const { data } = await client.post(`/picTour/createPicTour`, payload, {
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

export const getVideoAllLikes = createAsyncThunk(
  "/xpi/createXpiVideo",
  async ({ token, id }, { rejectWithValue }) => {
    try {
      const { data } = await client.get(`/xpi/getAllLikesByVideo/${id}`, {
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

export const likeUnlikeVideo = createAsyncThunk(
  "/xpi/likeUnlikeVideo",
  async ({ token, payload }, { rejectWithValue }) => {
    try {
      const { data } = await client.post(`/xpi/likeUnlikeVideo`, payload, {
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

export const getVideoAllComments = createAsyncThunk(
  "/xpi/createXpiVideo",
  async ({ token, id }, { rejectWithValue }) => {
    try {
      const { data } = await client.get(`/xpi/getAllCommentsByVideo/${id}`, {
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

export const addCommentOnVideo = createAsyncThunk(
  "/xpi/sendComment",
  async ({ token, payload }, { rejectWithValue }) => {
    try {
      const { data } = await client.post(`/xpi/sendComment`, payload, {
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

const picTourSlice = createSlice({
  name: "pictours",

  initialState: {
    isLoading: false,
    isFetching: false,
    isPicTourFetching: false,
    isTopPicTourFetching: false,
    error: null,
    categories: null,
  },

  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(getPicTourCategories.pending, (state) => {
        state.isFetching = true;
      })
      .addCase(getPicTourCategories.fulfilled, (state, action) => {
        state.isFetching = false;
        state.categories = action?.payload;
      })
      .addCase(getPicTourCategories.rejected, (state, action) => {
        state.isFetching = false;
        state.error = action?.payload;
      })
      .addCase(getPicTourByCategory.pending, (state) => {
        state.isPicTourFetching = true;
      })
      .addCase(getPicTourByCategory.fulfilled, (state, action) => {
        state.isPicTourFetching = false;
      })
      .addCase(getPicTourByCategory.rejected, (state, action) => {
        state.isPicTourFetching = false;
        state.error = action?.payload;
      })
      .addCase(getTopPicTour.pending, (state) => {
        state.isTopPicTourFetching = true;
      })
      .addCase(getTopPicTour.fulfilled, (state, action) => {
        state.isTopPicTourFetching = false;
      })
      .addCase(getTopPicTour.rejected, (state, action) => {
        state.isTopPicTourFetching = false;
        state.error = action?.payload;
      })
      .addCase(likeUnlikeVideo.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(likeUnlikeVideo.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(likeUnlikeVideo.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action?.payload;
      })
      .addCase(addCommentOnVideo.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addCommentOnVideo.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(addCommentOnVideo.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action?.payload;
      });
  },
});

export default picTourSlice.reducer;
