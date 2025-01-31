import { createSlice } from '@reduxjs/toolkit'

export const themeSlice = createSlice({
  name: 'theme',
  
  initialState: {
  theme:""
  },

  reducers: {
    useTheme: (state, action) => {
      state.theme = action.payload
    }
  }
})


export const {  useTheme } = themeSlice.actions

export default themeSlice.reducer