import React, { useMemo, useCallback } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { FaRegTrashCan } from "react-icons/fa6";
import { removeItem, updateCart, toggleItemCheck, toggleAllItems } from "../../../redux/slices/cart";
import priceFormat from '../../../utils/priceFormat';
import Counter from './components/counter';
import Loading from '../../../components/notifPages/loading';
import EmptyCart from '../../../errors/emptyCart';

const Cart = () => {
    const { isLoadingCart, cartData } = useSelector((state) => state.cart);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const checkedProducts = useMemo(() => 
        cartData.products.filter(item => item.isChecked),
    [cartData.products]);

    const total = useMemo(() => 
        checkedProducts.reduce((sum, item) => sum + Number(item.productPrice) * Number(item.quantity), 0),
    [checkedProducts]);

    const handleCheckout = useCallback(() => {
        if (checkedProducts.length > 0) {
            navigate('/checkout', { state: { products: checkedProducts } });
        }
    }, [checkedProducts, navigate]);

    const handleCheckItem = useCallback((item) => {
        dispatch(toggleItemCheck({ productId: item.productId, isChecked: !item.isChecked }));
        dispatch(updateCart());
    }, [dispatch]);

    const handleCheckAllItems = useCallback((event) => {
        const isChecked = event.target.checked;
        dispatch(toggleAllItems(isChecked));
        dispatch(updateCart());
    }, [dispatch]);

    const handleDeleteAllItems = useCallback(() => {
        dispatch(removeItem());
        dispatch(updateCart());
    }, [dispatch]);

    if (isLoadingCart) return <Loading />;
    if (cartData.products.length === 0) return <EmptyCart />;

    return (
        <Row className="flex-column py-5 px-0 px-sm-5 gy-2">
            <Col className='py-4 bg-light'>
                <Row className='align-items-center justify-content-between px-3'>
                    <Col className='col-auto'>
                        <input 
                            type='checkbox' 
                            onChange={handleCheckAllItems}
                            checked={cartData.products.every(item => item.isChecked)}
                        />
                    </Col>
                    <Col className='col text-start'>
                        <small>Product</small>
                    </Col>
                    <Col className='col-3'>
                    </Col>
                    <Col className='col text-center'>
                        <small className='m-0'>Price</small>
                    </Col>
                    <Col className='col text-center'>
                        <small className='m-0'>Quantity</small>
                    </Col>
                    <Col className='col-auto text-center'>
                        <FaRegTrashCan color='#ee4d2d' onClick={handleDeleteAllItems}/>
                    </Col>
                </Row>
            </Col>
            {cartData.products.map((item) => (
                <Col className='py-4 bg-light' key={item.productId}>
                    <Row className='align-items-center justify-content-between px-3'>
                        <Col className='col-auto'>
                            <input 
                                type='checkbox' 
                                checked={item.isChecked} 
                                onChange={() => handleCheckItem(item)}
                            />
                        </Col>
                        <Col className='col-auto text-center'>
                            <img className='object-fit-cover' height={100} width={100} src={item.productUrl} alt={item.productName} />
                        </Col>
                        <Col className='col'>
                            <small className='m-0'>{item.productName}</small>
                        </Col>
                        <Col className='col-auto text-center'>
                            <small className='m-0'>Rp{priceFormat(item.productPrice)}</small>
                        </Col>
                        <Col className='col-3'>
                            <Row className='justify-content-center'>
                                <Col className='col-auto'>
                                    <Counter product={item} />
                                </Col>
                            </Row>
                        </Col>
                        <Col className='col-auto text-center'>
                            <FaRegTrashCan 
                                color='#ee4d2d' 
                                onClick={() => {
                                    dispatch(removeItem(item.productId));
                                    dispatch(updateCart());
                                }}
                            />
                        </Col>
                    </Row>
                </Col>
            ))}
            <Col className='p-4 bg-light'>
                <Row className='align-items-center justify-content-end px-3'>
                    <Col className='col-auto text-end'>
                        <small>Total Payment</small>
                        <br/>
                        <small>Rp{priceFormat(total)}</small>
                    </Col>
                    <Col className='col-auto text-center'>
                        <Button 
                            disabled={checkedProducts.length === 0}
                            className="w-100 btn btn-primary" 
                            onClick={handleCheckout}
                        >
                            Checkout
                        </Button>
                    </Col>
                </Row>
            </Col>
        </Row>
    );
};

export default React.memo(Cart);