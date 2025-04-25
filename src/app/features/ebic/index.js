import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { client } from "../../../configs/client.js";

export const getEbicCategories = createAsyncThunk(
  "gebc/category/getAll",
  async ({ token }, { rejectWithValue }) => {
    try {
      const { data } = await client.get(`/gebc/category/getAll`, {
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

export const getEbicSubCategoryByCategory = createAsyncThunk(
  "gebc/sub_category/getAllByCategory",
  async ({ token, id }, { rejectWithValue }) => {
    try {
      const { data } = await client.get(
        `/gebc/sub_category/getAllByCategory?category_id=${id}`,
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

export const getTopEbic = createAsyncThunk(
  "/gebc/getTopGebc",
  async ({ token }, { rejectWithValue }) => {
    try {
      const { data } = await client.get(`/gebc/getTopGebc`, {
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

export const getEbicByCategory = createAsyncThunk(
  "gebc/getByCategory",
  async ({ token, id }, { rejectWithValue }) => {
    try {
      const { data } = await client.get(`/gebc/getAllGEBCsByCategory/${id}`, {
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

export const getEbicByUser = createAsyncThunk(
  "gebc/getAllGEBCByUser",
  async ({ token, id }, { rejectWithValue }) => {
    try {
      const { data } = await client.get(`/gebc/getAllGEBCByUser/${id}`, {
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

export const addEbic = createAsyncThunk(
  "/gebc/createGEBC",
  async ({ token, payload }, { rejectWithValue }) => {
    try {
      const { data } = await client.post(`/gebc/createGEBC`, payload, {
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

export const deleteEbic = createAsyncThunk(
  "gebc/deleteGEBC",
  async ({ token, id }, { rejectWithValue }) => {
    try {
      const { data } = await client.delete(`/gebc/deleteGEBC/${id}`, {
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

export const updateEbic = createAsyncThunk(
  "gebc/updateGEBC",
  async ({ token, payload }, { rejectWithValue }) => {
    try {
      const { data } = await client.put(`/gebc/updateGEBC`, payload, {
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

export const getEbicLikes = createAsyncThunk(
  "/gebc/getAllLikesByGEBC",
  async ({ token, id }, { rejectWithValue }) => {
    try {
      const { data } = await client.get(`/gebc/getAllLikesByGEBC/${id}`, {
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

export const likeUnlikeEbic = createAsyncThunk(
  "gebc/likeUnlikeGEBC",
  async ({ token, payload }, { rejectWithValue }) => {
    try {
      const { data } = await client.post(`/gebc/likeUnlikeGEBC`, payload, {
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

export const getEbicComments = createAsyncThunk(
  "gebc/getAllCommentsByGEBC",
  async ({ token, id }, { rejectWithValue }) => {
    try {
      const { data } = await client.get(`/gebc/getAllCommentsByGEBC/${id}`, {
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

export const addCommentOnEbic = createAsyncThunk(
  "gebc/sendComment",
  async ({ token, payload }, { rejectWithValue }) => {
    try {
      const { data } = await client.post(`/gebc/sendComment`, payload, {
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

export const searchEbic = createAsyncThunk(
  "gebc/search",
  async ({ token, searchQuery }, { rejectWithValue }) => {
    try {
      const { data } = await client.get(
        `/gebc/searchGEBCs?name=${searchQuery}`,
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

const ebicSlice = createSlice({
  name: "ebic",

  initialState: {
    isLoading: false,
    isFetching: false,
    isEbicFetching: false,
    isTopEbicFetching: false,
    isSearching: false,
    error: null,
    categories: null,
  },

  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(getEbicCategories.pending, (state) => {
        state.isFetching = true;
      })
      .addCase(getEbicCategories.fulfilled, (state, action) => {
        state.isFetching = false;
        state.categories = action?.payload;
      })
      .addCase(getEbicCategories.rejected, (state, action) => {
        state.isFetching = false;
        state.error = action?.payload;
      })
      .addCase(getEbicByCategory.pending, (state) => {
        state.isEbicFetching = true;
      })
      .addCase(getEbicByCategory.fulfilled, (state, action) => {
        state.isEbicFetching = false;
      })
      .addCase(getEbicByCategory.rejected, (state, action) => {
        state.isEbicFetching = false;
        state.error = action?.payload;
      })
      .addCase(getTopEbic.pending, (state) => {
        state.isTopEbicFetching = true;
      })
      .addCase(getTopEbic.fulfilled, (state, action) => {
        state.isTopEbicFetching = false;
      })
      .addCase(getTopEbic.rejected, (state, action) => {
        state.isTopEbicFetching = false;
        state.error = action?.payload;
      })
      .addCase(likeUnlikeEbic.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(likeUnlikeEbic.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(likeUnlikeEbic.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action?.payload;
      })
      .addCase(addCommentOnEbic.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addCommentOnEbic.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(addCommentOnEbic.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action?.payload;
      })
      .addCase(searchEbic.pending, (state) => {
        state.isSearching = true;
      })
      .addCase(searchEbic.fulfilled, (state, action) => {
        state.isSearching = false;
      })
      .addCase(searchEbic.rejected, (state, action) => {
        state.isSearching = false;
        state.error = action?.payload;
      })
      .addCase(getEbicByUser.pending, (state, action) => {
        state.isEbicFetching = true;
      })
      .addCase(getEbicByUser.fulfilled, (state, action) => {
        state.isEbicFetching = false;
      })
      .addCase(getEbicByUser.rejected, (state, action) => {
        state.isEbicFetching = false;
        state.error = action?.payload;
      });
  },
});

export default ebicSlice.reducer;
