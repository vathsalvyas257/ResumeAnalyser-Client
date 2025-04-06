// store.jsx
import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import resumeReducer from './resumeSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
    resume: resumeReducer,
  },
});

export default store; 
