import Col from "react-bootstrap/Col"
import Row from "react-bootstrap/Row"
import Container from "react-bootstrap/Container"
import Lottie from "lottie-react";
import animationData from '../../assets/animations/loading.json'
import { useNavigate } from "react-router-dom";


const Loading = ()=>{
    const style = { height: '30%' }
    const navigate = useNavigate()

    return (<>
    <Container>
        <Row className='vh-100'>
            <Col className='d-flex flex-column align-items-center justify-content-center text-center'>
                <Lottie style={style} animationData={animationData} loop={true} />
            </Col>
        </Row>
    </Container>
    </>)
}

export default Loading