import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import env from '../../../../env'

export const loadOrders = createAsyncThunk('orders/',async(id)=>{
    try{
        const response = await axios.get(`${env.API_URL}/orders`,{withCredentials:true})
        return response.data
    }catch(err){
        console.error(err.response.data.error.message)
        throw new Error(err.response.data.error.message)
    }
})

export const cancelOrders = createAsyncThunk('orders/cancel',async(id)=>{
    try{
        const response = await axios.post(`${env.API_URL}/orders/cancel/${id}`,{},{withCredentials:true})
        console.log(response)
         
        return response.data
    }catch(err){
        console.error(err.response.data.error.message)
        throw new Error(err.response.data.error.message)
    }
})

export const createOrders = createAsyncThunk('orders/create',async(orderData)=>{
    try{
        const response = await axios.post(`${env.API_URL}/orders/create`,orderData,{withCredentials:true})  
        return response.data
    }catch(err){
        console.error(err.response.data.error.message)
        throw new Error(err.response.data.error.message)
    }
})

export const updateOrders = createAsyncThunk('orders/update',async(data)=>{
    try{
        const response = await axios.patch(`${env.API_URL}/orders/update/${data.id}`,data.orderData,{withCredentials:true})  
        return response.data
    }catch(err){
        console.error(err.response.data.error.message)
        throw new Error(err.response.data.error.message)
    }
})

export const deleteOrders = createAsyncThunk('orders/delete',async(id)=>{
    try{
        const response = await axios.delete(`${env.API_URL}/orders/delete/${id}`,{withCredentials:true})  
        return response.data
    }catch(err){
        console.error(err.response.data.error.message)
        throw new Error(err.response.data.error.message)
    }
})

const initialState = {
    ordersData:JSON.parse(localStorage.getItem('ordersData'))? JSON.parse(localStorage.getItem('ordersData')):[],
    isLoadingOrders:true,
    redirectToPayment:false,
    currentCheckout:null,
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
        },
        setCurrentCheckout(state,action){
            state.currentCheckout = action.payload
            console.log(state.currentCheckout)
        },
        setRedirect(state,action){
            state.redirectToPayment = action.payload
        },
        updateOrder(state,action){
            const order = action.payload
            const index = state.ordersData.find((item)=>{
                return item.orderId == order.orderId
            })

            if (index>=0){
                state.ordersData[index] = order
                localStorage.setItem("ordersData",JSON.stringify(state.ordersData))
            }
        },
        cancelOrder(state,action){
            const id = action.payload
            const foundOrder = state.ordersData.find((item)=>{
                return item._id == id
            })
            console.log(foundOrder)

            if(foundOrder){
                foundOrder.status = 'CANCELLED'
            }
            localStorage.setItem("ordersData",JSON.stringify(state.ordersData))
        },
        deleteOrder(state,action){
            const id = action.payload
            
            const newOrderList = state.ordersData.filter((item)=>{
                return item._id != id
            })

            state.ordersData = newOrderList
            localStorage.setItem("ordersData",JSON.stringify(state.ordersData))
        }
    },
    extraReducers:(builder)=>{
        builder
        .addCase(loadOrders.pending,(state)=>{
            state.isLoadingOrders = true
        })
        .addCase(loadOrders.fulfilled,(state,action)=>{
            state.isLoadingOrders = false
            state.ordersData = action.payload.output.payload
            localStorage.setItem("ordersData",JSON.stringify(state.ordersData))
        })
        .addCase(loadOrders.rejected,(state,action)=>{
            state.isLoadingOrders = false
            state.error = action.error.message
        })
        .addCase(createOrders.pending,(state)=>{
        })
        .addCase(createOrders.fulfilled,(state,action)=>{
            state.isLoadingOrders = false
            state.currentCheckout = action.payload.output.payload
            state.redirectToPayment = true
        })
        .addCase(createOrders.rejected,(state,action)=>{
            state.isLoadingOrders = false
            state.error = action.error.message
        })
        .addCase(updateOrders.pending,(state)=>{
        })
        .addCase(updateOrders.fulfilled,(state,action)=>{
            state.isLoadingOrders = false
        })
        .addCase(updateOrders.rejected,(state,action)=>{
            state.isLoadingOrders = false
            state.error = action.error.message
        })
        .addCase(cancelOrders.pending,(state)=>{
        })
        .addCase(cancelOrders.fulfilled,(state,action)=>{
            state.isLoadingOrders = false
        })
        .addCase(cancelOrders.rejected,(state,action)=>{
            state.isLoadingOrders = false
            state.error = action.error.message
        })
        .addCase(deleteOrders.pending,(state)=>{
        })
        .addCase(deleteOrders.fulfilled,(state,action)=>{
            state.isLoadingOrders = false
        })
        .addCase(deleteOrders.rejected,(state,action)=>{
            state.isLoadingOrders = false
            state.error = action.error.message
        })
    }
})

export const { setError,setRedirect,updateOrder,deleteOrder,cancelOrder,setCurrentCheckout } = orderSlice.actions

export default orderSlice.reducer