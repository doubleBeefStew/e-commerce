import Col from "react-bootstrap/Col"
import Row from "react-bootstrap/Row"
import Container from "react-bootstrap/Container"
import { React,useEffect, useState } from "react"
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js"
import { useDispatch, useSelector } from "react-redux"
import PinField from "react-pin-field"
import { useNavigate } from "react-router-dom"
import { createPayment, setRedirect } from "../../../redux/slices/payment"
import { removeItem, updateCart } from "../../../redux/slices/cart"


const Payment = ()=>{
    const {isLoadingCart,cartData} = useSelector((state)=>{ return state.cart })
    const {currentCheckout} = useSelector((state)=>{ return state.orders })
    const {isLoadingPayment,redirect,error} = useSelector((state)=>{ return state.payment })
    const [pin,setPin] = useState('')
    const pinLength = 6
    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(()=>{
        if(redirect){
            dispatch(setRedirect(false))
            clearCheckedItems()
            navigate('/payment/success')
        }
    },[redirect])

    useEffect(()=>{
        if(pin.length == pinLength){
            const data = {data:currentCheckout,pin}
            dispatch(createPayment(data))
        }
    },[pin])

    const changePin = (value)=>{
        setPin(value)
    }

    const clearCheckedItems = ()=>{
        cartData.products.forEach((item)=>{
            item.isChecked &&
            dispatch(removeItem(item.productId))
        })
        dispatch(updateCart())
    }

    return (<>
        <Container>
        <Row className='vh-100'>
            <Col className='d-flex flex-column align-items-center justify-content-center text-center'>
            {
                currentCheckout.paymentMethod=='SHEEPOPAY' ?  (
                    <>
                        <h1>PIN</h1>
                        <br/>
                        <div className='d-flex'>
                            <PinField
                                className="field-a"
                                length={pinLength}
                                validate={/^[0-9]$/}
                                onChange={(value)=>{ setPin(value) }}
                            />
                        </div>
                    </>
                ) :
                currentCheckout.paymentMethod=='PAYPAL' ? (
                    <>
                        <h1>PAYPAL</h1>
                        <br/>
                        <div className='d-flex'>
                            <p>Please wait..</p>
                        </div>
                    </>
                ) :
                currentCheckout.paymentMethod=='CREDITCARD' ? (
                    <>
                        <h1>CREDIT CARD</h1>
                        <br/>
                        <p>We Apologize, currently credit card payment is not available on Sheepo!</p>
                    </>
                ) : (
                    <>
                        <h1>Oops..</h1>
                        <br/>
                        <p>Something went wrong, please try again later!</p>
                    </>
                )
            }
                
            </Col>
        </Row>
        </Container>
    </>)
}

export default Payment