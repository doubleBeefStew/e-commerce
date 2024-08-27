import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import env from '../../../../env'

export const loadCart = createAsyncThunk('cart/', async()=>{
    try{
        const response = await axios.get(`${env.API_URL}/cart`,{withCredentials:true})
        return response.data
    }catch(err){
        console.log(err.response.data.error.message)
        throw new Error(err.response.data.error.message)
    }
})

export const updateCart = createAsyncThunk('cart/update', async()=>{
    try{
        const response = await axios.patch(`${env.API_URL}/cart/update`,JSON.parse(localStorage.getItem('cartData')),{withCredentials:true})
        return response.data
    }catch(err){
        console.log(err.response.data.error.message)
        throw new Error(err.response.data.error.message)
    }
})

const initialState = {
    cartData:JSON.parse(localStorage.getItem('cartData'))? JSON.parse(localStorage.getItem('cartData')):[],
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
        addItem(state,action){
            const product = action.payload
            
            const index = state.cartData.products.findIndex((item)=>{
                return item.productId == product.productId
            })
            if (index<0){
                state.cartData.products.push(product)  
            }else{
                state.cartData.products[index].quantity+=1
            }
            localStorage.setItem("cartData",JSON.stringify(state.cartData))
        },
        updateItem(state,action){
            const product = action.payload
            
            const index = state.cartData.products.findIndex((item)=>{
                return item.productId == product.productId
            })
            if (index>=0){
                state.cartData.products[index]=product
                
                localStorage.setItem("cartData",JSON.stringify(state.cartData))

            }
            
        },
        removeItem(state,action){
            const id = action.payload
            if(id){
                const list = state.cartData.products.filter((item)=>{
                    return item.productId != id
                })
                state.cartData.products=list  
            }else{
                state.cartData.products=[]  
            }

            localStorage.setItem("cartData",JSON.stringify(state.cartData))
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
            localStorage.setItem("cartData",JSON.stringify(state.cartData))
            state.isLoadingCart=false
        })
        .addCase(loadCart.rejected,(state,action)=>{
            state.isLoadingCart=false
            state.error=action.error.message
        })
        .addCase(updateCart.pending,(state)=>{
            console.log('update cart in progress')
        })
        .addCase(updateCart.fulfilled,(state,action)=>{
            state.cartData = action.payload.output.payload
            console.log(state.cartData)
            
            localStorage.setItem(state.cartData,action.payload.output.payload)
            state.isLoadingCart=false
        })
        .addCase(updateCart.rejected,(state,action)=>{
            state.isLoadingCart=false
            state.error=action.error.message
        })
    }
})

export const { setError,addItem,updateItem,removeItem } = cartSlice.actions

export default cartSlice.reducer