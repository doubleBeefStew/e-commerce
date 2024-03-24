import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import env from '../../../../env'

export const loadUser = createAsyncThunk('user/fetch',async(userId)=>{
    console.log(env.API_URL);
    axios.get(`${env.API_URL}/user/${userId}`,{withCredentials:true})
        .then((res)=>{
            console.log(res)
            return res.data
        })
        .catch((err)=>{
            console.log(err)
            return err.data
        })
})

const initialState = {
    isAuthenticated:false,
    userData:null,
    isLoading:false,
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
            state.isLoading=true
        })
        .addCase(loadUser.fulfilled,(state,action)=>{
            state.isAuthenticated=true
            state.userData = action.payload
            state.isLoading=false
        })
        .addCase(loadUser.rejected,()=>{
            state.isLoading=false
            state.error=action.error.message
        })
    }
})

export const { setError } = userSlice.actions

export default userSlice.reducer