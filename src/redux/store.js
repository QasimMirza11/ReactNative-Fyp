import {configureStore} from '@reduxjs/toolkit';
import userSlice from './reduxSlice/user';
const store = configureStore({
  reducer: {
    user: userSlice,
  },
});
export default store;
