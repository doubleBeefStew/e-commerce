import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loadProducts } from '../../../redux/slices/products'
import ProductCard from '../../../components/productCard/productCard'
import Loading from '../../../components/notifPages/loading'
import { useSearchParams } from 'react-router-dom'
import NoResult from '../../../errors/noResult'

const Products = ()=>{
    const dispatch = useDispatch()
    const {isLoadingProducts,productsData} = useSelector((state)=>{return state.products})
    const [params] = useSearchParams()
    let searchData

    useEffect(()=>{
        searchData = {
            keyword:params.get('keyword'),
            sort:params.get('sort') || 'arc',
        }
        
        dispatch(loadProducts(searchData))
    },[params])
    
    return (<>
    {
        isLoadingProducts ? <Loading /> : 
        (productsData.length > 0 ?
        <Row className='vh-auto py-5 px-2 px-sm-5'>
            {
                productsData.map((item)=>{
                    return (<Col className='col-6 col-md-4 col-lg-3 col-xl-2 py-2' key={item._id}>
                            <ProductCard product={item}></ProductCard>
                    </Col>)
                })
            }
        </Row> :
        <Row className='vh-auto py-5 px-2 px-sm-5'>
            <NoResult/>
        </Row>)
    }
    </>)
}

export default Products