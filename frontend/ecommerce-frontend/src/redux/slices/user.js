import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import env from '../../../../env'

export const loadUser = createAsyncThunk('user/fetch',async()=>{
    try{
        const response = await axios.get(`${env.API_URL}/user`,{withCredentials:true})
        return response.data
    }catch(err){
        throw new Error(err.message)
    }
})

const initialState = {
    isAuthenticated:false,
    userData:null,
    isLoadingUser:false,
    error:null,
}

const userSlice = createSlice({
    name:'user',
    initialState,
    reducers:{
        setError(state,action){
            state.error = action.payload
        }
    },
    extraReducers:(builder)=>{
        builder
        .addCase(loadUser.pending,(state)=>{
            state.isLoadingUser=true
        })
        .addCase(loadUser.fulfilled,(state,action)=>{
            state.isAuthenticated=true
            state.userData = action.payload.output.data
            state.isLoadingUser=false
        })
        .addCase(loadUser.rejected,(state,action)=>{
            state.isLoadingUser=false
            state.error=action.error.message
        })
    }
})

export const { setError } = userSlice.actions

export default userSlice.reducer