import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import env from '../../../../env'

const initialState = {
    checkoutData:JSON.parse(localStorage.getItem('checkoutData'))? JSON.parse(localStorage.getItem('checkoutData')):[],
    isLoadingCheckOut:true,
    error:null
}

const checkoutSlice = createSlice({
    name:'checkout',
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
})

export const { setError,addItem,updateItem,removeItem } = cartSlice.actions

export default cartSlice.reducer