import Card from 'react-bootstrap/Card'
import { Link } from 'react-router-dom'
import styles from './productCard.module.css'
import { MdStarRate } from "react-icons/md"

//<MdStarHalf />

//TODO:price format
const ProductCard = ({product})=>{
    return (
        <Link className={styles.link}>
            <Card>
                <Card.Img 
                    className={styles.thumbnail}
                    variant="top" 
                    src={product.images[0]? product.images[0].url : 'Loading..'}/>
                <Card.Body>
                    <Card.Title className={`${styles.title} fs-6`}>{product.name}</Card.Title>
                        <span className='text-primary fs-4'>{`Rp ${product.initialPrice}`}</span>
                        <div className='row'>
                            <div className='col-6 d-flex align-items-center'>
                                {
                                    product.rating>0 &&
                                    (<MdStarRate className='text-primary'/> &&
                                    <small className='p-1'>{product.rating}</small>)
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