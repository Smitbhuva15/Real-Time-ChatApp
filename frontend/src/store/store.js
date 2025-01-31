import { configureStore } from '@reduxjs/toolkit'
import themeReducer from './ThemeSlice'
import messageReducer from './messageSlice'

export const store = configureStore({
  reducer: {
    theme: themeReducer,
    message:messageReducer
    
  },
})