import Col from "react-bootstrap/Col"
import Row from "react-bootstrap/Row"
import Container from "react-bootstrap/Container"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import PinField from "react-pin-field"
import { useNavigate } from "react-router-dom"
import { createPayment,setLoadingPayment, setRedirect } from "../../../redux/slices/payment"
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js"



const Payment = ()=>{
    const {currentCheckout} = useSelector((state)=>{ return state.orders })
    const {isLoadingPayment,redirect,error} = useSelector((state)=>{ return state.payment })
    const [pin,setPin] = useState('')
    const pinLength = 6
    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(()=>{
        if(redirect){
            dispatch(setRedirect(false))
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
                                onChange={changePin}
                            />
                        </div>
                    </>
                ) :
                currentCheckout.paymentMethod=='PAYPAL' ? (
                    <>
                    <h1>PAYPAL</h1>
                    <PayPalScriptProvider options={initialOptions}>
                    <PayPalButtons
                        style={{
                            shape: "rect",
                            layout: "vertical",
                            color: "gold",
                            label: "paypal",
                        }} 
                        createOrder={async () => {
                            try {
                                const response = await fetch("/api/orders", {
                                    method: "POST",
                                    headers: {
                                        "Content-Type": "application/json",
                                    },
                                    // use the "body" param to optionally pass additional order information
                                    // like product ids and quantities
                                    body: JSON.stringify({
                                        cart: [
                                            {
                                                id: "YOUR_PRODUCT_ID",
                                                quantity: "YOUR_PRODUCT_QUANTITY",
                                            },
                                        ],
                                    }),
                                });

                                const orderData = await response.json();

                                if (orderData.id) {
                                    return orderData.id;
                                } else {
                                    const errorDetail = orderData?.details?.[0];
                                    const errorMessage = errorDetail
                                        ? `${errorDetail.issue} ${errorDetail.description} (${orderData.debug_id})`
                                        : JSON.stringify(orderData);

                                    throw new Error(errorMessage);
                                }
                            } catch (error) {
                                console.error(error);
                                setMessage(
                                    `Could not initiate PayPal Checkout...${error}`
                                );
                            }
                        }}
                        onApprove={async (
                            data,
                            actions
                        ) => {
                            try {
                                const response = await fetch(
                                    `/api/orders/${data.orderID}/capture`,
                                    {
                                        method: "POST",
                                        headers: {
                                            "Content-Type": "application/json",
                                        },
                                    }
                                );

                                const orderData = await response.json();
                                // Three cases to handle:
                                //   (1) Recoverable INSTRUMENT_DECLINED -> call actions.restart()
                                //   (2) Other non-recoverable errors -> Show a failure message
                                //   (3) Successful transaction -> Show confirmation or thank you message

                                const errorDetail = orderData?.details?.[0];

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
                                        orderData.purchase_units[0].payments
                                            .captures[0];
                                    setMessage(
                                        `Transaction ${transaction.status}: ${transaction.id}. See console for all available details`
                                    );
                                    console.log(
                                        "Capture result",
                                        orderData,
                                        JSON.stringify(orderData, null, 2)
                                    );
                                }
                            } catch (error) {
                                console.error(error);
                                setMessage(
                                    `Sorry, your transaction could not be processed...${error}`
                                );
                            }
                        }} 
                    />
                    </PayPalScriptProvider>
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