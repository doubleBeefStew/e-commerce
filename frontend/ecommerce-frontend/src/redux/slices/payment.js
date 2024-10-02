import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

export const DealDashpayPayment = createAsyncThunk('payment/DealDashpay',async(data)=>{
    try{
        const response = await axios.post(`${import.meta.env.VITE_API_URL}/payment/DealDashpay`,data,{withCredentials:true})
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
        .addCase(DealDashpayPayment.pending,(state)=>{
            state.isLoadingPayment = true
        })
        .addCase(DealDashpayPayment.fulfilled,(state,action)=>{
            state.redirect = true
            state.isLoadingPayment = false
        })
        .addCase(DealDashpayPayment.rejected,(state,action)=>{
            state.isLoadingPayment = false
            state.error = action.error.message
        })
    }
})

export const { setError,setState,setRedirect,setLoadingPayment } = paymentSlice.actions

export default paymentSlice.reducer