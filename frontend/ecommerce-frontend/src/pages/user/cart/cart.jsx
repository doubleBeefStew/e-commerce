import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { useSelector,useDispatch } from "react-redux"
import { removeItem, updateItem, updateCart } from "../../../redux/slices/cart"
import { FaRegTrashCan } from "react-icons/fa6"
import priceFormat from '../../../utils/priceFormat'
import Counter from './components/counter'
import { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom"
import Button from 'react-bootstrap/Button'
import Loading from '../../../components/notifPages/loading'
import EmptyCart from '../../../errors/emptyCart'

const Cart = ()=>{
    const {isLoadingCart,cartData} = useSelector((state)=>{ return state.cart })
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [total,setTotal] = useState(0)
    const [checkoutProcess,setCheckoutProcess] = useState(false)
    const [products,setProducts] = useState([])


    useEffect(()=>{
        calculateTotal()
    },[cartData.products])

    useEffect(()=>{
        
        if(checkoutProcess && products.length > 0){
                navigate('/checkout',{state:{products}})
        }else{
            console.log('please choose items to checkout')
            setCheckoutProcess(false)
        }
    },[checkoutProcess])
    
    const checkItem = async (item)=>{
        dispatch(updateItem({
            ...item,
            isChecked: !item.isChecked
        }))
        dispatch(updateCart())
    }

    const checkAllItems = (event)=>{
        cartData.products.forEach((item)=>{
            dispatch(updateItem({
                ...item,
                isChecked: event.target.checked
            }))
        })
        dispatch(updateCart())
    }

    const deleteAllItems = async ()=>{
        dispatch(removeItem())
        dispatch(updateCart())
    }

    const calculateTotal = ()=>{
        let newTotal = 0
        cartData.products?.forEach((item)=>{
            if(item.isChecked){
                newTotal+= Number(item.productPrice)*Number(item.quantity)
            }
        })
        setTotal(()=>{
            return newTotal
        })
    }

    //TODO:validate when no item is checked, dont continue the process
    const checkOut = ()=>{
        const updatedProducts = cartData.products?.filter((item) => item.isChecked).map((item)=>{
            return {
                productId : item.productId,
                productName : item.productName,
                productPrice : item.productPrice,
                productUrl : item.productUrl,
                quantity : item.quantity
            }
        })
        setProducts(updatedProducts)
        setCheckoutProcess(true)
    }
    
    return (<>
    {
        isLoadingCart? <Loading /> :
        cartData.products.length > 0 ?
        <Row className="flex-column py-5 px-0 px-sm-5 gy-2">
            <Col className='py-4 bg-light'>
                <Row className='align-items-center justify-content-between px-3'>
                    <Col className='col-auto'>
                        <input type='checkbox' onChange={(event)=>{checkAllItems(event)}}></input>
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
                        <FaRegTrashCan color='#ee4d2d' onClick={()=>{deleteAllItems()}}/>
                    </Col>
                </Row>
            </Col>
            {
                cartData.products?.map((item)=>{
                    return (
                        <Col className='py-4 bg-light' key={item.productId}>
                            <Row className='align-items-center justify-content-between px-3'>
                                <Col className='col-auto'>
                                    <input type='checkbox' checked={item.isChecked} onChange={()=>{
                                        checkItem(item)
                                        calculateTotal()
                                    }}/>
                                </Col>
                                <Col className='col-auto text-center'>
                                    <img className='object-fit-cover' height={100} width={100} src={item.productUrl} />
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
                                        <Counter product={item}/>
                                    </Col>
                                </Row>
                                </Col>
                                <Col className='col-auto text-center'>
                                    <FaRegTrashCan color='#ee4d2d' onClick={async ()=>{
                                        dispatch(removeItem(item.productId))
                                        dispatch(updateCart())
                                        }
                                    }/>
                                </Col>
                            </Row>
                        </Col>)
                })
            }
            <Col className='p-4 bg-light'>
                <Row className='align-items-center justify-content-end px-3'>
                    <Col className='col-auto text-end'>
                        <small>Total Payment</small>
                        <br/>
                        <small>Rp{priceFormat(total)}</small>
                    </Col>
                    <Col className='col-auto text-center'>
                        <Button 
                            className="w-100 btn btn-primary" 
                            state={{products}}
                            onClick={()=>{checkOut()}}
                        >Checkout</Button>
                    </Col>
                </Row>
            </Col>
        </Row> :
        <Row className='vh-auto py-5 px-2 px-sm-5'>
            <EmptyCart/>
        </Row>
    }
    </>)
}

export default Cart