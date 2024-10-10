import React, { useCallback } from 'react';
import { useDispatch } from "react-redux";
import { removeItem, updateItem, updateCart } from "../../../../redux/slices/cart";

const Counter = ({ product }) => {
    const dispatch = useDispatch();

    const handleDecrement = useCallback(() => {
        if (product.quantity <= 1) {
            dispatch(removeItem(product.productId));
        } else {
            dispatch(updateItem({
                ...product,
                quantity: product.quantity - 1,
            }));
        }
        dispatch(updateCart());
    }, [dispatch, product]);

    const handleIncrement = useCallback(() => {
        dispatch(updateItem({
            ...product,
            quantity: product.quantity + 1,
        }));
        dispatch(updateCart());
    }, [dispatch, product]);

    const handleChange = useCallback((event) => {
        const newQuantity = parseInt(event.target.value, 10) || 1;
        dispatch(updateItem({
            ...product,
            quantity: newQuantity,
        }));
        dispatch(updateCart());
    }, [dispatch, product]);

    return (
        <div className="input-group">
            <span className="input-group-btn">
                <button type="button" className="btn btn-default btn-number" onClick={handleDecrement}>
                    <span className="">-</span>
                </button>
            </span>
            <input 
                value={product.quantity}
                type="number" 
                className="border border-0 text-center form-control-small" 
                style={{ 'width': '30px' }}
                onChange={handleChange}
                min="1"
            />
            <span className="input-group-btn">
                <button type="button" className="btn btn-default btn-number" onClick={handleIncrement}>
                    <span className="">+</span>
                </button>
            </span>
        </div>
    );
};

export default React.memo(Counter);