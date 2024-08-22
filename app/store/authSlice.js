import { createSlice } from "@reduxjs/toolkit";

import Cookies from "js-cookie";

export const checkAuthState = () => {
  const userUid = Cookies.get("userUid");
  return !!userUid; // Returns true if cookie exists, false otherwise
};

const initialState = {
  authState: checkAuthState()
}

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthState: (state, action) => {
      state.authState = action.payload;
    },
  },
});

export const { setAuthState } = authSlice.actions;
export const authReducer = authSlice.reducer;