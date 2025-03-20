import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { client } from "../../../configs/client.js";

export const getSportsAndSportsCategories = createAsyncThunk(
  "sports/category/getAll",
  async ({ token }, { rejectWithValue }) => {
    try {
      const { data } = await client.get(`/sports/category/getAll`, {
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

export const getSportsAndSportsSubCategoryByCategory = createAsyncThunk(
  "sports/sub_category/getAllByCategory",
  async ({ token, id }, { rejectWithValue }) => {
    try {
      const { data } = await client.get(
        `/sports/sub_category/getAllByCategory?category_id=${id}`,
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

export const getTopSportsAndSports = createAsyncThunk(
  "/sports/getTopSport",
  async ({ token }, { rejectWithValue }) => {
    try {
      const { data } = await client.get(`/sports/getTopSport`, {
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

export const getSportsAndSportsByCategory = createAsyncThunk(
  "sports/getByCategory",
  async ({ token, id }, { rejectWithValue }) => {
    try {
      const { data } = await client.get(`/sports/getByCategory/${id}`, {
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

export const addSportsAndSports = createAsyncThunk(
  "/sports/create",
  async ({ token, payload }, { rejectWithValue }) => {
    try {
      const { data } = await client.post(`/sports/create`, payload, {
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

export const getSportsAndSportsLikes = createAsyncThunk(
  "/sports/all-likes",
  async ({ token, id }, { rejectWithValue }) => {
    try {
      const { data } = await client.get(`/sports/all-likes/${id}`, {
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

export const likeUnlikeSportsAndSports = createAsyncThunk(
  "sports/toggleLikeSport",
  async ({ token, payload }, { rejectWithValue }) => {
    try {
      const { data } = await client.post(`/sports/toggleLikeSport`, payload, {
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

export const getSportsAndSportsComments = createAsyncThunk(
  "sports/getComments",
  async ({ token, id }, { rejectWithValue }) => {
    try {
      const { data } = await client.get(`/sports/getComments/${id}`, {
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

export const addCommentOnSportsAndSports = createAsyncThunk(
  "sports/addComment",
  async ({ token, payload }, { rejectWithValue }) => {
    try {
      const { data } = await client.post(`/sports/addComment`, payload, {
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

export const searchSportsAndSports = createAsyncThunk(
  "sports/search",
  async ({ token, searchQuery }, { rejectWithValue }) => {
    try {
      const { data } = await client.get(
        `/sports/searchByTitle?query=${searchQuery}`,
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

const sportsAndSportsSlice = createSlice({
  name: "sportsandsports",

  initialState: {
    isLoading: false,
    isFetching: false,
    isSportsFetching: false,
    isTopSportsFetching: false,
    isSearching: false,
    error: null,
    categories: null,
  },

  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(getSportsAndSportsCategories.pending, (state) => {
        state.isFetching = true;
      })
      .addCase(getSportsAndSportsCategories.fulfilled, (state, action) => {
        state.isFetching = false;
        state.categories = action?.payload;
      })
      .addCase(getSportsAndSportsCategories.rejected, (state, action) => {
        state.isFetching = false;
        state.error = action?.payload;
      })
      .addCase(getSportsAndSportsByCategory.pending, (state) => {
        state.isSportsFetching = true;
      })
      .addCase(getSportsAndSportsByCategory.fulfilled, (state, action) => {
        state.isSportsFetching = false;
      })
      .addCase(getSportsAndSportsByCategory.rejected, (state, action) => {
        state.isSportsFetching = false;
        state.error = action?.payload;
      })
      .addCase(getTopSportsAndSports.pending, (state) => {
        state.isTopSportsFetching = true;
      })
      .addCase(getTopSportsAndSports.fulfilled, (state, action) => {
        state.isTopSportsFetching = false;
      })
      .addCase(getTopSportsAndSports.rejected, (state, action) => {
        state.isTopSportsFetching = false;
        state.error = action?.payload;
      })
      .addCase(likeUnlikeSportsAndSports.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(likeUnlikeSportsAndSports.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(likeUnlikeSportsAndSports.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action?.payload;
      })
      .addCase(addCommentOnSportsAndSports.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addCommentOnSportsAndSports.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(addCommentOnSportsAndSports.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action?.payload;
      })
      .addCase(searchSportsAndSports.pending, (state) => {
        state.isSearching = true;
      })
      .addCase(searchSportsAndSports.fulfilled, (state, action) => {
        state.isSearching = false;
      })
      .addCase(searchSportsAndSports.rejected, (state, action) => {
        state.isSearching = false;
        state.error = action?.payload;
      });
  },
});

export default sportsAndSportsSlice.reducer;
