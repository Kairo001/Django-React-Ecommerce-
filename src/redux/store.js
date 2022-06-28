import { configureStore } from '@reduxjs/toolkit';
// Reducer
import auth from './slices/user'
import alert from './slices/alert'

export default configureStore({
  reducer: {
    auth,
    alert
  }
});