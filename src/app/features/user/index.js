import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { client } from "../../../configs/client.js";

// ✅ Get user profile
export const getUserProfileData = createAsyncThunk(
  "user/getUser",
  async ({ userId, token }, { rejectWithValue }) => {
    try {
      const { data } = await client.get(`/user/getUser/${userId}`, {
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

// ✅ Delete user account
export const userAccountDeleteAPI = createAsyncThunk(
  "user/deleteUser",
  async ({ userId, token }, { rejectWithValue }) => {
    try {
      const { data } = await client.delete(`/user/deleteUser/${userId}`, {
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

// ✅ User Slice
const userSlice = createSlice({
  name: "user",
  initialState: {
    isLoading: false,
    error: null,
    user: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // ▶ getUserProfileData
      .addCase(getUserProfileData.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getUserProfileData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action?.payload?.user;
      })
      .addCase(getUserProfileData.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action?.payload || "Something went wrong";
      })

      // ▶ userAccountDelete
      .addCase(userAccountDeleteAPI.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(userAccountDeleteAPI.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = null; // ✅ Clear user data on account delete
      })
      .addCase(userAccountDeleteAPI.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action?.payload || "Delete failed";
      });
  },
});

export default userSlice.reducer;
