import {configureStore, createReducer} from '@reduxjs/toolkit'
import userReducer from './slices/user'
import productReducer from './slices/products'
import cartReducer from './slices/cart'

const store = configureStore({
    reducer:{
        user:userReducer,
        products:productReducer,
        cart:cartReducer
    }
})

export default store
