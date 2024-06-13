import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loadProducts } from '../../../redux/slices/products'
import ProductCard from '../../../components/productCard/productCard'

const Products = ()=>{
    const dispatch = useDispatch()
    const products = useSelector((state)=>{return state.products})

    useEffect(()=>{
        !products.productsData && (dispatch(loadProducts()))
    },[])
    
    return (
        <Row className='vh-auto py-5 px-2 px-sm-5'>
        {
            products.isLoadingProducts? 'Loading':
            products.productsData.map((item)=>{
                return (<Col className='col-6 col-md-4 col-lg-3 col-xl-2 py-2' key={item._id}>
                        <ProductCard product={item}></ProductCard>
                </Col>)
            })
        }
        </Row>
)
}

export default Products