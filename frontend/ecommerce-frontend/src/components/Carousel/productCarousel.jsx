import Carousel from 'react-bootstrap/Carousel'
import Image from 'react-bootstrap/Image'

const ProductCarousel = ({images}) => {
    console.log(images)
    return (
        <Carousel>
            {
                images.map((item)=>{
                    return (
                        <Carousel.Item key={item._id}>
                            <Image
                                className="d-block w-100 overflow-hidden object-fit-cover"
                                src={item.url}
                                width={1710}
                                height={315}
                            />
                        </Carousel.Item>
                    )
                })
            }
        </Carousel>
    )
}

export default ProductCarousel