import {configureStore} from '@reduxjs/toolkit'
import userReducer from './slices/user'
import productReducer from './slices/products'

const store = configureStore({
    reducer:{
        user:userReducer,
        products:productReducer,
    }
})

export default store
