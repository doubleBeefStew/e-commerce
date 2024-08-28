import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import env from '../../../../env'

export const loadOrders = createAsyncThunk('orders/',async(id)=>{
    try{
        const response = await axios.get(`${env.API_URL}/orders`,{withCredentials:true})
        return response.data
    }catch(err){
        console.log(err.response.data.error.message)
        throw new Error(err.response.data.error.message)
    }
})

export const createOrders = createAsyncThunk('orders/create',async(orderData)=>{
    try{
        const response = await axios.post(`${env.API_URL}/orders/create`,orderData,{withCredentials:true})  
        return response.data
    }catch(err){
        console.log(err.response.data.error.message)
        throw new Error(err.response.data.error.message)
    }
})

const initialState = {
    ordersData:null,
    isLoadingOrders:true,
    redirectToPayment:false,
    error:null,
}

const orderSlice = createSlice({
    name:'orders',
    initialState,
    reducers:{
        setError(state,action){
            state.error = action.payload
        },
        setState(state,action){
            state = action.payload
        }
    },
    extraReducers:(builder)=>{
        builder
        .addCase(loadOrders.pending,(state)=>{
            state.isLoadingOrders=true
        })
        .addCase(loadOrders.fulfilled,(state,action)=>{
            state.ordersData = action.payload.output.payload
            state.isLoadingOrders=false
        })
        .addCase(loadOrders.rejected,(state,action)=>{
            state.isLoadingOrders=false
            state.error=action.error.message
        })
        .addCase(createOrders.pending,(state)=>{
        })
        .addCase(createOrders.fulfilled,(state,action)=>{
            console.log(action.payload.output.payload)
            state.redirectToPayment=true
        })
        .addCase(createOrders.rejected,(state,action)=>{
            state.isLoadingOrders=false
            state.error=action.error.message
        })
    }
})

export const { setError } = orderSlice.actions

export default orderSlice.reducer