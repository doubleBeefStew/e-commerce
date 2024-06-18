import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/esm/Col'
import { useEffect, useState } from "react"
import { useSelector,useDispatch } from "react-redux"
import { loadCart,updateCart,addItem,removeItem } from "../../../redux/slices/cart"
import { FaRegTrashCan } from "react-icons/fa6"
import priceFormat from '../../../utils/priceFormat'
import Counter from './components/counter'

const Cart = ()=>{
    const {isLoadingCart,cartData} = useSelector((state)=>{ return state.cart })
    const {userData} = useSelector((state)=>{ return state.user })
    const dispatch = useDispatch()
    const [currentCart,setCurrentCart] = useState()

    useEffect(() => {
    }, [])

    const deleteItem = (itemId)=>{
        dispatch(removeItem(itemId))
    }


    return (<>
    {
        isLoadingCart?
        <p>loading..</p>:
        <Row className="flex-column py-5 px-0 px-sm-5 gy-2">
            {
                cartData?
                <>
                <Col className='py-4 bg-light'>
                    <Row className='align-items-center justify-content-between px-3'>
                        <Col className='col-auto'>
                            <input type='checkbox'></input>
                        </Col>
                        <Col className='col-2 text-start'>
                            <small>Produk</small>
                        </Col>
                        <Col className='col-4'>
                        </Col>
                        <Col className='col-1 text-center'>
                            <small className='m-0'>Price</small>
                        </Col>
                        <Col className='col-3 text-center'>
                            <small className='m-0'>Quantity</small>
                        </Col>
                        <Col className='col-1 text-center'>
                            <FaRegTrashCan color='#ee4d2d' onClick={()=>{}}/>
                        </Col>
                    </Row>
                </Col>
                {
                    cartData.products?.map((item)=>{
                        return (
                            <Col className='py-4 bg-light' key={item.productId}>
                                <Row className='align-items-center justify-content-between px-3'>
                                    <Col className='col-auto'>
                                        <input type='checkbox' />
                                    </Col>
                                    <Col className='col-2 text-center'>
                                        <img className='object-fit-cover w-100' height={100} width={100} src={item.productUrl} />
                                    </Col>
                                    <Col className='col-4'>
                                        <small className='m-0'>{item.productName}</small>
                                    </Col>
                                    <Col className='col-1 text-center'>
                                        <small className='m-0'>Rp{priceFormat(item.productPrice)}</small>
                                    </Col>
                                    <Col className='col-3 text-center'>
                                        <Counter qty={item.quantity} onChange={()=>{}}/>
                                    </Col>
                                    <Col className='col-1 text-center'>
                                        <FaRegTrashCan color='#ee4d2d' onClick={()=>{deleteItem(item.productId)}}/>
                                    </Col>
                                </Row>
                            </Col>)
                    })
                }
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