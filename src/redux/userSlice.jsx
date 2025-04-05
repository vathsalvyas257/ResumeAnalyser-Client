import { createSlice } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';

// Get from cookie/localStorage if available
const initialToken = Cookies.get("token") || "";
const initialUser = localStorage.getItem("user") 
  ? JSON.parse(localStorage.getItem("user"))
  : null;

const initialState = {
  isLoggedIn: !!initialToken,
  token: initialToken,
  user: initialUser,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action) => {
      const { token, user } = action.payload;
      state.isLoggedIn = true;
      state.token = token;
      state.user = user;

      // Save to cookies and localStorage
      Cookies.set("token", token);
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.token = "";
      state.user = null;

      Cookies.remove("token");
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    },
  },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
