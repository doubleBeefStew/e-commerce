import { useEffect, useState } from 'react'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { useParams,useNavigate } from 'react-router-dom'
import axios from 'axios'
import { addItem, updateCart } from '../../../redux/slices/cart'
import { useDispatch,useSelector } from 'react-redux'
import ProductCarousel from '../../../components/Carousel/productCarousel'
import priceFormat from '../../../utils/priceFormat'
import React from 'react'
import Loading from '../../../components/notifPages/loading'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

const ProductDetail = () => {
    const { id } = useParams()
    const [productData,setProductData] = useState(null)
    const [isLoading,setIsLoading] = useState(true)
    const [amount,setAmount] = useState(1)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const {isLoadingCart} = useSelector((state)=>{ return state.cart })
    const {userData} = useSelector((state)=>{ return state.user })

    useEffect(()=>{
        const getProductData = async ()=>{
            setIsLoading(true)
            const response = await axios.get(`${import.meta.env.VITE_API_URL}/products/${id}`,{withCredentials:true})
            setProductData(response.data.output.payload)
            setIsLoading(false)
        }
        getProductData()
    },[])

    useEffect(()=>{
    },[isLoadingCart])

    const addtoCart = async(product)=>{
        if(!userData){
            navigate('/login')
        }else{
            dispatch(addItem({
                "productId":product._id,
                "productUrl":product.images[0].url,
                "productName":product.name,
                "productPrice":product.initialPrice,
                "quantity":1,
                "isChecked":false
            }))

            dispatch(updateCart())
            toast('Added to cart!')
        }

    }

    const buyNow = ()=>{
        const product = {
            productId : productData._id,
            productName : productData.name,
            productPrice : productData.initialPrice,
            productUrl : productData.images[0].url,
            quantity : amount,
        }
        
        navigate('/checkout',{state:{
            products:[product]
        }})
    }

    return (<>
        
        {
            isLoading ? <Loading /> : 
            <>
                
                <Row className="py-5 px-0 px-sm-5 justify-content-center">
                    <Row className='bg-white p-3 gx-5'>
                        <Col className='col-12 col-md-5 px-0'>
                            <ProductCarousel images={productData.images}/>
                        </Col>
                        <Col className='d-flex flex-column justify-content-between col-12 col-md-7'>
                            <Row>
                                <Col>
                                    <h5>{productData.name}</h5>
                                    <h1 className='text-orange'>Rp{priceFormat(productData.initialPrice)}</h1>
                                    <small>{productData.description}</small>
                                </Col>
                            </Row>
                            <Row className='gy-3'>
                                <Col className='col-12 text-center'>
                                    <small className={ productData.stock < 1 ? 'text-danger' : 'text-muted' }>
                                        {
                                            productData.stock < 1 ? 'This product is out of stock.' : (productData.stock+' units left') 
                                        }
                                    </small>
                                </Col>
                                <Col>
                                    <button 
                                        className='w-100 btn btn-outline-primary'
                                        onClick={()=>{addtoCart(productData)}}
                                        disabled = { productData.stock < 1 }
                                    >Add to Basket</button>
                                </Col>
                                <Col>
                                    <button 
                                        className='w-100 btn btn-primary' 
                                        onClick={ ()=>{buyNow()} }
                                        disabled = { productData.stock < 1 }
                                    >Buy Now</button>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Row>
            </>
        }
    </>)
}

export default ProductDetail