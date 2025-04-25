import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { client } from "../../../configs/client.js";

export const getLearningHobbiesCategories = createAsyncThunk(
  "/learningHobbies/category/getAll",
  async ({ token }, { rejectWithValue }) => {
    try {
      const { data } = await client.get(`/learningHobbies/category/getAll`, {
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

export const getLearningHobbiesSubCategoriesByCategory = createAsyncThunk(
  "learningHobbies/sub_category/getAllByCategory",
  async ({ token, id }, { rejectWithValue }) => {
    try {
      const { data } = await client.get(
        `/learningHobbies/sub_category/getAllByCategory?category_id=${id}`,
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

export const learningHobbiesTopVideo = createAsyncThunk(
  "learningHobbies/getTopVideo",
  async ({ token }, { rejectWithValue }) => {
    try {
      const { data } = await client.get(`/learningHobbies/getTopVideo`, {
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

export const getLearningHobbiesByCategory = createAsyncThunk(
  "learningHobbies/getByCategory",
  async ({ token, id }, { rejectWithValue }) => {
    try {
      const { data } = await client.get(
        `/learningHobbies/getByCategory/${id}`,
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

export const getLearningHobbiesByUser = createAsyncThunk(
  "learningHobbies/getByUserId",
  async ({ token, id }, { rejectWithValue }) => {
    try {
      const { data } = await client.get(`/learningHobbies/getByUserId/${id}`, {
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

export const addLearningHobbies = createAsyncThunk(
  "/learningHobbies/create",
  async ({ token, payload }, { rejectWithValue }) => {
    try {
      const { data } = await client.post(`/learningHobbies/create`, payload, {
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

export const deleteLearningHobbies = createAsyncThunk(
  "learningHobbies/delete",
  async ({ token, id }, { rejectWithValue }) => {
    try {
      const { data } = await client.delete(`/learningHobbies/delete/${id}`, {
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

export const updateLearningHobbies = createAsyncThunk(
  "learningHobbies/update",
  async ({ token, payload }, { rejectWithValue }) => {
    try {
      const { data } = await client.put(`/learningHobbies/update`, payload, {
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

export const getLearningHobbiesLikes = createAsyncThunk(
  "/learningHobbies/all-likes",
  async ({ token, id }, { rejectWithValue }) => {
    try {
      const { data } = await client.get(`/learningHobbies/all-likes/${id}`, {
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

export const likeUnlikeLearningHobbies = createAsyncThunk(
  "/learningHobbies/toggleLikeVideo",
  async ({ token, payload }, { rejectWithValue }) => {
    try {
      const { data } = await client.post(
        `/learningHobbies/toggleLikeVideo`,
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

export const getLearningHobbiesComments = createAsyncThunk(
  "/learningHobbies/getComments",
  async ({ token, id }, { rejectWithValue }) => {
    try {
      const { data } = await client.get(`/learningHobbies/getComments/${id}`, {
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

export const addCommentOnLearningHobbies = createAsyncThunk(
  "/learningHobbies/addComment",
  async ({ token, payload }, { rejectWithValue }) => {
    try {
      const { data } = await client.post(
        `/learningHobbies/addComment`,
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

export const searchLearningHobbies = createAsyncThunk(
  "learningHobbies/searchByTitle?query",
  async ({ token, searchQuery }, { rejectWithValue }) => {
    try {
      const { data } = await client.get(
        `/learningHobbies/searchByTitle?query=${searchQuery}`,
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

const learningAndHobbiesSlice = createSlice({
  name: "learningandhobbies",

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
      .addCase(getLearningHobbiesCategories.pending, (state) => {
        state.isFetching = true;
      })
      .addCase(getLearningHobbiesCategories.fulfilled, (state, action) => {
        state.isFetching = false;
        state.categories = action?.payload;
      })
      .addCase(getLearningHobbiesCategories.rejected, (state, action) => {
        state.isFetching = false;
        state.error = action?.payload;
      })
      .addCase(getLearningHobbiesByCategory.pending, (state) => {
        state.isVideoFetching = true;
      })
      .addCase(getLearningHobbiesByCategory.fulfilled, (state, action) => {
        state.isVideoFetching = false;
      })
      .addCase(getLearningHobbiesByCategory.rejected, (state, action) => {
        state.isVideoFetching = false;
        state.error = action?.payload;
      })
      .addCase(learningHobbiesTopVideo.pending, (state) => {
        state.isTopVideoFetching = true;
      })
      .addCase(learningHobbiesTopVideo.fulfilled, (state, action) => {
        state.isTopVideoFetching = false;
      })
      .addCase(learningHobbiesTopVideo.rejected, (state, action) => {
        state.isTopVideoFetching = false;
        state.error = action?.payload;
      })
      .addCase(likeUnlikeLearningHobbies.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(likeUnlikeLearningHobbies.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(likeUnlikeLearningHobbies.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action?.payload;
      })
      .addCase(addCommentOnLearningHobbies.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addCommentOnLearningHobbies.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(addCommentOnLearningHobbies.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action?.payload;
      })
      .addCase(searchLearningHobbies.pending, (state) => {
        state.isSearching = true;
      })
      .addCase(searchLearningHobbies.fulfilled, (state, action) => {
        state.isSearching = false;
      })
      .addCase(searchLearningHobbies.rejected, (state, action) => {
        state.isSearching = false;
        state.error = action?.payload;
      });
  },
});

export default learningAndHobbiesSlice.reducer;
