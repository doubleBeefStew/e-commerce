import { Link, useNavigate } from "react-router-dom"
import Form from 'react-bootstrap/Form'
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import Alert from 'react-bootstrap/Alert'
import Spinner from 'react-bootstrap/Spinner'
import { useState } from "react"
import axios from 'axios'

const Login = ()=>{
    const [alert,setAlert] = useState({message:'',type:''})
    const [loading,setLoading] = useState(false)
    
    const handleSubmit = (e)=>{
        e.preventDefault()
        const formData = new FormData(e.currentTarget)
        const data = Object.fromEntries(formData)
        const navigate = useNavigate()

        if(!data.email)
            setAlert({message:'Please fill in your email address.',type:'danger'})
        else if(!data.password)
            setAlert({message:'Please fill in your password.',type:'danger'})
        else{
            setAlert('')
            setLoading(true)
            console.log(data);
            axios.post('https://studious-couscous-x9gxvg999g2v5wx-3000.app.github.dev/api/v1/auth/login',data)
            .then(function(res){
                console.log(res)
                setLoading(false)
                navigate('/')
            })
            .catch((err)=>{
                if(err.response && err.response.data.error.code=='LGN-400')
                    setAlert({message:'Email is not registered.',type:'danger'})
                else if(err.response && err.response.data.error.code=='LGN-401')
                    setAlert({message:'Invalid email or password.',type:'danger'})
                else
                    setAlert({message:'Sorry, something went wrong. Please try again later.',type:'danger'})

                console.log(err)
                setLoading(false)
            })
        }
    }

    return (<>
            <Row className='vh-100'>
            <Col className='col-12 col-md-6 d-flex flex-column justify-content-center px-sm-5'>
                <Card>
                    <Card.Body>
                        <Card.Title className='text-center mb-4'>Login</Card.Title>
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
                            <Form.Check className='mb-3'
                                type="checkbox"
                                id="rememberMe"
                                label="Remember Me?"
                            />
                            
                            <Button className='w-100 mb-3' type='submit'>
                                {
                                    loading? 
                                    <Spinner animation="border" role="status" size='sm'>
                                        <span className="visually-hidden">Loading...</span>
                                    </Spinner>
                                    :"Login"
                                }
                            </Button>
                        </Form>
                        <Card.Text className='mb-3'>Not Registered? <Link to={'/register'}>Sign Up</Link></Card.Text>
                    </Card.Body>
                </Card>
            </Col>
            </Row>
    </>)
}

export default Login