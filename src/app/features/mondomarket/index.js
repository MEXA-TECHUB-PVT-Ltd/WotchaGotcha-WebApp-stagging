import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { client } from "../../../configs/client.js";

export const getMondoMarketCategories = createAsyncThunk(
  "/itemCategory/getAllItemCategories",
  async ({ token }, { rejectWithValue }) => {
    try {
      const { data } = await client.get(`/itemCategory/getAllItemCategories`, {
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

export const getVideoSubCategoryByCategory = createAsyncThunk(
  "video/sub_category/getAllByCategory",
  async ({ token, id }, { rejectWithValue }) => {
    try {
      const { data } = await client.get(
        `/video/sub_category/getAllByCategory?category_id=${id}`,
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

export const getTopMondoMarket = createAsyncThunk(
  "/top/getAllTopItem",
  async ({ token }, { rejectWithValue }) => {
    try {
      const { data } = await client.get(`/top/getAllTopItem`, {
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

export const getMondoByCategory = createAsyncThunk(
  "item/getAllItemByCategory",
  async ({ token, id, region }, { rejectWithValue }) => {
    try {
      const { data } = await client.get(`/item/getAllItemByCategory/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          page: 1,
          limit: 1000,
          region: region,
        },
      });

      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data || error);
    }
  }
);

export const addVideoMania = createAsyncThunk(
  "/xpi/createXpiVideo",
  async ({ token, payload }, { rejectWithValue }) => {
    try {
      const { data } = await client.post(`/xpi/createXpiVideo`, payload, {
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

export const getVideoAllLikes = createAsyncThunk(
  "/xpi/createXpiVideo",
  async ({ token, id }, { rejectWithValue }) => {
    try {
      const { data } = await client.get(`/xpi/getAllLikesByVideo/${id}`, {
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

export const likeUnlikeVideo = createAsyncThunk(
  "/xpi/likeUnlikeVideo",
  async ({ token, payload }, { rejectWithValue }) => {
    try {
      const { data } = await client.post(`/xpi/likeUnlikeVideo`, payload, {
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

export const getVideoAllComments = createAsyncThunk(
  "/xpi/createXpiVideo",
  async ({ token, id }, { rejectWithValue }) => {
    try {
      const { data } = await client.get(`/xpi/getAllCommentsByVideo/${id}`, {
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

export const addCommentOnVideo = createAsyncThunk(
  "/xpi/sendComment",
  async ({ token, payload }, { rejectWithValue }) => {
    try {
      const { data } = await client.post(`/xpi/sendComment`, payload, {
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

export const searchVideoMania = createAsyncThunk(
  "xpi/searchVideo",
  async ({ token, searchQuery }, { rejectWithValue }) => {
    try {
      const { data } = await client.get(
        `/xpi/searchVideo?name=${searchQuery}`,
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

const mondoMarketSlice = createSlice({
  name: "videomania",

  initialState: {
    isLoading: false,
    isFetching: false,
    isMondoFetching: false,
    isTopFetching: false,
    isSearching: false,
    error: null,
  },

  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(getMondoMarketCategories.pending, (state) => {
        state.isFetching = true;
      })
      .addCase(getMondoMarketCategories.fulfilled, (state, action) => {
        state.isFetching = false;
      })
      .addCase(getMondoMarketCategories.rejected, (state, action) => {
        state.isFetching = false;
        state.error = action?.payload;
      })
      .addCase(getMondoByCategory.pending, (state) => {
        state.isMondoFetching = true;
      })
      .addCase(getMondoByCategory.fulfilled, (state, action) => {
        state.isMondoFetching = false;
      })
      .addCase(getMondoByCategory.rejected, (state, action) => {
        state.isMondoFetching = false;
        state.error = action?.payload;
      })
      .addCase(getTopMondoMarket.pending, (state) => {
        state.isTopFetching = true;
      })
      .addCase(getTopMondoMarket.fulfilled, (state, action) => {
        state.isTopFetching = false;
      })
      .addCase(getTopMondoMarket.rejected, (state, action) => {
        state.isTopFetching = false;
        state.error = action?.payload;
      })
      .addCase(likeUnlikeVideo.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(likeUnlikeVideo.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(likeUnlikeVideo.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action?.payload;
      })
      .addCase(addCommentOnVideo.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addCommentOnVideo.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(addCommentOnVideo.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action?.payload;
      })
      .addCase(searchVideoMania.pending, (state) => {
        state.isSearching = true;
      })
      .addCase(searchVideoMania.fulfilled, (state, action) => {
        state.isSearching = false;
      })
      .addCase(searchVideoMania.rejected, (state, action) => {
        state.isSearching = false;
        state.error = action?.payload;
      });
  },
});

export default mondoMarketSlice.reducer;
