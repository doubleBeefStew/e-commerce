import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const createCart = createAsyncThunk('cart/create', async(id) => {
    try {
        const response = await axios.post(`${import.meta.env.VITE_API_URL}/cart/create/${id}`, {withCredentials: true});
        return response.data;
    } catch(err) {
        console.error(err.response.data.error.message);
        throw new Error(err.response.data.error.message);
    }
});

export const loadCart = createAsyncThunk('cart/', async() => {
    try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/cart`, {withCredentials: true});
        return response.data;
    } catch(err) {
        console.error(err.response.data.error.message);
        throw new Error(err.response.data.error.message);
    }
});

export const updateCart = createAsyncThunk('cart/update', async() => {
    try {
        const response = await axios.patch(`${import.meta.env.VITE_API_URL}/cart/update`, JSON.parse(localStorage.getItem('cartData')), {withCredentials: true});
        return response.data;
    } catch(err) {
        console.error(err.response.data.error.message);
        throw new Error(err.response.data.error.message);
    }
});

const initialState = {
    cartData: JSON.parse(localStorage.getItem('cartData')) || { products: [] },
    isLoadingCart: false,
    cartError: null
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        setError(state, action) {
            state.cartError = action.payload;
        },
        addItem(state, action) {
            const product = action.payload;
            const existingProductIndex = state.cartData.products.findIndex(
                (item) => item.productId === product.productId
            );
            
            if (existingProductIndex >= 0) {
                state.cartData.products[existingProductIndex].quantity += 1;
            } else {
                state.cartData.products.push({ ...product, quantity: 1, isChecked: true });
            }
            
            localStorage.setItem("cartData", JSON.stringify(state.cartData));
        },
        updateItem(state, action) {
            const updatedProduct = action.payload;
            const existingProductIndex = state.cartData.products.findIndex(
                (item) => item.productId === updatedProduct.productId
            );
            
            if (existingProductIndex >= 0) {
                state.cartData.products[existingProductIndex] = updatedProduct;
                localStorage.setItem("cartData", JSON.stringify(state.cartData));
            }
        },
        removeItem(state, action) {
            const id = action.payload;
            if (id) {
                state.cartData.products = state.cartData.products.filter(
                    (item) => item.productId !== id
                );
            } else {
                state.cartData.products = [];
            }
            localStorage.setItem("cartData", JSON.stringify(state.cartData));
        },
        toggleItemCheck(state, action) {
            const { productId, isChecked } = action.payload;
            const productIndex = state.cartData.products.findIndex(
                (item) => item.productId === productId
            );
            if (productIndex >= 0) {
                state.cartData.products[productIndex].isChecked = isChecked;
                localStorage.setItem("cartData", JSON.stringify(state.cartData));
            }
        },
        toggleAllItems(state, action) {
            const isChecked = action.payload;
            state.cartData.products.forEach(product => product.isChecked = isChecked);
            localStorage.setItem("cartData", JSON.stringify(state.cartData));
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(createCart.pending, (state) => {
                state.isLoadingCart = true;
            })
            .addCase(createCart.fulfilled, (state, action) => {
                state.cartData = action.payload.output.payload;
                console.log('new cart created');
                localStorage.setItem("cartData", JSON.stringify(state.cartData));
                state.cartError = null;
                state.isLoadingCart = false;
            })
            .addCase(createCart.rejected, (state, action) => {
                state.isLoadingCart = false;
                state.cartError = action.error.message;
            })
            .addCase(loadCart.pending, (state) => {
                state.isLoadingCart = true;
            })
            .addCase(loadCart.fulfilled, (state, action) => {
                state.cartData = action.payload.output.payload;
                localStorage.setItem("cartData", JSON.stringify(state.cartData));
                state.isLoadingCart = false;
            })
            .addCase(loadCart.rejected, (state, action) => {
                state.isLoadingCart = false;
                state.cartError = action.error.message;
            })
            .addCase(updateCart.pending, (state) => {
                // state.isLoadingCart = true;
            })
            .addCase(updateCart.fulfilled, (state, action) => {
                state.cartData = action.payload.output.payload;
                localStorage.setItem("cartData", JSON.stringify(state.cartData));
                state.isLoadingCart = false;
            })
            .addCase(updateCart.rejected, (state, action) => {
                state.isLoadingCart = false;
                state.cartError = action.error.message;
            });
    }
});

export const { 
    setError, 
    addItem, 
    updateItem, 
    removeItem, 
    toggleItemCheck, 
    toggleAllItems 
} = cartSlice.actions;

export default cartSlice.reducer;