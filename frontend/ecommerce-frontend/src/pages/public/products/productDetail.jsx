import { useEffect, useState } from 'react'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { loadCart, updateCart } from '../../../redux/slices/cart'
import { useDispatch,useSelector } from 'react-redux'
import env from '../../../../../env'
import ProductCarousel from '../../../components/Carousel/productCarousel'

const ProductDetail = () => {
    const { id } = useParams()
    const [productData,setProductData] = useState(null)
    const [isLoading,setIsLoading] = useState(true)
    const dispatch = useDispatch()

    const {cartData} = useSelector((state)=>{
        return state.cart
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

    const addtoBasket = async(product)=>{
        const products = [...cartData.products,{
            "productId":product._id,
            "productName":product.name,
            "productPrice":product.initialPrice,
            "quantity":1
        }]
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
                                <h1>{productData.initialPrice}</h1>
                                <p>{productData.description}</p>
                            </div>
                            <Row>
                                <Col>
                                    <button 
                                        className='w-100 btn btn-outline-primary'
                                        onClick={()=>{addtoBasket(productData)}}
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