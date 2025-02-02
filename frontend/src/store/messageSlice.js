import { createSlice } from '@reduxjs/toolkit'

export const messageSlice = createSlice({
  name: 'message',

  initialState: {
    Alluser: [],
    selecteduser:{},
    isAllUserLoding:true,
    Allmessages:[],
    ismessageLoding:true
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
    getallmeaasge: (state, action) => {
      state.Allmessages = action.payload
    },
    setmessageloading: (state, action) => {
      state.ismessageLoding = action.payload
    },
    
  }
})


export const { getalluser, getuserSelect,setloding,getallmeaasge,setmessageloading } = messageSlice.actions

export default messageSlice.reducer