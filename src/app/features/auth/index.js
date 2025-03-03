import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { client } from "../../../configs/client";

export const registerUser = createAsyncThunk(
  "auth/user/register",
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await client.post(`/user/register`, payload);

      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data || error);
    }
  }
);
export const loginUser = createAsyncThunk(
  "auth/user/login",
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await client.post(`/user/login`, payload);

      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data || error);
    }
  }
);

export const forgotPassword = createAsyncThunk(
  "auth/user/forgetPassword",
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await client.post(`/user/forgetPassword`, payload);

      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data || error);
    }
  }
);

export const verifyOtp = createAsyncThunk(
  "auth/user/verifyOtp",
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await client.post(`/user/verifyOtp`, payload);

      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data || error);
    }
  }
);

export const resetPassword = createAsyncThunk(
  "auth/user/reset_password",
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await client.post(`/user/reset_password`, payload);

      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data || error);
    }
  }
);

const authSlice = createSlice({
  name: "auth",

  initialState: {
    isLoading: false,
    isFetching: false,
    error: null,
    token: null,
  },

  reducers: {
    logoutUser: (state) => {
      state.token = null;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.token = action?.payload?.newUser?.token;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action?.payload;
      })
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.token = action?.payload?.user?.token;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action?.payload;
      })
      .addCase(forgotPassword.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(forgotPassword.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(forgotPassword.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action?.payload;
      })
      .addCase(verifyOtp.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(verifyOtp.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(verifyOtp.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action?.payload;
      })
      .addCase(resetPassword.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(resetPassword.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action?.payload;
      });
  },
});

export const { logoutUser } = authSlice.actions;

export default authSlice.reducer;
