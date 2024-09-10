import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from "react-bootstrap/Button"
import { useEffect,useState } from 'react'
import { useSelector,useDispatch } from 'react-redux'
import { deleteOrder,deleteOrders,loadOrders } from '../../../../redux/slices/orders'
import priceFormat from '../../../../utils/priceFormat'
import {Link} from 'react-router-dom'

const Orders = ()=>{
    const {ordersData,isLoadingOrders} = useSelector((state)=>{return state.orders})
    const [status,setStatus] = useState('WAITING FOR PAYMENT')
    const dispatch = useDispatch()

    useEffect(()=>{
        dispatch(loadOrders())
    },[])

    const changeFilter = (status)=>{
        setStatus(status)
    }

    const cancelOrder = (id)=>{
        dispatch(deleteOrder(id))
        dispatch(deleteOrders(id))
    }

    return(
    <Row className='flex-column gy-2'>
        {/* Tabs */}
        <Col>
            <Row className='flex-nowrap justify-content-start overflow-auto bg-light'>
                <Col 
                    className={'col-auto me-3 text-nowrap p-3 ' + (status=='ALL' && 'border-bottom border-3')} 
                    onClick={()=>{changeFilter('ALL')}}>
                    <Link className='text-decoration-none text-dark'>All</Link>
                </Col>
                <Col 
                    className={'col-auto me-3 text-nowrap p-3 ' + (status=='WAITING FOR PAYMENT' && 'border-bottom border-3')} 
                    onClick={()=>{changeFilter('WAITING FOR PAYMENT')}}>
                    <Link className='text-decoration-none text-dark'>Waiting for Payment</Link>
                </Col>
                <Col 
                    className={'col-auto me-3 text-nowrap p-3 ' + (status=='PAID' && 'border-bottom border-3')} 
                    onClick={()=>{changeFilter('PAID')}}>
                    <Link className='text-decoration-none text-dark'>Paid</Link>
                </Col>
                <Col className={'col-auto me-3 text-nowrap p-3 ' + (status=='SHIPPING' && 'border-bottom border-3')}  
                    onClick={()=>{changeFilter('SHIPPING')}}>
                    <Link className='text-decoration-none text-dark'>Shipping</Link>
                </Col>
                <Col 
                    className={'col-auto me-3 text-nowrap p-3 ' + (status=='DELIVERED' && 'border-bottom border-3')} 
                    onClick={()=>{changeFilter('DELIVERED')}}>
                    <Link className='text-decoration-none text-dark'>Delivered</Link>
                </Col>
                <Col 
                    className={'col-auto me-3 text-nowrap p-3 ' + (status=='RETURNED' && 'border-bottom border-3')}  
                    onClick={()=>{changeFilter('RETURNED')}}>
                    <Link className='text-decoration-none text-dark'>Returned</Link>
                </Col>
                <Col 
                    className={'col-auto me-3 text-nowrap p-3 ' + (status=='CANCELLED' && 'border-bottom border-3')} 
                    onClick={()=>{changeFilter('CANCELLED')}}>
                    <Link className='text-decoration-none text-dark'>Cancelled</Link>
                </Col>
            </Row>
        </Col>
            {
                // Products
                isLoadingOrders? 'Loading..' :
                ordersData.map((item)=>{
                    return (
                        (item.status == status || status == 'ALL') &&
                        <Col className='bg-light py-4 pt-2' key={item._id}>
                            <Row className='align-items-center justify-content-between align-text-center px-3'>
                                <Col>
                                    <small >{item._id}</small>
                                </Col>
                                <Col className='col-3 text-end align-text-center'>
                                    <small className={
                                            'pe-3 fw-bold '
                                            + 
                                            (item.status == 'WAITING FOR PAYMENT'? 'text-primary' :
                                            item.status == 'PAID' || item.status == 'DELIVERED'? 'text-success' :
                                            item.status == 'SHIPPING'? 'text-warning' : 'text-danger')
                                        }>{item.status}</small>
                                </Col>
                                <hr className='mt-2'/>
                            </Row>
                            {
                                item.products.map((product)=>{
                                    return(
                                    <Row className='align-items-center justify-content-between px-3 mb-2' key={product._id}>
                                        <Col className='col-auto text-center'>
                                            <img className='object-fit-cover' height={100} width={100} src={product.productUrl} />
                                        </Col>
                                        <Col className='col'>
                                            <small className='m-0'>{product.productName}</small><br/>
                                            <small>x {product.quantity || 0}</small>
                                        </Col>
                                        <Col className='col-auto text-center'>
                                            <small className='m-0'>Rp{priceFormat(item.products[0]?.productPrice || 0)}</small>
                                        </Col>
                                    </Row>)
                                })
                            }
                            <hr/>
                            <Row className='align-items-center justify-content-between px-3'>
                                <Col className='col-6 text-start'>
                                    <Button onClick={()=>{cancelOrder(item._id)}}>Cancel</Button>
                                </Col>
                                <Col className='col-6 text-end'>
                                    <small className='m-0'>Total Rp{priceFormat(item.totalPrice || 0)}</small>
                                </Col>
                            </Row>
                        </Col>
                    )
                })
            }
    </Row>
    )
}

export default Orders