import {configureStore, createReducer} from '@reduxjs/toolkit'
import userReducer from './slices/user'
import productReducer from './slices/products'
import cartReducer from './slices/cart'
import orderReducer from './slices/orders'
import paymentReducer from './slices/payment'

const store = configureStore({
    reducer:{
        user:userReducer,
        products:productReducer,
        cart:cartReducer,
        orders:orderReducer,
        payment:paymentReducer,
    }
})

export default store
