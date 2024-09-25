import { Link, useRouteError } from "react-router-dom"
import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Lottie from "lottie-react"
import animationData from '../assets/animations/404.json'


const NotFound = ({message})=>{
    const style = { height: '30%' }

    return (
        <Container>
        <Row className="vh-100">
            <Col className='d-flex flex-column align-items-center justify-content-center text-center'>
                <Lottie style={style} animationData={animationData} loop={true}/>
                <h1>{message? message:"Sorry, we couldn't find what you're looking for."}</h1>
                <p>Return to <Link to={'/'}>home</Link></p>
            </Col>
        </Row>
        </Container>
    )
}

export default NotFound