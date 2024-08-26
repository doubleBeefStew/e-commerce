import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/esm/Col'
import { useSelector,useDispatch } from "react-redux"
import { removeItem, updateItem, updateCart } from "../../../redux/slices/cart"
import { FaRegTrashCan } from "react-icons/fa6"
import priceFormat from '../../../utils/priceFormat'
import Counter from './components/counter'
import { useEffect, useState } from 'react'
import { Link } from "react-router-dom"


const Cart = ()=>{
    const {isLoadingCart,cartData} = useSelector((state)=>{ return state.cart })
    const dispatch = useDispatch()
    const [total,setTotal] = useState(0)

    useEffect(()=>{
        calculateTotal()
    },[cartData.products])
    
    const checkItem = async (item)=>{
        dispatch(updateItem({
            ...item,
            isChecked: !item.isChecked
        }))
    }

    const checkAllItems = (event)=>{
        console.log(event.target.checked)
        
        cartData.products.forEach((item)=>{
            dispatch(updateItem({
                ...item,
                isChecked: event.target.checked
            }))
        })
    }

    const deleteAllItems = ()=>{
        dispatch(updateCart({...cartData,products:[]}))
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
    
    return (<>
    {
        isLoadingCart?
        <p>loading..</p>:
        <Row className="flex-column py-5 px-0 px-sm-5 gy-2">
            {
                cartData.products?
                <>
                <Col className='py-4 bg-light'>
                    <Row className='align-items-center justify-content-between px-3'>
                        <Col className='col-auto'>
                            <input type='checkbox' onChange={(event)=>{checkAllItems(event)}}></input>
                        </Col>
                        <Col className='col-2 text-start'>
                            <small>Product</small>
                        </Col>
                        <Col className='col-3'>
                        </Col>
                        <Col className='col-2 text-center'>
                            <small className='m-0'>Price</small>
                        </Col>
                        <Col className='col-3 text-center'>
                            <small className='m-0'>Quantity</small>
                        </Col>
                        <Col className='col-1 text-center'>
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
                                    <Col className='col-2 text-center'>
                                        <img className='object-fit-cover w-100' height={100} width={100} src={item.productUrl} />
                                    </Col>
                                    <Col className='col-3'>
                                        <small className='m-0'>{item.productName}</small>
                                    </Col>
                                    <Col className='col-2 text-center'>
                                        <small className='m-0'>Rp{priceFormat(item.productPrice)}</small>
                                    </Col>
                                    <Col className='col-3'>
                                    <Row className='justify-content-center'>
                                        <Col className='col-auto'>
                                            <Counter product={item}/>
                                        </Col>
                                    </Row>
                                    </Col>
                                    <Col className='col-1 text-center'>
                                        <FaRegTrashCan color='#ee4d2d' onClick={()=>{dispatch(removeItem(item.productId))}}/>
                                    </Col>
                                </Row>
                            </Col>)
                    })
                }
                <Col className='p-4 bg-light'>
                    <Row className='align-items-center justify-content-end px-3'>
                        <Col className='col-auto text-start'>
                            <p className="m-0">Total: <small>Rp</small>{priceFormat(total)}</p>
                        </Col>
                        <Col className='col-auto text-center'>
                            <Link className="w-100 btn btn-primary" to={'/'}>Checkout</Link>
                        </Col>
                    </Row>
                </Col>
                </> : 
                <Col>
                    <p>Cart is Empty!</p>
                </Col>
            }
        </Row>
    }
    </>)
}

export default Cart