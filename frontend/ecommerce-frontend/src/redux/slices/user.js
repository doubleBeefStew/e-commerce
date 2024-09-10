import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import env from '../../../../env'

export const login = createAsyncThunk('user/login',async(data)=>{
    try{
        const response = await axios.post(`${env.API_URL}/auth/login`,data,{withCredentials:true})
        return response.data
    }catch(err){
        console.error(err.response.data.error.message)
        throw new Error(err.response.data.error.message)
    }
})

export const loadUser = createAsyncThunk('user',async()=>{
    try{
        const response = await axios.get(`${env.API_URL}/user`,{withCredentials:true})
        return response.data
    }catch(err){
        console.error(err.response.data.error.message)
        throw new Error(err.response.data.error.message)
    }
})

export const updateUser = createAsyncThunk('user/update',async(data)=>{
    try{
        const response = await axios.patch(`${env.API_URL}/user/update/info`,data,{withCredentials:true})
        return response.data
    }catch(err){
        console.error(err.response.data.error.message)
        throw new Error(err.response.data.error.message)
    }
})

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
    isLoadingUser:false,
    alert:null,
}

const userSlice = createSlice({
    name:'user',
    initialState,
    reducers:{
        setAlert(state,action){
            state.alert = action.payload
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
        .addCase(login.pending,(state)=>{
            state.isLoadingUser=true
        })
        .addCase(login.fulfilled,(state,action)=>{
            state.isAuthenticated=true
            state.isLoadingUser=false
            state.userData = action.payload.output.payload
            localStorage.setItem("userData",JSON.stringify(state.userData))
        })
        .addCase(login.rejected,(state,action)=>{
            state.isLoadingUser=false
            state.alert={message:action.error.message,type:'danger'}
        })
        .addCase(logout.pending,(state)=>{
            state.isLoadingUser=true
        })
        .addCase(logout.fulfilled,(state,action)=>{
            state.isAuthenticated = false;
            state.userData = [];
            state.isLoadingUser = false;
            state.alert = null;
            localStorage.clear()
        })
        .addCase(logout.rejected,(state,action)=>{
            state.isLoadingUser=false
            state.alert={message:action.error.message,type:'danger'}
        })
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
            state.alert={message:action.error.message,type:'danger'}
        })
        .addCase(updateUser.pending,(state)=>{
        })
        .addCase(updateUser.fulfilled,(state,action)=>{
            state.isAuthenticated=true
            state.userData = action.payload.output.payload
            localStorage.setItem("userData",JSON.stringify(state.userData))
            state.alert={message:'Profile information is updated successfully',type:'success'}
            state.isLoadingUser=false
        })
        .addCase(updateUser.rejected,(state,action)=>{
            state.isLoadingUser=false
            state.alert={message:action.error.message,type:'danger'}
        })
    }
})

export const { setAlert } = userSlice.actions

export default userSlice.reducer