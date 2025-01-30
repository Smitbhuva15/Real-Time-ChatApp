import { createSlice } from '@reduxjs/toolkit'

export const counterSlice = createSlice({
  name: 'counter',
  initialState: {
    value: 0
  },
  reducers: {
    incrementByAmount: (state, action) => {
      state.value += action.payload
    }
  }
})


export const {  incrementByAmount } = counterSlice.actions

export default counterSlice.reducer