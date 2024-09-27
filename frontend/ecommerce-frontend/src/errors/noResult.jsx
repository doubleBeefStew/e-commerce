import Col from "react-bootstrap/Col"
import Lottie from "lottie-react"
import animationData from '../assets/animations/no_result.json'


const NoResult = ({})=>{
    const style = { height: '50%' }

    return (
            <Col className='d-flex flex-column align-items-center justify-content-center text-center'>
                <Lottie style={style} animationData={animationData} loop={false}/>
                <p className="p-5">Sorry, we couldn't find what you're looking for.</p>
            </Col>
    )
}

export default NoResult