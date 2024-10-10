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
        <div className="d-flex align-items-center">
            <div className="input-group input-group-sm">
                <div className="input-group-prepend">
                    <button 
                        type="button" 
                        className="btn btn-outline-secondary"
                        onClick={handleDecrement}
                    >
                        -
                    </button>
                </div>
                <input 
                    value={product.quantity}
                    type="number" 
                    className="form-control text-center"
                    style={{ width: '50px', minWidth: '50px' }}
                    onChange={handleChange}
                    min="1"
                />
                <div className="input-group-append">
                    <button 
                        type="button" 
                        className="btn btn-outline-secondary"
                        onClick={handleIncrement}
                    >
                        +
                    </button>
                </div>
            </div>
        </div>
    );
};

export default React.memo(Counter);