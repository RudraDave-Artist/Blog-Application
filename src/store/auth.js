import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    status: false,
    userData: null
}
 
export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers:{
        login : (state,action) => {
            console.log("dispatched data ",action.payload.userData);
            state.status = true,
            state.userData = action.payload.userData
            console.log("user data is ",state.userData);
            
        },
        logout : (state) => {
            state.status = false
            state.userData = null
        }
    }
})

export const {login , logout} = authSlice.actions

export default authSlice.reducer
