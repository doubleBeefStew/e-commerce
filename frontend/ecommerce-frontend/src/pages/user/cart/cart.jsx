import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/esm/Col'
import { useSelector,useDispatch } from "react-redux"
import { removeItem, updateItem } from "../../../redux/slices/cart"
import { FaRegTrashCan } from "react-icons/fa6"
import priceFormat from '../../../utils/priceFormat'
import Counter from './components/counter'
import { useEffect, useState } from 'react'


const Cart = ()=>{
    const {isLoadingCart,cartData} = useSelector((state)=>{ return state.cart })
    const dispatch = useDispatch()
    const [total,setTotal] = useState(0)

    useEffect(()=>{
        cartData.products?.map((item)=>{
            dispatch(updateItem({
                ...item,
                isChecked: false
            }))
        })
    },[])

    useEffect(()=>{
        calculateTotal()
    },[cartData.products])
    
    const checkItem = async (item)=>{
        dispatch(updateItem({
            ...item,
            isChecked: !item.isChecked
        }))
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
                cartData?
                <>
                <Col className='py-4 bg-light'>
                    <Row className='align-items-center justify-content-between px-3'>
                        <Col className='col-auto'>
                            <input type='checkbox'></input>
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
                            <h6 className="m-0">Total: {total}</h6>
                        </Col>
                        <Col className='col-auto text-center'>
                            <button className='w-100 btn btn-primary' onClick={()=>{console.log(total)}}>
                                Checkout
                            </button>
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