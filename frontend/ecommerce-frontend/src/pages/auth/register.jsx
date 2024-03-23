import { Link } from "react-router-dom"
import Form from 'react-bootstrap/Form'
import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import Alert from 'react-bootstrap/Alert'
import Spinner from 'react-bootstrap/Spinner'
import { useState } from "react"
import axios from 'axios'

const Register = ()=>{
    const [alert,setAlert] = useState({message:'',type:''})
    const [loading,setLoading] = useState(false)
    
    const handleSubmit = (e)=>{
        e.preventDefault()
        const form = e.currentTarget
        const data = Object.fromEntries(new FormData(form))
        
        if(!data.email)
            setAlert({message:'Please fill in your email address.',type:'danger'})
        else if(!data.password)
            setAlert({message:'Please fill in your password.',type:'danger'})
        else if(data.password.length<4 || data.password.length>20)
            setAlert({message:'Password must be between 4-20 characters long.',type:'danger'})
        else if(!data.repeatPassword)
            setAlert({message:'Please confirm your password.',type:'danger'})
        else if(data.password!=data.repeatPassword)
            setAlert({message:'Password must be correctly confirmed.',type:'danger'})
        else{
            setAlert('')
            setLoading(true)
            axios.post('https://studious-couscous-x9gxvg999g2v5wx-3000.app.github.dev/api/v1/auth/register',data)
                .then(function(res){
                    console.log(res)
                    setAlert({message:`Registration successful. Please confirm the email sent to ${data.email} to continue.`,type:'success'})
                    setLoading(false)
                    form.reset()
                })
                .catch((err)=>{
                    console.log(err)
                    if(err.response && err.response.data.error.code=='RGS-401'){
                        setAlert({message:'Your email is already registered. Please login to continue',type:'danger'})
                    }
                    else{
                        setAlert({message:'Sorry, something went wrong. Please try again later.',type:'danger'})
                    }
                    setLoading(false)
                })
        }
    }

    return (<>
        <Container>
            <Row className='vh-100'>
            <Col md={5} className='d-flex flex-column justify-content-center px-sm-5'>
                <Card className='border-sm-0'>
                    <Card.Body>
                        <Card.Title className='text-center mb-4'>Create a New Account</Card.Title>
                        {
                            alert.message && <Alert className="mb-3" variant={alert.type}>{alert.message}</Alert>
                        }
                        <Form onSubmit={handleSubmit}>
                            <Form.Group className="mb-3" controlId="email">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control type="email" name="email" placeholder="name@example.com" />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="password">
                                <Form.Label >Password</Form.Label>
                                <Form.Control type="password" name="password" placeholder="John@123"/>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="repeatPassword">
                                <Form.Label >Repeat Password</Form.Label>
                                <Form.Control type="password" name="repeatPassword" placeholder="John@123"/>
                            </Form.Group>
                            
                            <Button className='w-100 mb-3' type='submit'>
                                {
                                    loading? 
                                    <Spinner animation="border" role="status" size='sm'>
                                        <span className="visually-hidden">Loading...</span>
                                    </Spinner>
                                    :"Register"
                                }
                            </Button>
                        </Form>
                        <Card.Text className='mb-3'>Already have an account? <Link to={'/login'}>Login</Link></Card.Text>
                    </Card.Body>
                </Card>
            </Col>
            </Row>

        </Container>
    </>)
}

export default Register