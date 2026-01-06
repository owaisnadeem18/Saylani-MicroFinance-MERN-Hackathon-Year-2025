import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: null,
    token: null ,
    loading: false,
    isAuthenticated: false,
    menu: true
}

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setUser: (state , action) => {      
            state.user = action.payload.user 
            state.token = action.payload.token
            state.isAuthenticated = true
        },

         updateMustChangePassword: (state, action) => {
            if (state.user) {
                state.user.mustChangePassword = action.payload
            }
        },
        
        clearUser: (state , action) => {
            state.user = null
            state.token = null
            state.isAuthenticated = false
        } ,
                                                                          
        setLoading: (state , action) => {
            state.loading = action.payload                                                       
        } ,            

        setMenu: (state,action) => {
            state.menu = action.payload
        }

    }
})
                                                                  
export const {setUser , clearUser , updateMustChangePassword , setLoading , setMenu} = authSlice.actions
export default authSlice.reducer                                                         