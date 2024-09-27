import Col from "react-bootstrap/Col"
import Lottie from "lottie-react"
import animationData from '../assets/animations/empty_cart.json'
import { Link } from "react-router-dom"


const EmptyCart = ({message})=>{
    const style = { height: '50%' }

    return (
            <Col className='d-flex flex-column align-items-center justify-content-center text-center'>
                <Lottie style={style} animationData={animationData} loop={false}/>
                <h1>{message? message:"Wow there is nothing here."}</h1>
                <p>Start <Link to={'/products'}>shopping</Link></p>
            </Col>
    )
}

export default EmptyCart