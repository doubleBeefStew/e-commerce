import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

export const register = createAsyncThunk('user/register',async(data)=>{
    try{
        const response = await axios.post(`${import.meta.env.VITE_API_URL}/auth/register`,data,{withCredentials:true})
        return response.data
    }catch(err){
        console.error(err.response.data.error.message)
        throw new Error(err.response.data.error.message)
    }
})

export const login = createAsyncThunk('user/login',async(data)=>{
    try{
        const response = await axios.post(`${import.meta.env.VITE_API_URL}/auth/login`,data,{withCredentials:true})
        return response.data
    }catch(err){
        console.error(err.response.data.error.message)
        throw new Error(err.response.data.error.message)
    }
})

export const loadUser = createAsyncThunk('user',async()=>{
    try{
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/user`,{withCredentials:true})
        return response.data
    }catch(err){
        console.error(err.response.data.error.message)
        throw new Error(err.response.data.error.message)
    }
})

export const updateUser = createAsyncThunk('user/update',async(data)=>{
    try{
        const response = await axios.patch(`${import.meta.env.VITE_API_URL}/user/update/info`,data,{withCredentials:true})
        return response.data
    }catch(err){
        console.error(err.response.data.error.message)
        throw new Error(err.response.data.error.message)
    }
})

export const logout = createAsyncThunk('user/logout',async()=>{
    try{
        const response = await axios.post(`${import.meta.env.VITE_API_URL}/auth/logout`,{},{withCredentials:true})
        return response.data
    }catch(err){
        throw new Error(err.message)
    }
})

const initialState = {
    isAuthenticated:false,
    userData:JSON.parse(localStorage.getItem('userData'))? JSON.parse(localStorage.getItem('userData')):[],
    isLoadingUser:false,
    isUserError:false,
    alert:null
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
        setLogout(state){
            localStorage.clear()
            state = {initialState}
        }
    },
    extraReducers:(builder)=>{
        builder
        .addCase(register.pending,(state)=>{
            state.isLoadingUser=true
        })
        .addCase(register.fulfilled,(state,action)=>{
            state.isLoadingUser=false
        })
        .addCase(register.rejected,(state,action)=>{
            state.isLoadingUser=false
            state.isUserError=true
        })
        .addCase(login.pending,(state)=>{
            state.isLoadingUser=true
        })
        .addCase(login.fulfilled,(state,action)=>{
            state.isLoadingUser=false
            state.isAuthenticated=true
            state.userData = action.payload.output.payload
            localStorage.setItem("userData",JSON.stringify(state.userData))
        })
        .addCase(login.rejected,(state,action)=>{
            state.isLoadingUser=false
            state.isUserError=true
        })
        .addCase(logout.pending,(state)=>{
            state.isLoadingUser=true
        })
        .addCase(logout.fulfilled,(state,action)=>{
            state.isAuthenticated = false
            state.isLoadingUser = false
        })
        .addCase(logout.rejected,(state,action)=>{
            state.isLoadingUser=false
            state.isUserError = true
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
            if(!action.error.message.includes('token'))
                state.isUserError = true
        })
        .addCase(updateUser.pending,(state)=>{
            state.isLoadingUser=true
        })
        .addCase(updateUser.fulfilled,(state,action)=>{
            state.isAuthenticated = true
            state.userData = action.payload.output.payload
            localStorage.setItem("userData",JSON.stringify(state.userData))
            state.isLoadingUser = false
            state.alert = {message:'Profile updated successfully.', type:'success'}
        })
        .addCase(updateUser.rejected,(state,action)=>{
            state.isLoadingUser=false
            state.isUserError=true
            state.alert = {message:'Profile updated failed.', type:'danger'}
        })
    }
})

export const { setAlert,setLogout } = userSlice.actions

export default userSlice.reducer