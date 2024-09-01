import Col from "react-bootstrap/Col"
import Row from "react-bootstrap/Row"
import Container from "react-bootstrap/Container"
import Lottie from "lottie-react";
import animationData from '../../assets/animations/success.json'

const SuccessPage = ()=>{
    return (<>
    <Container>
        <Row className='vh-100'>
            <Col className='d-flex flex-column align-items-center justify-content-center text-center'>
            <Lottie animationData={animationData} loop={false} />
            </Col>
        </Row>
    </Container>
    </>)
}

export default SuccessPage