import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    uploaded: false,
    resumeResult: null,
  };
  
  const resumeSlice = createSlice({
    name: "resume",
    initialState,
    reducers: {
      uploadResumeSuccess: (state, action) => {
        state.uploaded = true;
        state.resumeResult = action.payload;
      },
      resetResume: (state) => {
        state.uploaded = false;
        state.resumeResult = null;
      },
    },
  });
  
  export const { uploadResumeSuccess, resetResume } = resumeSlice.actions;
  export default resumeSlice.reducer;
  