import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

export const createCart = createAsyncThunk('cart/create', async(id)=>{
    try{
        const response = await axios.post(`${import.meta.env.VITE_API_URL}/cart/create/${id}`,{withCredentials:true})
        return response.data
    }catch(err){
        console.error(err.response.data.error.message)
        throw new Error(err.response.data.error.message)
    }
})

export const loadCart = createAsyncThunk('cart/', async()=>{
    try{
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/cart`,{withCredentials:true})
        return response.data
    }catch(err){
        console.error(err.response.data.error.message)
        throw new Error(err.response.data.error.message)
    }
})

export const updateCart = createAsyncThunk('cart/update', async()=>{
    try{
        const response = await axios.patch(`${import.meta.env.VITE_API_URL}/cart/update`,JSON.parse(localStorage.getItem('cartData')),{withCredentials:true})
        return response.data
    }catch(err){
        console.error(err.response.data.error.message)
        throw new Error(err.response.data.error.message)
    }
})

const initialState = {
    cartData:JSON.parse(localStorage.getItem('cartData'))? JSON.parse(localStorage.getItem('cartData')):[],
    isLoadingCart:false,
    cartError:null
}

const cartSlice = createSlice({
    name:'cart',
    initialState,
    reducers:{
        setError(state,action){
            state.cartError = action.payload
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
        .addCase(createCart.pending,(state)=>{
            state.isLoadingCart=true
        })
        .addCase(createCart.fulfilled,(state,action)=>{
            state.cartData = action.payload.output.payload
            console.log('new cart created')
            localStorage.setItem("cartData",JSON.stringify(state.cartData))
            state.cartError=null
            state.isLoadingCart=false
        })
        .addCase(createCart.rejected,(state,action)=>{
            state.isLoadingCart=false
            state.cartError=action.error.message
        })
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
            state.cartError=action.error.message
        })
        .addCase(updateCart.pending,(state)=>{
            state.isLoadingCart=true
        })
        .addCase(updateCart.fulfilled,(state,action)=>{
            state.cartData = action.payload.output.payload
            localStorage.setItem(state.cartData,action.payload.output.payload)
            state.isLoadingCart=false
        })
        .addCase(updateCart.rejected,(state,action)=>{
            state.isLoadingCart=false
            state.cartError=action.error.message
        })
    }
})

export const { setError,addItem,updateItem,removeItem } = cartSlice.actions

export default cartSlice.reducer