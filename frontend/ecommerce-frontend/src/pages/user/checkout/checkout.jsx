import { useEffect, useState } from "react"
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import { Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import priceFormat from "../../../utils/priceFormat"
import { createOrder } from "../../../../../../backend/controllers/orders"
import { createOrders } from "../../../redux/slices/order"

const Cart = ()=>{
    const {isLoadingCart,cartData} = useSelector((state)=>{ return state.cart })
    const user = useSelector((state)=>{return state.user})
    const dispatch = useDispatch()

    const [phoneError,setPhoneError] = useState('')
    const [addressError,setAddressError] = useState('')
    const [errorMessage,setErrorMessage] = useState('')

    const [total,setTotal] = useState(0)
    const [shippingFee,setShippingFee] = useState(8000)
    const [shippingMethod,setshippingMethod] = useState("shopee Express")
    const [discount,setDiscount] = useState({
        value:8000,
        type:'amount'
    })

    useEffect(()=>{
        console.log(user)
        
        if(!user.userData.phoneNumber){
            setPhoneError(true)
            setErrorMessage('Please fill in your phone number before payment')
        }
        if(!user.userData.address){
            setAddressError(true)
            setErrorMessage('Please fill in shipment address before payment')
        }
    },[phoneError,addressError])


    useEffect(()=>{
        console.log(user)
        calculateTotal()
    },[shippingFee,discount])

    const calculateTotal = ()=>{
        let newTotal = 0
        let discountAmount = 0
        cartData.products?.forEach((item)=>{
            if(item.isChecked){
                newTotal+= Number(item.productPrice)*Number(item.quantity)
            }
        })

        if(discount.type=='amount') 
            discountAmount=discount.value
        else if(discount.type=='percentage') 
            discountAmount=(discount.value/100)*newTotal

        setTotal(()=>{
            return (newTotal + shippingFee - discountAmount)
        })
    }

    const createOrder = ()=>{
        const orderData = {
            userId: user.userData._id,
            totalPrice:total,
            address:user.userData.address,
            products:cartData.products.filter((item)=>{return item.isChecked==true})
        }

        dispatch(createOrders(orderData))
    }

    return (<>
    {
        isLoadingCart?
        <p>loading..</p>:
        <Row className="flex-column py-5 px- px-sm-5 gy-2">
            <Col className='py-4 bg-light'>
                <Row className='align-items-center justify-content-between px-3'>
                    <Col className='col-12 text-start'>
                        <small > {user.userData._id}
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
                    cartData.products?.map((item)=>{
                        if(item.isChecked){
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
                        }
                    })
                }
                </Row>
            </Col>
            
            <Col className='py-3 px-4 bg-light'>
                <Row className='align-items-center justify-content-end'>
                    <Col className='col-auto text-end'>
                        <small>Total Payment</small>
                        <br/>
                        <small>Rp{priceFormat(total)}</small>
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

export default Cart