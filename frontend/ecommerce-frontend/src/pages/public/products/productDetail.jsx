import { useEffect, useState } from 'react'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/esm/Col'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import env from '../../../../../env'
import ProductCarousel from '../../../components/Carousel/productCarousel'

const ProductDetail = () => {
    const { id } = useParams()
    const [productData,setProductData] = useState(null)
    const [isLoading,setIsLoading] = useState(true)

    useEffect(()=>{
        const getProductData = async ()=>{
            setIsLoading(true)
            const response = await axios.get(`${env.API_URL}/products/${id}`,{withCredentials:true})
            setProductData(response.data.output.payload)
            console.log(productData)
            setIsLoading(false)
        }
        getProductData()
    },[])

    return (
        <Row className="py-5 px-0 px-sm-5 justify-content-center">
            {
                isLoading ? 
                    <p>loading..</p> :
                    <Row className='bg-white p-3 gx-5'>
                        <Col className='col-12 col-md-5 pb-5 px-0'>
                            <ProductCarousel images={productData.images}/>
                        </Col>
                        <Col className='col-12 col-md-7'>
                            <h5>{productData.name}</h5>
                            <h1>{productData.initialPrice}</h1>
                            <p>{productData.description}</p>
                        </Col>
                    </Row>
            }
        </Row>
    )
}

export default ProductDetail