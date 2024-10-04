import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { makePublicRequest } from "../../utils/axios";

const initialState = {
  currentUser: null,
  token: null,
  isAuthenticated: false,
};

export const logoutHandler = createAsyncThunk("logoutUser", async () => {
  try {
    await makePublicRequest.put("/auth/logout");
    
  } catch (error) {
    console.log(error);
    throw new Error(error.response.data.error || "logout failed");
  }
});

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginUser(state, action) {
      state.currentUser = action.payload.loggedInUser;
      state.token = action.payload.token;
      state.isAuthenticated = true;
    },
    logoutUser(state) {
      localStorage.removeItem("persist:root");
      localStorage.clear();
      localStorage.removeItem("expiryDate");
      state.isAuthenticated = false;
      state.currentUser = null;
      state.token = null;
    },
    updateUser(state, action) {
      state.currentUser = action.payload;
    },
  },
});

export const { loginUser, logoutUser, updateUser } = userSlice.actions;
export default userSlice.reducer;
