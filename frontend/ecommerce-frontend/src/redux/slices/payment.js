import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import env from '../../../../env'

export const createPayment = createAsyncThunk('payment/',async(data)=>{
    try{
        const response = await axios.post(`${env.API_URL}/payment`,data,{withCredentials:true})
        return response.data
    }catch(err){
        console.error(err.response.data.error.message)
        throw new Error(err.response.data.error.message)
    }
})

const initialState = {
    isLoadingPayment:false,
    redirect:false,
    error:null,
}

const paymentSlice = createSlice({
    name:'payment',
    initialState,
    reducers:{
        setError(state,action){
            state.error = action.payload
        },
        setState(state,action){
            state = action.payload
        },
        setRedirect(state,action){
            state.redirect = action.payload
        },
        setLoadingPayment(state,action){
            state.isLoadingPayment = action.payload
        }
    },
    extraReducers:(builder)=>{
        builder
        .addCase(createPayment.pending,(state)=>{
            state.isLoadingPayment = true
        })
        .addCase(createPayment.fulfilled,(state,action)=>{
            state.redirect = true
            state.isLoadingPayment = false
        })
        .addCase(createPayment.rejected,(state,action)=>{
            state.isLoadingPayment = false
            state.error = action.error.message
        })
    }
})

export const { setError,setState,setRedirect,setLoadingPayment } = paymentSlice.actions

export default paymentSlice.reducer