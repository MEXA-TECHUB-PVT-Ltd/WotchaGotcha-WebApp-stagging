import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { client } from "../../../configs/client.js";

export const getOnNewsCategories = createAsyncThunk(
  "news/category/getAll",
  async ({ token }, { rejectWithValue }) => {
    try {
      const { data } = await client.get(`/news/category/getAll`, {
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

export const getOnNewsSubCategoryByCategory = createAsyncThunk(
  "news/sub_category/getAllByCategory",
  async ({ token, id }, { rejectWithValue }) => {
    try {
      const { data } = await client.get(
        `/news/sub_category/getAllByCategory?category_id=${id}`,
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

export const getTopOnNews = createAsyncThunk(
  "/news/getTopNews",
  async ({ token }, { rejectWithValue }) => {
    try {
      const { data } = await client.get(`/news/getTopNews`, {
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

export const getOnNewsByCategory = createAsyncThunk(
  "news/getByCategory",
  async ({ token, id }, { rejectWithValue }) => {
    try {
      const { data } = await client.get(`/news/getAllNewsByCategory/${id}`, {
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

export const getOnNewsByUser = createAsyncThunk(
  "news/getAllNewsByUser",
  async ({ token, id }, { rejectWithValue }) => {
    try {
      const { data } = await client.get(`/news/getAllNewsByUser/${id}`, {
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

export const addOnNews = createAsyncThunk(
  "/news/createNews",
  async ({ token, payload }, { rejectWithValue }) => {
    try {
      const { data } = await client.post(`/news/createNews`, payload, {
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

export const getOnNewsLikes = createAsyncThunk(
  "/news/getAllLikesByNews",
  async ({ token, id }, { rejectWithValue }) => {
    try {
      const { data } = await client.get(`/news/getAllLikesByNews/${id}`, {
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

export const likeUnlikeOnNews = createAsyncThunk(
  "news/likeUnlikeNews",
  async ({ token, payload }, { rejectWithValue }) => {
    try {
      const { data } = await client.post(`/news/likeUnlikeNews`, payload, {
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

export const getOnNewsComments = createAsyncThunk(
  "news/getAllCommentsByNews",
  async ({ token, id }, { rejectWithValue }) => {
    try {
      const { data } = await client.get(`/news/getAllCommentsByNews/${id}`, {
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

export const addCommentOnOnNews = createAsyncThunk(
  "news/sendComment",
  async ({ token, payload }, { rejectWithValue }) => {
    try {
      const { data } = await client.post(`/news/sendComment`, payload, {
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

export const searchOnNews = createAsyncThunk(
  "news/search",
  async ({ token, searchQuery }, { rejectWithValue }) => {
    try {
      const { data } = await client.get(
        `/news/searchNews?name=${searchQuery}`,
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

const onNewsSlice = createSlice({
  name: "onnews",

  initialState: {
    isLoading: false,
    isFetching: false,
    isNewsFetching: false,
    isTopNewsFetching: false,
    isSearching: false,
    error: null,
    categories: null,
  },

  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(getOnNewsCategories.pending, (state) => {
        state.isFetching = true;
      })
      .addCase(getOnNewsCategories.fulfilled, (state, action) => {
        state.isFetching = false;
        state.categories = action?.payload;
      })
      .addCase(getOnNewsCategories.rejected, (state, action) => {
        state.isFetching = false;
        state.error = action?.payload;
      })
      .addCase(getOnNewsByCategory.pending, (state) => {
        state.isNewsFetching = true;
      })
      .addCase(getOnNewsByCategory.fulfilled, (state, action) => {
        state.isNewsFetching = false;
      })
      .addCase(getOnNewsByCategory.rejected, (state, action) => {
        state.isNewsFetching = false;
        state.error = action?.payload;
      })
      .addCase(getTopOnNews.pending, (state) => {
        state.isTopNewsFetching = true;
      })
      .addCase(getTopOnNews.fulfilled, (state, action) => {
        state.isTopNewsFetching = false;
      })
      .addCase(getTopOnNews.rejected, (state, action) => {
        state.isTopNewsFetching = false;
        state.error = action?.payload;
      })
      .addCase(likeUnlikeOnNews.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(likeUnlikeOnNews.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(likeUnlikeOnNews.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action?.payload;
      })
      .addCase(addCommentOnOnNews.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addCommentOnOnNews.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(addCommentOnOnNews.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action?.payload;
      })
      .addCase(searchOnNews.pending, (state) => {
        state.isSearching = true;
      })
      .addCase(searchOnNews.fulfilled, (state, action) => {
        state.isSearching = false;
      })
      .addCase(searchOnNews.rejected, (state, action) => {
        state.isSearching = false;
        state.error = action?.payload;
      });
  },
});

export default onNewsSlice.reducer;
