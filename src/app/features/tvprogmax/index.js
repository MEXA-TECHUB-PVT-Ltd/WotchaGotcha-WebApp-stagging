import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { client } from "../../../configs/client.js";

export const getTvProgmaxCategories = createAsyncThunk(
  "/tvProgmax/category/getAll",
  async ({ token }, { rejectWithValue }) => {
    try {
      const { data } = await client.get(`/tvProgmax/category/getAll`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          page: 1,
          limit: 1000,
        },
      });

      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data || error);
    }
  }
);

export const getTvProgmaxSubCategoriesByCategory = createAsyncThunk(
  "tvProgmax/sub_category/getAllByCategory",
  async ({ token, id }, { rejectWithValue }) => {
    try {
      const { data } = await client.get(
        `/tvProgmax/sub_category/getAllByCategory?category_id=${id}`,
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

export const tvProgmaxTopVideo = createAsyncThunk(
  "tvProgmax/getTopVideo",
  async ({ token }, { rejectWithValue }) => {
    try {
      const { data } = await client.get(`/tvProgmax/getTopVideo`, {
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

export const getTvProgmaxByCategory = createAsyncThunk(
  "tvProgmax/getByCategory",
  async ({ token, id }, { rejectWithValue }) => {
    try {
      const { data } = await client.get(`/tvProgmax/getByCategory/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          page: 1,
          limit: 10000,
        },
      });

      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data || error);
    }
  }
);

export const getTvProgmaxByUser = createAsyncThunk(
  "tvProgmax/getByUserId",
  async ({ token, id }, { rejectWithValue }) => {
    try {
      const { data } = await client.get(`/tvProgmax/getByUserId/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          page: 1,
          limit: 10000,
        },
      });

      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data || error);
    }
  }
);

export const addTvProgmax = createAsyncThunk(
  "/tvProgmax/create",
  async ({ token, payload }, { rejectWithValue }) => {
    try {
      const { data } = await client.post(`/tvProgmax/create`, payload, {
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

export const getTvProgmaxLikes = createAsyncThunk(
  "/tvProgmax/all-likes",
  async ({ token, id }, { rejectWithValue }) => {
    try {
      const { data } = await client.get(`/tvProgmax/all-likes/${id}`, {
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

export const likeUnlikeTvProgmax = createAsyncThunk(
  "/tvProgmax/toggleLikeVideo",
  async ({ token, payload }, { rejectWithValue }) => {
    try {
      const { data } = await client.post(
        `/tvProgmax/toggleLikeVideo`,
        payload,
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

export const getTvProgmaxComments = createAsyncThunk(
  "/tvProgmax/getComments",
  async ({ token, id }, { rejectWithValue }) => {
    try {
      const { data } = await client.get(`/tvProgmax/getComments/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          page: 1,
          limit: 100000,
        },
      });

      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data || error);
    }
  }
);

export const addCommentOnTvProgmax = createAsyncThunk(
  "/tvProgmax/addComment",
  async ({ token, payload }, { rejectWithValue }) => {
    try {
      const { data } = await client.post(`/tvProgmax/addComment`, payload, {
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

export const searchTvProgmax = createAsyncThunk(
  "tvProgmax/searchByTitle?query",
  async ({ token, searchQuery }, { rejectWithValue }) => {
    try {
      const { data } = await client.get(
        `/tvProgmax/searchByTitle?query=${searchQuery}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: {
            page: 1,
            limit: 10000,
          },
        }
      );

      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data || error);
    }
  }
);

const tvProgMaxSlice = createSlice({
  name: "tvProgmax",

  initialState: {
    isLoading: false,
    isFetching: false,
    isVideoFetching: false,
    isTopVideoFetching: false,
    isSearching: false,
    error: null,
    categories: null,
  },

  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(getTvProgmaxCategories.pending, (state) => {
        state.isFetching = true;
      })
      .addCase(getTvProgmaxCategories.fulfilled, (state, action) => {
        state.isFetching = false;
        state.categories = action?.payload;
      })
      .addCase(getTvProgmaxCategories.rejected, (state, action) => {
        state.isFetching = false;
        state.error = action?.payload;
      })
      .addCase(getTvProgmaxByCategory.pending, (state) => {
        state.isVideoFetching = true;
      })
      .addCase(getTvProgmaxByCategory.fulfilled, (state, action) => {
        state.isVideoFetching = false;
      })
      .addCase(getTvProgmaxByCategory.rejected, (state, action) => {
        state.isVideoFetching = false;
        state.error = action?.payload;
      })
      .addCase(tvProgmaxTopVideo.pending, (state) => {
        state.isTopVideoFetching = true;
      })
      .addCase(tvProgmaxTopVideo.fulfilled, (state, action) => {
        state.isTopVideoFetching = false;
      })
      .addCase(tvProgmaxTopVideo.rejected, (state, action) => {
        state.isTopVideoFetching = false;
        state.error = action?.payload;
      })
      .addCase(likeUnlikeTvProgmax.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(likeUnlikeTvProgmax.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(likeUnlikeTvProgmax.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action?.payload;
      })
      .addCase(addCommentOnTvProgmax.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addCommentOnTvProgmax.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(addCommentOnTvProgmax.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action?.payload;
      })
      .addCase(searchTvProgmax.pending, (state) => {
        state.isSearching = true;
      })
      .addCase(searchTvProgmax.fulfilled, (state, action) => {
        state.isSearching = false;
      })
      .addCase(searchTvProgmax.rejected, (state, action) => {
        state.isSearching = false;
        state.error = action?.payload;
      });
  },
});

export default tvProgMaxSlice.reducer;
