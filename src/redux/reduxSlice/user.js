import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  isLoggedIn: true,
  error: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserAction: (state, action) => {
      state.user = action.payload;
      state.isLoggedIn = true;
    },
    clearUserAction: (state) => {
      state.user = null;
      state.isLoggedIn = false;
    },
    setErrorAction: (state, action) => {
      state.error = action.payload;
    },
    clearErrorAction: (state) => {
      state.error = null;
    },
  },
});

export const {
  setUserAction,
  clearUserAction,
  setErrorAction,
  clearErrorAction,
} = userSlice.actions;

export default userSlice.reducer;


// import {createSlice,getDefaultMiddleware} from '@reduxjs/toolkit';

// const initialState = {
//   user: {},
//   // token: '',
//   isLoggedIn: true,
// };

// export const userSlice = createSlice({
//   name: 'user',
//   initialState,
//   reducers: {
//     setUserAction: (state, action) => {
//       state.user = action.payload;
//     },
//     resetUserAction: (state, action) => {
//       state.user = {};
//     },
//     setLoggedInAction: (state, action) => {
//       state.isLoggedIn = action.payload;
//     }
//     // setTokenAction: (state, action) => {
//     //   state.token = action.payload;
//     // },
//   },
// });

// // Action creators are generated for each case reducer function
// export const {
//   setUserAction,
//   resetUserAction,
//   setLoggedInAction,
//   // setTokenAction,
// } = userSlice.actions;

// export default userSlice.reducer;
