import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import env from '../../../../env'

export const loadProducts = createAsyncThunk('products/',async(id)=>{
    try{
        const response = await axios.get(`${env.API_URL}/products`,{withCredentials:true})
        return response.data
    }catch(err){
        console.error(err.response.data.error.message)
        throw new Error(err.response.data.error.message)
    }
})

const initialState = {
    productsData:null,
    isLoadingProducts:true,
    error:null,
}

const productSlice = createSlice({
    name:'products',
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
        .addCase(loadProducts.pending,(state)=>{
            state.isLoadingProducts=true
        })
        .addCase(loadProducts.fulfilled,(state,action)=>{
            state.productsData = action.payload.output.payload
            state.isLoadingProducts=false
        })
        .addCase(loadProducts.rejected,(state,action)=>{
            state.isLoadingProducts=false
            state.error=action.error.message
        })
    }
})

export const { setError } = productSlice.actions

export default productSlice.reducer