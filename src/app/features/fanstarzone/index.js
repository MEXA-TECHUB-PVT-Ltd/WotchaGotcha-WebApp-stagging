import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { client } from "../../../configs/client.js";

export const getFanStarCategories = createAsyncThunk(
  "/fanStar/category/getAll",
  async ({ token }, { rejectWithValue }) => {
    try {
      const { data } = await client.get(`/fanStar/category/getAll`, {
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

export const getFanStarSubCategoriesByCategory = createAsyncThunk(
  "fanStar/sub_category/getAllByCategory",
  async ({ token, id }, { rejectWithValue }) => {
    try {
      const { data } = await client.get(
        `/fanstar/sub_category/getAllByCategory?category_id=${id}`,
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

export const fanStarTopVideo = createAsyncThunk(
  "fanStar/getTopVideo",
  async ({ token }, { rejectWithValue }) => {
    try {
      const { data } = await client.get(`/fanStar/getTopVideo`, {
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

export const getFanStarByCategory = createAsyncThunk(
  "fanStar/getByCategory",
  async ({ token, id }, { rejectWithValue }) => {
    try {
      const { data } = await client.get(`/fanStar/getByCategory/${id}`, {
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

export const getFanStarByUser = createAsyncThunk(
  "fanStar/getByUserId",
  async ({ token, id }, { rejectWithValue }) => {
    try {
      const { data } = await client.get(`/fanStar/getByUserId/${id}`, {
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

export const addFanStar = createAsyncThunk(
  "/fanstar/create",
  async ({ token, payload }, { rejectWithValue }) => {
    try {
      const { data } = await client.post(`/fanstar/create`, payload, {
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

export const getFanStarLikes = createAsyncThunk(
  "/fanstar/all-likes",
  async ({ token, id }, { rejectWithValue }) => {
    try {
      const { data } = await client.get(`/fanstar/all-likes/${id}`, {
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

export const likeUnlikeFanStar = createAsyncThunk(
  "/fanstar/toggleLikeVideo",
  async ({ token, payload }, { rejectWithValue }) => {
    try {
      const { data } = await client.post(`/fanstar/toggleLikeVideo`, payload, {
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

export const getFanStarComments = createAsyncThunk(
  "/fanstar/getComments",
  async ({ token, id }, { rejectWithValue }) => {
    try {
      const { data } = await client.get(`/fanstar/getComments/${id}`, {
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

export const addCommentOnFanStar = createAsyncThunk(
  "/fanstar/addComment",
  async ({ token, payload }, { rejectWithValue }) => {
    try {
      const { data } = await client.post(`/fanstar/addComment`, payload, {
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

export const searchFanStar = createAsyncThunk(
  "fanstar/searchByTitle?query",
  async ({ token, searchQuery }, { rejectWithValue }) => {
    try {
      const { data } = await client.get(
        `/fanstar/searchByTitle?query=${searchQuery}`,
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

const fanStarZoneSlice = createSlice({
  name: "fanStar",

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
      .addCase(getFanStarCategories.pending, (state) => {
        state.isFetching = true;
      })
      .addCase(getFanStarCategories.fulfilled, (state, action) => {
        state.isFetching = false;
        state.categories = action?.payload;
      })
      .addCase(getFanStarCategories.rejected, (state, action) => {
        state.isFetching = false;
        state.error = action?.payload;
      })
      .addCase(getFanStarByCategory.pending, (state) => {
        state.isVideoFetching = true;
      })
      .addCase(getFanStarByCategory.fulfilled, (state, action) => {
        state.isVideoFetching = false;
      })
      .addCase(getFanStarByCategory.rejected, (state, action) => {
        state.isVideoFetching = false;
        state.error = action?.payload;
      })
      .addCase(fanStarTopVideo.pending, (state) => {
        state.isTopVideoFetching = true;
      })
      .addCase(fanStarTopVideo.fulfilled, (state, action) => {
        state.isTopVideoFetching = false;
      })
      .addCase(fanStarTopVideo.rejected, (state, action) => {
        state.isTopVideoFetching = false;
        state.error = action?.payload;
      })
      .addCase(likeUnlikeFanStar.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(likeUnlikeFanStar.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(likeUnlikeFanStar.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action?.payload;
      })
      .addCase(addCommentOnFanStar.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addCommentOnFanStar.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(addCommentOnFanStar.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action?.payload;
      })
      .addCase(searchFanStar.pending, (state) => {
        state.isSearching = true;
      })
      .addCase(searchFanStar.fulfilled, (state, action) => {
        state.isSearching = false;
      })
      .addCase(searchFanStar.rejected, (state, action) => {
        state.isSearching = false;
        state.error = action?.payload;
      });
  },
});

export default fanStarZoneSlice.reducer;
