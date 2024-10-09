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
                    className='overflow-hidden object-fit-contain' height={'200px'}
                    variant="top" 
                    src={ product.images[0].url }/>
                <Card.Body>
                    <Card.Title className={'text-transform-capitalize fs-6 text-truncate'}>{product.name}</Card.Title>
                        <small className='text-orange'>Rp</small>
                        <span className='fs-5 text-orange text-truncate'>{`${priceFormat(product.initialPrice)}`}</span>
                        <div className='row align-items-center mt-2'>
                            <div className='col-12 col-sm-6 d-flex align-items-center'>
                                {
                                    // product.rating>0 &&
                                    (<>
                                        <MdStarRate className='text-orange'/>
                                        <small className='p-1'>{product.rating}</small>
                                    </>)
                                }
                            </div>    
                            <div className='col-12 col-sm-6 text-start text-sm-end'>{
                                `${product.sold_out < 0 ? 0 : product.sold_out} sold`
                            }</div>    
                        </div>
                </Card.Body>
            </Card>
        </Link>
    )
}

export default ProductCard