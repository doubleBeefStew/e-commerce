import { useEffect, useState } from 'react'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/esm/Col'
import { useParams } from 'react-router-dom'
import Image from "react-bootstrap/Image"
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
            setIsLoading(false)
        }
        getProductData()
    },[])

    return (
        <Row className="vh-auto py-5 px-2 px-sm-5">
            {
                isLoading ? 
                    <p>loading..</p> :
                    <>
                        <Col>
                        {console.log(productData.images)}
                            <ProductCarousel images={productData.images}/>
                        </Col>
                        <Col></Col>
                    </>
            }
        </Row>
    )
}

export default ProductDetail