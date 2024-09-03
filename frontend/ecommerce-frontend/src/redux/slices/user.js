import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import env from '../../../../env'

export const loadUser = createAsyncThunk('user',async()=>{
    try{
        const response = await axios.get(`${env.API_URL}/user`,{withCredentials:true})
        return response.data
    }catch(err){
        console.log(err.response.data.error.message)
        throw new Error(err.response.data.error.message)
    }
})

export const updateUser = createAsyncThunk('user/update',async(data)=>{
    try{
        const response = await axios.patch(`${env.API_URL}/user/update/info`,data,{withCredentials:true})
        return response.data
    }catch(err){
        console.log(err.response.data.error.message)
        throw new Error(err.response.data.error.message)
    }
})

//try making a logout async
export const logout = createAsyncThunk('user/logout',async()=>{
    try{
        const response = await axios.get(`${env.API_URL}/auth/logout`,{withCredentials:true})
        return response.data
    }catch(err){
        throw new Error(err.message)
    }
})

const initialState = {
    isAuthenticated:false,
    userData:JSON.parse(localStorage.getItem('userData'))? JSON.parse(localStorage.getItem('userData')):[],
    isLoadingUser:true,
    error:null,
    message:null
}

const userSlice = createSlice({
    name:'user',
    initialState,
    reducers:{
        setError(state,action){
            state.error = action.payload
        },
        setMessage(state,action){
            state.message = action.payload
        },
        setState(state,action){
            state = action.payload
        },
        logout(state){
            state = initialState
        }
    },
    extraReducers:(builder)=>{
        builder
        .addCase(loadUser.pending,(state)=>{
            state.isLoadingUser=true
        })
        .addCase(loadUser.fulfilled,(state,action)=>{
            state.isAuthenticated=true
            state.userData = action.payload.output.payload
            localStorage.setItem("userData",JSON.stringify(state.userData))
            state.isLoadingUser=false
        })
        .addCase(loadUser.rejected,(state,action)=>{
            state.isLoadingUser=false
            state.error={message:action.error.message,type:'danger'}
        })
        .addCase(updateUser.pending,(state)=>{
        })
        .addCase(updateUser.fulfilled,(state,action)=>{
            console.log(action)
            
            state.isAuthenticated=true
            state.userData = action.payload.output.payload
            localStorage.setItem("userData",JSON.stringify(state.userData))
            state.message={message:'Profile information is updated successfully',type:'success'}
            state.isLoadingUser=false
        })
        .addCase(updateUser.rejected,(state,action)=>{
            state.isLoadingUser=false
            state.error={message:action.error.message,type:'danger'}
        })
    }
})

export const { setError,setMessage } = userSlice.actions

export default userSlice.reducer