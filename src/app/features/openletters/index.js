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

export const getLetterByUser = createAsyncThunk(
  "letter/getAllLetterByUser",
  async ({ token, id }, { rejectWithValue }) => {
    try {
      const { data } = await client.get(`/letter/getAllLetterByUser/${id}`, {
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

export const addLetter = createAsyncThunk(
  "letter/createLetter",
  async ({ token, payload }, { rejectWithValue }) => {
    try {
      const { data } = await client.post(`/letter/createLetter`, payload, {
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

export const deleteLetter = createAsyncThunk(
  "letter/delete",
  async ({ token, id }, { rejectWithValue }) => {
    try {
      const { data } = await client.delete(`/letter/deleteLetter/${id}`, {
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

export const updateLetter = createAsyncThunk(
  "letter/updatePostLetter",
  async ({ token, payload }, { rejectWithValue }) => {
    try {
      const { data } = await client.put(`/letter/updatePostLetter`, payload, {
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

export const updateLetterMedia = createAsyncThunk(
  "letter/updatePostLetterImages",
  async ({ token, payload }, { rejectWithValue }) => {
    try {
      const { data } = await client.put(
        `/letter/updatePostLetterImages`,
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

export const addSignature = createAsyncThunk(
  "signature/createSignature",
  async ({ token, payload }, { rejectWithValue }) => {
    try {
      const { data } = await client.post(
        `/signature/createSignature`,
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

const openLetterSlice = createSlice({
  name: "openletter",

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
