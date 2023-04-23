import { createSlice } from '@reduxjs/toolkit'
import NativeAsyncLocalStorage from 'react-native/Libraries/Storage/NativeAsyncLocalStorage'

const state = {
  userId: null,
  login: null,
  email: '',
  stateChange: false,
  photo: null,
}

export const authSlice = createSlice({
  name: 'auth',
  initialState: state,
  reducers: {
    updateUserProfile: (state, { payload }) => ({
      ...state,
      userId: payload.userId,
      login: payload.login,
      photo: payload.photo,
      email: payload.email,
    }),
    authStateChange: (state, { payload }) => ({
      ...state,
      stateChange: payload.stateChange,
    }),
    authSignOut: () => state,
  },
})
