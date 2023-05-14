import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    buttonDisable(state) {
      state.loading = true;
      state.error = null;
    },
    buttonEnable(state) {
        state.loading = false;
        state.error = null;
      },
    
  
  },
});

export const { buttonDisable, buttonEnable} = authSlice.actions;

export default authSlice.reducer;
