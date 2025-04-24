import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { client } from "../../../configs/client.js";

export const getQafiCategories = createAsyncThunk(
  "qafi/category/getAll",
  async ({ token }, { rejectWithValue }) => {
    try {
      const { data } = await client.get(`/qafi/category/getAll`, {
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

export const getQafiSubCategoryByCategory = createAsyncThunk(
  "qafi/sub_category/getAllByCategory",
  async ({ token, id }, { rejectWithValue }) => {
    try {
      const { data } = await client.get(
        `/qafi/sub_category/getAllByCategory?category_id=${id}`,
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

export const getTopQafi = createAsyncThunk(
  "/qafi/getTopQafi",
  async ({ token }, { rejectWithValue }) => {
    try {
      const { data } = await client.get(`/qafi/getTopQafi`, {
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

export const getQafiByCategory = createAsyncThunk(
  "qafi/getByCategory",
  async ({ token, id }, { rejectWithValue }) => {
    try {
      const { data } = await client.get(`/qafi/getAllQafisByCategory/${id}`, {
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

export const getQafiByUser = createAsyncThunk(
  "qafi/getAllQafisByUser",
  async ({ token, id }, { rejectWithValue }) => {
    try {
      const { data } = await client.get(`/qafi/getAllQafisByUser/${id}`, {
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

export const addQafi = createAsyncThunk(
  "/qafi/createQafi",
  async ({ token, payload }, { rejectWithValue }) => {
    try {
      const { data } = await client.post(`/qafi/createQafi`, payload, {
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

export const deleteQafi = createAsyncThunk(
  "/qafi/deleteQafi",
  async ({ token, id }, { rejectWithValue }) => {
    try {
      const { data } = await client.delete(`/qafi/deleteQafi/${id}`, {
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

export const updateQafi = createAsyncThunk(
  "qafi/updateQafi",
  async ({ token, payload }, { rejectWithValue }) => {
    try {
      const { data } = await client.put(`/qafi/updateQafi`, payload, {
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

export const getQafiLikes = createAsyncThunk(
  "/qafi/getAllLikesByQafi",
  async ({ token, id }, { rejectWithValue }) => {
    try {
      const { data } = await client.get(`/qafi/getAllLikesByQafi/${id}`, {
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

export const likeUnlikeQafi = createAsyncThunk(
  "qafi/likeUnlikeQafi",
  async ({ token, payload }, { rejectWithValue }) => {
    try {
      const { data } = await client.post(`/qafi/likeUnlikeQafi`, payload, {
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

export const getQafiComments = createAsyncThunk(
  "qafi/getAllCommentsByQafi",
  async ({ token, id }, { rejectWithValue }) => {
    try {
      const { data } = await client.get(`/qafi/getAllCommentsByQafi/${id}`, {
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

export const addCommentOnQafi = createAsyncThunk(
  "qafi/sendComment",
  async ({ token, payload }, { rejectWithValue }) => {
    try {
      const { data } = await client.post(`/qafi/sendComment`, payload, {
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

export const searchQafi = createAsyncThunk(
  "qafi/search",
  async ({ token, searchQuery }, { rejectWithValue }) => {
    try {
      const { data } = await client.get(
        `/qafi/searchQafi?name=${searchQuery}`,
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

const qafiSlice = createSlice({
  name: "qafi",

  initialState: {
    isLoading: false,
    isFetching: false,
    isQafiFetching: false,
    isTopQafiFetching: false,
    isSearching: false,
    error: null,
    categories: null,
  },

  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(getQafiCategories.pending, (state) => {
        state.isFetching = true;
      })
      .addCase(getQafiCategories.fulfilled, (state, action) => {
        state.isFetching = false;
        state.categories = action?.payload;
      })
      .addCase(getQafiCategories.rejected, (state, action) => {
        state.isFetching = false;
        state.error = action?.payload;
      })
      .addCase(getQafiByCategory.pending, (state) => {
        state.isQafiFetching = true;
      })
      .addCase(getQafiByCategory.fulfilled, (state, action) => {
        state.isQafiFetching = false;
      })
      .addCase(getQafiByCategory.rejected, (state, action) => {
        state.isQafiFetching = false;
        state.error = action?.payload;
      })
      .addCase(getTopQafi.pending, (state) => {
        state.isTopQafiFetching = true;
      })
      .addCase(getTopQafi.fulfilled, (state, action) => {
        state.isTopQafiFetching = false;
      })
      .addCase(getTopQafi.rejected, (state, action) => {
        state.isTopQafiFetching = false;
        state.error = action?.payload;
      })
      .addCase(likeUnlikeQafi.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(likeUnlikeQafi.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(likeUnlikeQafi.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action?.payload;
      })
      .addCase(addCommentOnQafi.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addCommentOnQafi.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(addCommentOnQafi.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action?.payload;
      })
      .addCase(searchQafi.pending, (state) => {
        state.isSearching = true;
      })
      .addCase(searchQafi.fulfilled, (state, action) => {
        state.isSearching = false;
      })
      .addCase(searchQafi.rejected, (state, action) => {
        state.isSearching = false;
        state.error = action?.payload;
      });
  },
});

export default qafiSlice.reducer;
