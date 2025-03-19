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

export const bookMarkItem = createAsyncThunk(
  "item/saveItem",
  async ({ token, payload }, { rejectWithValue }) => {
    try {
      const { data } = await client.post(`/item/saveItem`, payload, {
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

export const removeBookMarkItem = createAsyncThunk(
  "item/unSaveItem",
  async ({ token, payload }, { rejectWithValue }) => {
    try {
      const { data } = await client.post(`/item/unSaveItem`, payload, {
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

export const sendOffer = createAsyncThunk(
  "item/sendOffer",
  async ({ token, payload }, { rejectWithValue }) => {
    try {
      const { data } = await client.post(`/item/sendOffer`, payload, {
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

export const searchMondoItem = createAsyncThunk(
  "item/searchItems",
  async ({ token, searchQuery }, { rejectWithValue }) => {
    try {
      const { data } = await client.get(
        `/item/searchItems?name=${searchQuery}`,

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

export const addMondoMarketItem = createAsyncThunk(
  "item/sellItem",
  async ({ token, payload }, { rejectWithValue }) => {
    try {
      const { data } = await client.post(`/item/sellItem`, payload, {
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

export const toggleAlert = createAsyncThunk(
  "item/toggleAlert",
  async ({ token, payload }, { rejectWithValue }) => {
    try {
      const { data } = await client.post(`/item/toggleAlert`, payload, {
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

export const checkAlert = createAsyncThunk(
  "item/checkAlert",
  async ({ token, payload }, { rejectWithValue }) => {
    try {
      const { data } = await client.post(`/item/checkAlert`, payload, {
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

const mondoMarketSlice = createSlice({
  name: "mondomarket",

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
      .addCase(sendOffer.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(sendOffer.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(sendOffer.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action?.payload;
      })
      .addCase(searchMondoItem.pending, (state) => {
        state.isSearching = true;
      })
      .addCase(searchMondoItem.fulfilled, (state, action) => {
        state.isSearching = false;
      })
      .addCase(searchMondoItem.rejected, (state, action) => {
        state.isSearching = false;
        state.error = action?.payload;
      })
      .addCase(toggleAlert.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(toggleAlert.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(toggleAlert.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action?.payload;
      });
  },
});

export default mondoMarketSlice.reducer;
