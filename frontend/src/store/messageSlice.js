import { createSlice } from '@reduxjs/toolkit'

export const messageSlice = createSlice({
  name: 'message',

  initialState: {
    Alluser: [],
    selecteduser:{},
    isAllUserLoding:true
    
  },

  reducers: {
    getalluser: (state, action) => {
      state.Alluser = action.payload
    },
    getuserSelect: (state, action) => {
      state.selecteduser = action.payload
    },
    setloding: (state, action) => {
      state.isAllUserLoding = action.payload
    },
    
  }
})


export const { getalluser, getuserSelect,setloding } = messageSlice.actions

export default messageSlice.reducer