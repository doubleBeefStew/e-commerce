import Col from "react-bootstrap/Col"
import Lottie from "lottie-react"
import animationData from '../assets/animations/no_result.json'


const NoResult = ({})=>{
    const style = { height: '50%' }

    return (
            <Col className='d-flex flex-column align-items-center justify-content-center text-center'>
                <Lottie style={style} animationData={animationData} loop={true}/>
                <h1>{"Sorry, we couldn't find what you're looking for."}</h1>
                <p>Maybe give it another try?</p>
            </Col>
    )
}

export default NoResult