import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { client } from "../../../configs/client.js";

const profileSlice = createSlice({
  name: "openletter",

  initialState: {
    isLoading: false,
    error: null,
  },

  reducers: {},

  extraReducers: (builder) => {},
});

export default profileSlice.reducer;
