import Col from "react-bootstrap/Col"
import Row from "react-bootstrap/Row"
import Container from "react-bootstrap/Container"
import Lottie from "lottie-react";
import animationData from '../../assets/animations/thumbsup.json'
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";


const SuccessPage = ()=>{
    const style = { height: '30%' }
    const navigate = useNavigate()

    useEffect(()=>{
        setTimeout(()=>{
            navigate('/login')
        },5000)
    },[])

    return (<>
    <Container>
        <Row className='vh-100'>
            <Col className='d-flex flex-column align-items-center justify-content-center text-center'>
                <Lottie style={style} animationData={animationData} loop={false}/>
                <h1>Payment Successful</h1>
                <p>Thanks for purchasing our products :)</p>
            </Col>
        </Row>
    </Container>
    </>)
}

export default SuccessPage