import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { client } from "../../../configs/client.js";

export const getVideoCategories = createAsyncThunk(
  "videoCategory/getAllVideoCategories",
  async ({ token }, { rejectWithValue }) => {
    try {
      const { data } = await client.get(
        `/videoCategory/getAllVideoCategories`,
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

export const getVideosByUser = createAsyncThunk(
  "xpi/getAllVideosByUser",
  async ({ token, id }, { rejectWithValue }) => {
    try {
      const { data } = await client.get(`/xpi/getAllVideosByUser/${id}`, {
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
      console.log("data>>>", data);

      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data || error);
    }
  }
);

export const getTopVideo = createAsyncThunk(
  "/top/app/top_video",
  async ({ token, id }, { rejectWithValue }) => {
    try {
      const { data } = await client.get(`/top/app/top_video/${id}`, {
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

export const getVideosByCategory = createAsyncThunk(
  "videoCategory/getAllVideosBycategory",
  async ({ token, id }, { rejectWithValue }) => {
    try {
      const { data } = await client.get(`/xpi/getAllVideosBycategory/${id}`, {
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

export const deleteVideoMania = createAsyncThunk(
  "/xpi/deleteXpiVideo",
  async ({ token, id }, { rejectWithValue }) => {
    try {
      const { data } = await client.delete(`/xpi/deleteXpiVideo/${id}`, {
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

export const updateVideoMania = createAsyncThunk(
  "/xpi/updateXpiVideo",
  async ({ token, payload }, { rejectWithValue }) => {
    try {
      const { data } = await client.put(`/xpi/updateXpiVideo`, payload, {
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
  "/xpi/getAllLikesByVideo",
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
  "/xpi/getAllCommentsByVideo",
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

const videoManiaSlice = createSlice({
  name: "videomania",

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
      .addCase(getVideoCategories.pending, (state) => {
        state.isFetching = true;
      })
      .addCase(getVideoCategories.fulfilled, (state, action) => {
        state.isFetching = false;
        state.categories = action?.payload;
      })
      .addCase(getVideoCategories.rejected, (state, action) => {
        state.isFetching = false;
        state.error = action?.payload;
      })
      .addCase(getVideosByCategory.pending, (state) => {
        state.isVideoFetching = true;
      })
      .addCase(getVideosByCategory.fulfilled, (state, action) => {
        state.isVideoFetching = false;
      })
      .addCase(getVideosByCategory.rejected, (state, action) => {
        state.isVideoFetching = false;
        state.error = action?.payload;
      })
      .addCase(getTopVideo.pending, (state) => {
        state.isTopVideoFetching = true;
      })
      .addCase(getTopVideo.fulfilled, (state, action) => {
        state.isTopVideoFetching = false;
      })
      .addCase(getTopVideo.rejected, (state, action) => {
        state.isTopVideoFetching = false;
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

export default videoManiaSlice.reducer;
