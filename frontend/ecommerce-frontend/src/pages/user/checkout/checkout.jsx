import { useEffect, useState } from "react"
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import { useDispatch, useSelector } from "react-redux"
import priceFormat from "../../../utils/priceFormat"
import { createOrders,setRedirect } from "../../../redux/slices/orders"
import Dropdown from "react-bootstrap/Dropdown"
import Alert from "react-bootstrap/Alert"
import { useLocation, useNavigate } from "react-router-dom"
import Loading from "../../../components/notifPages/loading"

// export interface checkedOutProducts {
//     productId : String;
//     productName : String;
//     productPrice : Number;
//     productUrl : String;
//     quantity : Number;
// }

const Checkout = ()=>{
    const {isLoadingOrders,redirectToPayment,error} = useSelector((state)=>{ return state.orders })
    const user = useSelector((state)=>{return state.user})
    const [productList,setProductsList] = useState([])
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const location = useLocation()

    const [phoneError,setPhoneError] = useState(false)
    const [addressError,setAddressError] = useState(false)
    const [paymentError,setPaymentError] = useState(false)
    const [errorMessage,setErrorMessage] = useState('')

    const [total,setTotal] = useState(0)
    const [productTotal,setProductTotal] = useState(0)
    const [discountTotal,setDiscountTotal] = useState(0)
    const [paymentMethod,setPaymentMethod] = useState('DealDashPay')
    const [shippingFee,setShippingFee] = useState(8000)
    const [shippingMethod,setshippingMethod] = useState("shopee Express")
    //discount=voucher on the backend:
    const [discount,setDiscount] = useState({
        value:0,
        type:'amount'
    })

    useEffect(()=>{
        setProductsList(location.state.products)
    },[])

    useEffect(()=>{
        calculateTotal()
    },[productList])

    useEffect(()=>{
        if(redirectToPayment){
            dispatch(setRedirect(false))
            navigate('/payment')
        }
    },[redirectToPayment])

    useEffect(()=>{
        if(!user.userData.phoneNumber){
            setPhoneError(true)
            setErrorMessage('Please fill in your information details before checking out')
        }
        if(!user.userData.address){
            setAddressError(true)
            setErrorMessage('Please fill in your information details before checking out')
        }
    },[phoneError,addressError])

    useEffect(()=>{
        calculateTotal()
    },[shippingFee,discount])

    const calculateTotal = ()=>{
        let newTotal = 0
        productList.forEach((item)=>{
            console.log(item)
            newTotal+= Number(item.productPrice)*Number(item.quantity)
        })
        setProductTotal(newTotal)

        if(discount.type=='amount') 
            setDiscountTotal(discount.value)
        else if(discount.type=='percentage') 
            setDiscountTotal((discount.value/100)*newTotal)

        setTotal(()=>{
            return (newTotal + shippingFee - discountTotal)
        })
    }

    const createOrder = ()=>{
        let method
        if(paymentMethod == 'DealDashPay')
            method = 'DealDashPAY'
        else if(paymentMethod == 'Credit Card')
            method = 'CREDITCARD'
        else if(paymentMethod == 'PayPal')
            method = 'PAYPAL'
        else{
            setPaymentError(true)
            setErrorMessage('Please choose a payment method before checking out')
        }
        
        if(!phoneError && !addressError && !paymentError){
            const orderData = {
                userId: user.userData._id,
                totalPrice:total,
                address:user.userData.address,
                paymentMethod:method,
                voucherCode:null,
                shippingFee,
                shippingMethod,
                products: productList.map((item)=>{
                    return {
                        productId:item.productId,
                        productName:item.productName,
                        productPrice:item.productPrice,
                        productUrl:item.productUrl,
                        quantity:item.quantity,
                    }
                })
            }
            console.log(orderData)
            
            dispatch(createOrders(orderData))
        }
    }

    const changePaymentMethod = (value)=>{
        setPaymentMethod(value)
    }

    return (<>
    {
        isLoadingOrders ? <Loading /> : 
        <Row className="flex-column py-5 px- px-sm-5 gy-2">
            <Col className='py-4 bg-light'>
                <Row className='align-items-center justify-content-between px-3'>
                    <Col className='col-12 text-start'>
                        {errorMessage && <Alert className="mb-3" variant='danger'>{errorMessage}</Alert>}
                    </Col>
                    <Col className='col-12 text-start'>
                        <small > {user.userData.name}
                            <span className={'px-3 '+(phoneError && 'text-danger')}>
                                {phoneError? 'No phone number' : user.userData.phoneNumber}
                            </span>
                        </small>
                        <hr/>
                    </Col>
                </Row>
                <Row className='align-items-center justify-content-between flex-nowrap px-3'>
                    <Col className='col-9 text-start'>
                        <small className='m-0'>
                            <span className={'px-3 '+(addressError && 'text-danger')}>
                                {addressError? 'No shipping information' : user.userData.address}
                            </span>
                        </small>
                    </Col>
                    <Col className='col-3 text-end ps-3'>
                        <Button>Edit</Button>
                    </Col>
                </Row>
            </Col>

            <Col className='py-4 bg-light' >
                <Row className='align-items-center flex-column justify-content-between px-3 gy-3'>
                {
                    productList?.map((item)=>{
                        return (
                                <Col className='align-items-center px-3' key={item.productId}>
                                    <Row className='justify-content-between'>
                                        <Col className='col-2'>
                                            <img className='object-fit-cover w-100' height={100} width={100} src={item.productUrl} />
                                        </Col>
                                        <Col className='col-6'>
                                            <small className='m-0 text-start'>{item.productName}</small>
                                        </Col>
                                        <Col className='col-2 text-center'>
                                            <small className='m-0'>Rp{priceFormat(item.productPrice)}</small>
                                        </Col>
                                        <Col className='col-2 text-end'>
                                            <small className='m-0'>x {item.quantity}</small>
                                        </Col>
                                    </Row>
                                </Col>
                        )
                    })
                }
                </Row>
            </Col>

            <Col className='py-4 bg-light'>
                <Row className='align-items-center justify-content-between px-3'>
                    <Col className='col-6 text-start'>
                        <span>
                            <small>Payment Method</small>
                        </span>
                    </Col>
                    <Col className='col-6 text-end'>
                        <span>
                            <Dropdown>
                                <Dropdown.Toggle>
                                    {paymentMethod}
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                    <Dropdown.Item onClick={()=>{changePaymentMethod('DealDashPay')}}>DealDashPay</Dropdown.Item>
                                    <Dropdown.Item onClick={()=>{changePaymentMethod('Credit Card')}}>Credit Card</Dropdown.Item>
                                    <Dropdown.Item onClick={()=>{changePaymentMethod('PayPal')}}>PayPal</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </span>
                    </Col>
                </Row>
            </Col>

            <Col className='py-4 bg-light'>
                <Row className='align-items-center justify-content-between px-3'>
                    <Col className='col-12 text-start'>
                        <span>
                            <small>Payment Details</small>
                        </span>
                        <hr/>
                    </Col>
                    <Col className='col-12 text-start'>
                    <Row className='flex-column'>
                        <Col className='d-flex justify-content-between'>
                            <small>Product Subtotal</small>
                            <small>Rp{priceFormat(productTotal)}</small>
                        </Col>
                        <Col className='d-flex justify-content-between'>
                            <small>Shipment Subtotal</small>
                            <small>Rp{priceFormat(shippingFee)}</small>
                        </Col>
                        { 
                            discount && 
                            <Col className='d-flex justify-content-between'>
                                <small>Discount</small>
                                <small>Rp{priceFormat(discountTotal)}</small>
                            </Col> 
                            }
                    </Row>
                        
                    </Col>
                </Row>
            </Col>
            
            <Col className='py-4 bg-light'>
                <Row className='align-items-center justify-content-end px-3'>
            

                    <Col className='col-auto text-end'>
                        <small>Total Payment</small>
                        <p>Rp{priceFormat(total)}</p>
                    </Col>
                    <Col className='col-auto text-center'>
                        <Button onClick={()=>{createOrder()}}>Order</Button>
                    </Col>
                </Row>
            </Col>
        </Row>
    }
    </>)
}

export default Checkout