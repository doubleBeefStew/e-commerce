import Card from 'react-bootstrap/Card'
import { Link } from 'react-router-dom'
import styles from './productCard.module.css'
import { MdStarRate } from "react-icons/md"
import priceFormat from '../../utils/priceFormat'

//<MdStarHalf />

const ProductCard = ({product})=>{
    return (
        <Link className='text-decoration-none' to={`/products/${product._id}`}>
            <Card>
                <Card.Img 
                    className='overflow-hidden object-fit-cover' height={'200px'}
                    variant="top" 
                    src={product.images[0]? product.images[0].url : 'Loading..'}/>
                <Card.Body>
                    <Card.Title className={'text-transform-capitalize fs-6'}>{product.name}</Card.Title>
                        <small className='text-orange'>Rp</small>
                        <span className='fs-4 text-orange'>{`${priceFormat(product.initialPrice)}`}</span>
                        <div className='row'>
                            <div className='col-6 d-flex align-items-center'>
                                {
                                    // product.rating>0 &&
                                    (<>
                                        <MdStarRate className='text-orange'/>
                                        <small className='p-1'>{product.rating}</small>
                                    </>)
                                }
                            </div>    
                            <div className='col-6 text-end'>0 sold</div>    
                        </div>
                </Card.Body>
            </Card>
        </Link>
    )
}

export default ProductCard