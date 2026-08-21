import { createSlice } from '@reduxjs/toolkit'


const initialState = {
    user : null
}


export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
   setUserDetails:(state, action)=> {
    state.user = action.payload
   }
  },
})


export const {setUserDetails } = userSlice.actions

export default userSlice.reducer