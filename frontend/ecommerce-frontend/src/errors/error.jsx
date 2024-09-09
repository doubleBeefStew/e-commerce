import { Link, useRouteError } from "react-router-dom"
import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import { useEffect } from "react"

const Error = ({message})=>{
    const error = useRouteError()

    useEffect(()=>{
        console.log('error triggered')
        
    },[])

    return (
        <Container>
        <Row className="vh-100">
        <Col className='d-flex flex-column align-items-center justify-content-center text-center'>
            <h1>Error page</h1>
            <p>{message? message:'Sorry, something went wrong.'}</p>
            <p>Return to <Link to={'/'}>home</Link></p>
        </Col>
        </Row>
        </Container>
    )
}

export default Error