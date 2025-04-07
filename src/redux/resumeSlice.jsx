import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    uploaded: false,
    resumeResult: null,
    role: null,
    sectionScores: null,
  };
  
  const resumeSlice = createSlice({
    name: "resume",
    initialState,
    reducers: {
      uploadResumeSuccess: (state, action) => {
        state.uploaded = true;
        state.resumeResult = action.payload.DummyResult;
        state.role = action.payload.DummyRole
        state.sectionScores = action.payload.newData;
      },
      resetResume: (state) => {
        state.uploaded = false;
        state.resumeResult = null;
        state.jobRole = null;
        state.sectionScores = null;
      },
    },
  });
  
  export const { uploadResumeSuccess, resetResume } = resumeSlice.actions;
  export default resumeSlice.reducer;
  