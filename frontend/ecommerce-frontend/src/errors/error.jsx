import { Link, useRouteError } from "react-router-dom"
import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Lottie from "lottie-react"
import animationData from '../assets/animations/error.json'


const Error = ({message})=>{
    const style = { height: '30%' }
    const error = useRouteError()

    return (
        <Container>
        <Row className="vh-100">
            <Col className='d-flex flex-column align-items-center justify-content-center text-center'>
                <Lottie style={style} animationData={animationData} loop={false}/>
                <h1>{message? message:'Sorry, something went wrong.'}</h1>
                <p>Return to <Link to={'/'}>home</Link></p>
            </Col>
        </Row>
        </Container>
    )
}

export default Error