import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { client } from "../../../configs/client.js";

export const getKidVidsCategories = createAsyncThunk(
  "/kidVids/category/getAll",
  async ({ token }, { rejectWithValue }) => {
    try {
      const { data } = await client.get(`/kidVids/category/getAll`, {
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

export const getKidVidsSubCategoriesByCategory = createAsyncThunk(
  "kidVids/sub_category/getAllByCategory",
  async ({ token, id }, { rejectWithValue }) => {
    try {
      const { data } = await client.get(
        `/kidVids/sub_category/getAllByCategory?category_id=${id}`,
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

export const kidVidsTopVideo = createAsyncThunk(
  "kidVids/getTopVideo",
  async ({ token }, { rejectWithValue }) => {
    try {
      const { data } = await client.get(`/kidVids/getTopVideo`, {
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

export const getKidVidsByCategory = createAsyncThunk(
  "kisVids/getByCategory",
  async ({ token, id }, { rejectWithValue }) => {
    try {
      const { data } = await client.get(`/kidVids/getByCategory/${id}`, {
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

export const getKidVidsByUser = createAsyncThunk(
  "kisVids/getByUserId",
  async ({ token, id }, { rejectWithValue }) => {
    try {
      const { data } = await client.get(`/kidVids/getByUserId/${id}`, {
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

export const addKidVids = createAsyncThunk(
  "/kidVids/create",
  async ({ token, payload }, { rejectWithValue }) => {
    try {
      const { data } = await client.post(`/kidVids/create`, payload, {
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

export const deleteKidVids = createAsyncThunk(
  "kidVids/delete",
  async ({ token, id }, { rejectWithValue }) => {
    try {
      const { data } = await client.delete(`/kidVids/delete/${id}`, {
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

export const updateKidVids = createAsyncThunk(
  "kidVids/update",
  async ({ token, payload }, { rejectWithValue }) => {
    try {
      const { data } = await client.put(`/kidVids/update`, payload, {
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

export const getKidVidsLikes = createAsyncThunk(
  "/kidVids/all-likes",
  async ({ token, id }, { rejectWithValue }) => {
    try {
      const { data } = await client.get(`/kidVids/all-likes/${id}`, {
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

export const likeUnlikeKidVids = createAsyncThunk(
  "/kidVids/toggleLikeVideo",
  async ({ token, payload }, { rejectWithValue }) => {
    try {
      const { data } = await client.post(`/kidVids/toggleLikeVideo`, payload, {
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

export const getKidVidsComments = createAsyncThunk(
  "/kidVids/getComments",
  async ({ token, id }, { rejectWithValue }) => {
    try {
      const { data } = await client.get(`/kidVids/getComments/${id}`, {
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

export const addCommentOnKidVids = createAsyncThunk(
  "/kidVids/addComment",
  async ({ token, payload }, { rejectWithValue }) => {
    try {
      const { data } = await client.post(`/kidVids/addComment`, payload, {
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

export const searchKidVids = createAsyncThunk(
  "kidVids/searchByTitle?query",
  async ({ token, searchQuery }, { rejectWithValue }) => {
    try {
      const { data } = await client.get(
        `/kidVids/searchByTitle?query=${searchQuery}`,
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

const kidVidsSlice = createSlice({
  name: "kidVids",

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
      .addCase(getKidVidsCategories.pending, (state) => {
        state.isFetching = true;
      })
      .addCase(getKidVidsCategories.fulfilled, (state, action) => {
        state.isFetching = false;
        state.categories = action?.payload;
      })
      .addCase(getKidVidsCategories.rejected, (state, action) => {
        state.isFetching = false;
        state.error = action?.payload;
      })
      .addCase(getKidVidsByCategory.pending, (state) => {
        state.isVideoFetching = true;
      })
      .addCase(getKidVidsByCategory.fulfilled, (state, action) => {
        state.isVideoFetching = false;
      })
      .addCase(getKidVidsByCategory.rejected, (state, action) => {
        state.isVideoFetching = false;
        state.error = action?.payload;
      })
      .addCase(kidVidsTopVideo.pending, (state) => {
        state.isTopVideoFetching = true;
      })
      .addCase(kidVidsTopVideo.fulfilled, (state, action) => {
        state.isTopVideoFetching = false;
      })
      .addCase(kidVidsTopVideo.rejected, (state, action) => {
        state.isTopVideoFetching = false;
        state.error = action?.payload;
      })
      .addCase(likeUnlikeKidVids.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(likeUnlikeKidVids.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(likeUnlikeKidVids.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action?.payload;
      })
      .addCase(addCommentOnKidVids.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addCommentOnKidVids.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(addCommentOnKidVids.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action?.payload;
      })
      .addCase(searchKidVids.pending, (state) => {
        state.isSearching = true;
      })
      .addCase(searchKidVids.fulfilled, (state, action) => {
        state.isSearching = false;
      })
      .addCase(searchKidVids.rejected, (state, action) => {
        state.isSearching = false;
        state.error = action?.payload;
      });
  },
});

export default kidVidsSlice.reducer;
