import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: JSON.parse(localStorage.getItem("user")) || null, // Persist user state
  token: localStorage.getItem("token") || null,
  isAuthenticated: !!localStorage.getItem("token"),
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      console.log(action);
      state.user = action.payload?.user.id;
      state.token = action.payload?.token;
      state.isAuthenticated = true;
      localStorage.setItem("user", JSON.stringify(action.payload.user?.id,action.payload.user?.role));
      localStorage.setItem("token", action.payload?.token);
    },
    logoutUser: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      localStorage.removeItem("user");
      localStorage.removeItem("token");
    },
  },
});

export const { loginSuccess, logoutUser } = authSlice.actions;
export default authSlice.reducer;
