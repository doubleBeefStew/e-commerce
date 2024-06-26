import { useEffect, useState } from 'react'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { useParams,useNavigate } from 'react-router-dom'
import axios from 'axios'
import { addItem, loadCart, updateCart } from '../../../redux/slices/cart'
import { useDispatch,useSelector } from 'react-redux'
import env from '../../../../../env'
import ProductCarousel from '../../../components/Carousel/productCarousel'
import priceFormat from '../../../utils/priceFormat'

const ProductDetail = () => {
    const { id } = useParams()
    const [productData,setProductData] = useState(null)
    const [isLoading,setIsLoading] = useState(true)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const {cartData} = useSelector((state)=>{
        return state.cart
    })

    const {userData} = useSelector((state)=>{
        return state.user
    })

    useEffect(()=>{
        const getProductData = async ()=>{
            setIsLoading(true)
            const response = await axios.get(`${env.API_URL}/products/${id}`,{withCredentials:true})
            setProductData(response.data.output.payload)
            setIsLoading(false)
        }
        getProductData()
    },[])

    const addtoCart = async(product)=>{
        if(!userData){
            navigate('/login')
        }else{
            dispatch(addItem({
                "productId":product._id,
                "productUrl":product.images[0].url,
                "productName":product.name,
                "productPrice":product.initialPrice,
                "quantity":1
            }))
            // TODO: make react lottie to confirm add cart
            console.log(cartData.products)
            const response = await axios.patch(`${env.API_URL}/cart/update`,cartData.products,{withCredentials:true})
        }

    }

    return (
        <Row className="py-5 px-0 px-sm-5 justify-content-center">
            {
                isLoading ? 
                    <p>loading..</p> :
                    <Row className='bg-white p-3 gx-5'>
                        <Col className='col-12 col-md-5 pb-5 px-0'>
                            <ProductCarousel images={productData.images}/>
                        </Col>
                        <Col className='d-flex flex-column justify-content-between col-12 col-md-7'>
                            <div>
                                <h5>{productData.name}</h5>
                                <h1 className='text-orange'>Rp{priceFormat(productData.initialPrice)}</h1>
                                <small>{productData.description}</small>
                            </div>
                            <Row>
                                <Col>
                                    <button 
                                        className='w-100 btn btn-outline-primary'
                                        onClick={()=>{addtoCart(productData)}}
                                    >Add to Basket</button>
                                </Col>
                                <Col>
                                    <button className='w-100 btn btn-primary'>Buy Now</button>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
            }
        </Row>
    )
}

export default ProductDetail