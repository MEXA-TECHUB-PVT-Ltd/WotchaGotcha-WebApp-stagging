import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { client } from "../../../configs/client.js";

export const getCinematicCategories = createAsyncThunk(
  "/cinematics/category/getAll",
  async ({ token }, { rejectWithValue }) => {
    try {
      const { data } = await client.get(`/cinematics/category/getAll`, {
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

export const getCinematicSubCategoriesByCategory = createAsyncThunk(
  "cinematics/sub_category/getAllByCategory",
  async ({ token, id }, { rejectWithValue }) => {
    try {
      const { data } = await client.get(
        `/cinematics/sub_category/getAllByCategory?category_id=${id}`,
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

export const cinematicTopVideo = createAsyncThunk(
  "cinematics/getTopVideo",
  async ({ token }, { rejectWithValue }) => {
    try {
      const { data } = await client.get(`/cinematics/getTopVideo`, {
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

export const getCinematicByCategory = createAsyncThunk(
  "cinematics/getByCategory/",
  async ({ token, id }, { rejectWithValue }) => {
    try {
      const { data } = await client.get(`/cinematics/getByCategory/${id}`, {
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

export const getCinematicByUser = createAsyncThunk(
  "cinematics/getByUserId/",
  async ({ token, id }, { rejectWithValue }) => {
    try {
      const { data } = await client.get(`/cinematics/getByUserId/${id}`, {
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

export const addCinematic = createAsyncThunk(
  "/cinematics/create",
  async ({ token, payload }, { rejectWithValue }) => {
    try {
      const { data } = await client.post(`/cinematics/create`, payload, {
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

export const deleteCinematic = createAsyncThunk(
  "cinematics/delete/",
  async ({ token, id }, { rejectWithValue }) => {
    try {
      const { data } = await client.delete(`/cinematics/delete/${id}`, {
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

export const updateCinematic = createAsyncThunk(
  "cinematics/update",
  async ({ token, payload }, { rejectWithValue }) => {
    try {
      const { data } = await client.put(`/cinematics/update`, payload, {
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

export const getCinematicLikes = createAsyncThunk(
  "/cinematics/all-likes",
  async ({ token, id }, { rejectWithValue }) => {
    try {
      const { data } = await client.get(`/cinematics/all-likes/${id}`, {
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

export const likeUnlikeCinematic = createAsyncThunk(
  "/cinematics/toggleLikeVideo",
  async ({ token, payload }, { rejectWithValue }) => {
    try {
      const { data } = await client.post(
        `/cinematics/toggleLikeVideo`,
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

export const getCinematicComments = createAsyncThunk(
  "/cinematics/getComments",
  async ({ token, id }, { rejectWithValue }) => {
    try {
      const { data } = await client.get(`/cinematics/getComments/${id}`, {
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

export const addCommentOnCinematic = createAsyncThunk(
  "/cinematics/addComment",
  async ({ token, payload }, { rejectWithValue }) => {
    try {
      const { data } = await client.post(`/cinematics/addComment`, payload, {
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

export const searchCinematic = createAsyncThunk(
  "cinematics/searchByTitle?query",
  async ({ token, searchQuery }, { rejectWithValue }) => {
    try {
      const { data } = await client.get(
        `/cinematics/searchByTitle?query=${searchQuery}`,
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

const cinematicSlice = createSlice({
  name: "cinematic",

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
      .addCase(getCinematicCategories.pending, (state) => {
        state.isFetching = true;
      })
      .addCase(getCinematicCategories.fulfilled, (state, action) => {
        state.isFetching = false;
        state.categories = action?.payload;
      })
      .addCase(getCinematicCategories.rejected, (state, action) => {
        state.isFetching = false;
        state.error = action?.payload;
      })
      .addCase(getCinematicByCategory.pending, (state) => {
        state.isVideoFetching = true;
      })
      .addCase(getCinematicByCategory.fulfilled, (state, action) => {
        state.isVideoFetching = false;
      })
      .addCase(getCinematicByCategory.rejected, (state, action) => {
        state.isVideoFetching = false;
        state.error = action?.payload;
      })
      .addCase(cinematicTopVideo.pending, (state) => {
        state.isTopVideoFetching = true;
      })
      .addCase(cinematicTopVideo.fulfilled, (state, action) => {
        state.isTopVideoFetching = false;
      })
      .addCase(cinematicTopVideo.rejected, (state, action) => {
        state.isTopVideoFetching = false;
        state.error = action?.payload;
      })
      .addCase(likeUnlikeCinematic.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(likeUnlikeCinematic.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(likeUnlikeCinematic.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action?.payload;
      })
      .addCase(addCommentOnCinematic.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addCommentOnCinematic.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(addCommentOnCinematic.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action?.payload;
      })
      .addCase(searchCinematic.pending, (state) => {
        state.isSearching = true;
      })
      .addCase(searchCinematic.fulfilled, (state, action) => {
        state.isSearching = false;
      })
      .addCase(searchCinematic.rejected, (state, action) => {
        state.isSearching = false;
        state.error = action?.payload;
      });
  },
});

export default cinematicSlice.reducer;
