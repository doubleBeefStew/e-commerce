import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import env from '../../../../env'

export const loadCart = createAsyncThunk('cart/', async(id)=>{
    try{
        const response = await axios.get(`${env.API_URL}/cart`,{withCredentials:true})
        return response.data
    }catch(err){
        console.log(err.response.data.error.message)
        throw new Error(err.response.data.error.message)
    }
})

export const updateCart = createAsyncThunk('cart/update', async(id,data)=>{
    try{
        const response = await axios.patch(`${env.API_URL}/cart/update/${id}`,data,{withCredentials:true})
        return response.data
    }catch(err){
        console.log(err.response.data.error.message)
        throw new Error(err.response.data.error.message)
    }
})

const initialState = {
    cartData:null,
    isLoadingCart:true,
    error:null
}

const cartSlice = createSlice({
    name:'cart',
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
        .addCase(loadCart.pending,(state)=>{
            state.isLoadingCart=true
        })
        .addCase(loadCart.fulfilled,(state,action)=>{
            state.cartData = action.payload.output.payload
            state.isLoadingCart=false
        })
        .addCase(loadCart.rejected,(state,action)=>{
            state.isLoadingCart=false
            state.error=action.error.message
        })
        .addCase(updateCart.pending,(state)=>{
            state.isLoadingCart=true
        })
        .addCase(updateCart.fulfilled,(state,action)=>{
            state.cartData = action.payload.output.payload
            state.isLoadingCart=false
        })
        .addCase(updateCart.rejected,(state,action)=>{
            state.isLoadingCart=false
            state.error=action.error.message
        })
    }
})

export const { setError } = cartSlice.actions

export default cartSlice.reducer