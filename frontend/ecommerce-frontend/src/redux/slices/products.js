import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

export const loadProducts = createAsyncThunk('products/',async(searchData)=>{
    
    try{
        const query = searchData.keyword ? `/s?keyword=${searchData.keyword}&sort=${searchData.sort}` : ''
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/products${query}`,{withCredentials:true})
        return response.data
    }catch(err){
        console.error(err.response.data.error.message)
        throw new Error(err.response.data.error.message)
    }
})

const initialState = {
    productsData:[],
    isLoadingProducts:false,
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
            console.log(state.productsData)
            
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