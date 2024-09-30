import { useEffect, useState } from 'react'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import styles from './productCarousel.module.css'

const ProductCarousel = ({images}) => {
    const [imgLink,setImgLink] = useState(null)
    let index = 0
    const noImage = '../../errors/default-image-icon-vector-missing-picture-page-website-design-mobile-app-no-photo-available_87543-11093.avif'

    useEffect(()=>{
        if(images && images.length > 0)
            setImgLink(images[index].url)
        else
            setImgLink(noImage)
    },[])

    return (
        <div>
            <div className='ratio ratio-1x1 bg-dark mb-3'>
                <img className='object-fit-contain' src={imgLink}/>
            </div>
            <Row className='m-0 w-100 flex-nowrap overflow-scroll justify-content-start' style={{height:100}} >
                {
                    images && images.length > 0 ? images.map((item)=>{
                        return (
                            <Col
                                className={`col-3 p-0 me-1 ${styles.thumbnail}`}
                                style={{width:100,height:100}}
                                key={item._id}>
                                <img 
                                    className='w-100 h-100 object-fit-cover overflow-hidden'
                                    src={item.url} onClick={()=>{setImgLink(item.url)}}/>
                            </Col>
                        )
                    }) :
                        <Col
                            className={`col-3 p-0 me-1 ${styles.thumbnail}`}style={{width:100,height:100}}>
                            <img 
                                className='w-100 h-100 object-fit-cover overflow-hidden'
                                src={noImage} onClick={()=>{setImgLink(noImage)}}/>
                        </Col>
                }
            </Row>
        </div>
    )
}

export default ProductCarousel