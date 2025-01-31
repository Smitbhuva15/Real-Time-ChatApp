import { createSlice } from '@reduxjs/toolkit'

export const messageSlice = createSlice({
  name: 'message',

  initialState: {
    Alluser: [],
    selecteduser:''
  },

  reducers: {
    getalluser: (state, action) => {
      state.Alluser = action.payload
    },
    getuserSelect: (state, action) => {
      state.selecteduser = action.payload
    }
  }
})


export const { getalluser, getuserSelect } = messageSlice.actions

export default messageSlice.reducer