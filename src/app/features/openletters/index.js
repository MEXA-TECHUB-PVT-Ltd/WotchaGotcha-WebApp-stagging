import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { client } from "../../../configs/client.js";

export const getLetterCategories = createAsyncThunk(
  "discCategory/getAllDiscCategories",
  async ({ token }, { rejectWithValue }) => {
    try {
      const { data } = await client.get(`/discCategory/getAllDiscCategories`, {
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

export const getLetterSubByCategory = createAsyncThunk(
  "discSubCategory/get-all",
  async ({ token, id }, { rejectWithValue }) => {
    try {
      const { data } = await client.get(
        `discSubCategory/get-all?category_id=${id}`,
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

export const getTopLetter = createAsyncThunk(
  "/top/app/top_letter",
  async ({ token }, { rejectWithValue }) => {
    try {
      const { data } = await client.get(`/top/app/top_letter`, {
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

export const getLetterByCategory = createAsyncThunk(
  "letter/getAllLetterByCategory",
  async ({ token, id }, { rejectWithValue }) => {
    try {
      const { data } = await client.get(
        `/letter/getAllLetterByCategory/${id}`,
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

export const searchLetters = createAsyncThunk(
  "letter/searchLetters",
  async ({ token, searchQuery }, { rejectWithValue }) => {
    try {
      const { data } = await client.get(
        `/letter/searchLetters?name=${searchQuery}`,
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

const openLetterSlice = createSlice({
  name: "pictours",

  initialState: {
    isLoading: false,
    isFetching: false,
    isLetterFetching: false,
    isTopLetterFetching: false,
    isSearhing: false,
    error: null,
    categories: null,
  },

  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(getLetterCategories.pending, (state) => {
        state.isFetching = true;
      })
      .addCase(getLetterCategories.fulfilled, (state, action) => {
        state.isFetching = false;
        state.categories = action?.payload;
      })
      .addCase(getLetterCategories.rejected, (state, action) => {
        state.isFetching = false;
        state.error = action?.payload;
      })
      .addCase(getLetterByCategory.pending, (state) => {
        state.isLetterFetching = true;
      })
      .addCase(getLetterByCategory.fulfilled, (state, action) => {
        state.isLetterFetching = false;
      })
      .addCase(getLetterByCategory.rejected, (state, action) => {
        state.isLetterFetching = false;
        state.error = action?.payload;
      })
      .addCase(getTopLetter.pending, (state) => {
        state.isTopLetterFetching = true;
      })
      .addCase(getTopLetter.fulfilled, (state, action) => {
        state.isTopLetterFetching = false;
      })
      .addCase(getTopLetter.rejected, (state, action) => {
        state.isTopLetterFetching = false;
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
      .addCase(searchLetters.pending, (state) => {
        state.isSearhing = true;
      })
      .addCase(searchLetters.fulfilled, (state, action) => {
        state.isSearhing = false;
      })
      .addCase(searchLetters.rejected, (state, action) => {
        state.isSearhing = false;
        state.error = action?.payload;
      });
  },
});

export default openLetterSlice.reducer;
