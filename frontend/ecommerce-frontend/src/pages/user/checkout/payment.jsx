import Col from "react-bootstrap/Col"
import Row from "react-bootstrap/Row"
import Container from "react-bootstrap/Container"
import { React,useEffect, useState } from "react"
import { PayPalButtons } from "@paypal/react-paypal-js"
import { useDispatch, useSelector } from "react-redux"
import PinField from "react-pin-field"
import { useNavigate } from "react-router-dom"
import { sheepopayPayment, setRedirect } from "../../../redux/slices/payment"
import { removeItem, updateCart } from "../../../redux/slices/cart"
import axios from "axios"
import env from "../../../../../env"


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
            const data = { orderId:currentCheckout._id, pin }
            dispatch(sheepopayPayment(data))
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
                            <PayPalButtons
                                style={{
                                    shape: "rect",
                                    layout: "vertical",
                                    color: "gold",
                                    label: "paypal",
                                }} 
                                createOrder={async ()=>{
                                    try{
                                        const response = await axios.post(`${env.API_URL}/payment/paypal/create`,currentCheckout._id,{withCredentials:true})
                                        
                                        const id = response.data.id
                                        if(id)
                                            return id
                                        else
                                            throw new Error("Missing order Id")
                                    }catch(err){
                                        console.log(err)
                                        throw err
                                    }
                                }}
                                onApprove={async(data,actions)=>{
                                    try {
                                        const response = await axios.post(`${env.API_URL}/payment/paypal/capture`,{orderID:data.orderID},{withCredentials:true})
                                        console.log(response)

                                        const orderData = response.orderData
                                        const errorDetail = orderData?.details?.[0]
                                        if (errorDetail?.issue === "INSTRUMENT_DECLINED") {
                                            // (1) Recoverable INSTRUMENT_DECLINED -> call actions.restart()
                                            // recoverable state, per https://developer.paypal.com/docs/checkout/standard/customize/handle-funding-failures/
                                            return actions.restart();
                                        } else if (errorDetail) {
                                            // (2) Other non-recoverable errors -> Show a failure message
                                            throw new Error(
                                                `${errorDetail.description} (${orderData.debug_id})`
                                            );
                                        } else {
                                            // (3) Successful transaction -> Show confirmation or thank you message
                                            // Or go to another URL:  actions.redirect('thank_you.html');
                                            const transaction =
                                                orderData.purchase_units[0].payments.captures[0];
                                            console.log( "Capture result", orderData, JSON.stringify(orderData, null, 2))
                                        }
                                    } catch (err) {
                                        console.log(err)
                                        throw err
                                    }
                                }}
                            />
                        </div>
                    </>
                ) :
                currentCheckout.paymentMethod=='CREDITCARD' ? (
                    <>
                        <h1>CREDIT CARD</h1>
                        <br/>
                        <p>We apologize, currently credit card payment is not available on Sheepo!</p>
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