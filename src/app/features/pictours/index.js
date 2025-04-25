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
          limit: 1000,
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
            limit: 1000,
          },
        }
      );

      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data || error);
    }
  }
);

export const getPicTourByUser = createAsyncThunk(
  "picTour/getAllPicToursByUser",
  async ({ token, id }, { rejectWithValue }) => {
    try {
      const { data } = await client.get(`/picTour/getAllPicToursByUser/${id}`, {
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

export const deletePicTour = createAsyncThunk(
  "/picTour/deletePicTour",
  async ({ token, id }, { rejectWithValue }) => {
    try {
      const { data } = await client.delete(`/picTour/deletePicTour/${id}`, {
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

export const updatePicTour = createAsyncThunk(
  "/picTour/updatePicTour",
  async ({ token, payload }, { rejectWithValue }) => {
    try {
      const { data } = await client.put(`/picTour/updatePicTour`, payload, {
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

export const getPicTourLikes = createAsyncThunk(
  "/picTour/getAllLikesByPicTour",
  async ({ token, id }, { rejectWithValue }) => {
    try {
      const { data } = await client.get(`/picTour/getAllLikesByPicTour/${id}`, {
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

export const likeUnlikePicTour = createAsyncThunk(
  "/picTour/likeUnlikePicTour",
  async ({ token, payload }, { rejectWithValue }) => {
    try {
      const { data } = await client.post(
        `/picTour/likeUnlikePicTour`,
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

export const getPicTourComments = createAsyncThunk(
  "/picTour/getAllCommentsByPicTour",
  async ({ token, id }, { rejectWithValue }) => {
    try {
      const { data } = await client.get(
        `/picTour/getAllCommentsByPicTour/${id}`,
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

export const addCommentOnPicTour = createAsyncThunk(
  "/picTour/sendComment",
  async ({ token, payload }, { rejectWithValue }) => {
    try {
      const { data } = await client.post(`/picTour/sendComment`, payload, {
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

export const searchPicTour = createAsyncThunk(
  "picTour/searchTour",
  async ({ token, searchQuery }, { rejectWithValue }) => {
    try {
      const { data } = await client.get(
        `/picTour/searchTour?name=${searchQuery}`,
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

const picTourSlice = createSlice({
  name: "pictours",

  initialState: {
    isLoading: false,
    isFetching: false,
    isPicTourFetching: false,
    isTopPicTourFetching: false,
    isSearhing: false,
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
      .addCase(likeUnlikePicTour.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(likeUnlikePicTour.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(likeUnlikePicTour.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action?.payload;
      })
      .addCase(addCommentOnPicTour.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addCommentOnPicTour.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(addCommentOnPicTour.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action?.payload;
      })
      .addCase(searchPicTour.pending, (state) => {
        state.isSearhing = true;
      })
      .addCase(searchPicTour.fulfilled, (state, action) => {
        state.isSearhing = false;
      })
      .addCase(searchPicTour.rejected, (state, action) => {
        state.isSearhing = false;
        state.error = action?.payload;
      });
  },
});

export default picTourSlice.reducer;
