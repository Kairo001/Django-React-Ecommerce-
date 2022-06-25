import { configureStore } from '@reduxjs/toolkit';
// Reducer
import user from './slices/user'

export default configureStore({
  reducer: {
    user
  }
});