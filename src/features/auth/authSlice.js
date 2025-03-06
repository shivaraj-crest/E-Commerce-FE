import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: localStorage.getItem("user") || null, // Persist user state
  token: localStorage.getItem("token") || null,
  isAuthenticated: !!localStorage.getItem("token"),
  role: null,
  userDetails:null
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      console.log(action);
      state.user = action.payload?.user?.id;
      state.token = action.payload?.token;
      state.isAuthenticated = true;
      state.userDetails = action.payload?.user;

      state.role = action.payload?.user?.role;
      localStorage.setItem("user", action.payload.user?.id);
      localStorage.setItem("token", action.payload?.token);
      localStorage.setItem("name", action.payload?.user?.name);
      localStorage.setItem("email", action.payload?.user?.email);

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
