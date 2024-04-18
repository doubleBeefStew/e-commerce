import { Link, useNavigate } from "react-router-dom"
import Form from 'react-bootstrap/Form'
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import Alert from 'react-bootstrap/Alert'
import Spinner from 'react-bootstrap/Spinner'
import { useState } from "react"
import { useFormik } from 'formik'
import axios from 'axios'
import env from '../../../../env'
import loginSchema from "../../validationSchema/loginSchema"

const Login = ()=>{
    const [alert,setAlert] = useState({message:'',type:''})
    const navigate = useNavigate()
    
    const initialValues = {
        email:'',
        password:'',
        rememberMe:false
    }

    const onSubmit = (values,actions)=>{
        axios.post(`${env.API_URL}/auth/login`,values,{withCredentials:true})
        .then(function(res){
            console.log(res)
            navigate('/')
            window.location.reload(true)
        })
        .catch((err)=>{
            console.log(err)
            actions.setSubmitting(false)
            if(err.response && err.response.data.error.code=='LGN-400')
                setAlert({message:'Email is not registered.',type:'danger'})
            else if(err.response && err.response.data.error.code=='LGN-401')
                setAlert({message:'Invalid email or password.',type:'danger'})
            else
                setAlert({message:'Sorry, something went wrong. Please try again later.',type:'danger'})

            console.log(err)
        })
    }

    const {values,errors,touched,isSubmitting,isValid,handleSubmit,handleChange,handleBlur} = useFormik({
        initialValues,
        validationSchema:loginSchema,
        onSubmit
    })

    return (<>
            <Row className='vh-100'>
            <Col className='col-12 col-sm-6 d-flex flex-column justify-content-center px-sm-5'>
                <Card>
                    <Card.Body>
                        <Card.Title className='text-center mb-4'>Login</Card.Title>
                        {
                            alert.message && <Alert className="mb-3" variant={alert.type}>{alert.message}</Alert>
                        }
                        <Form onSubmit={handleSubmit}>
                            <Form.Group className="mt-3" controlId="email">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control 
                                    type="email" 
                                    name="email"
                                    placeholder="name@example.com"
                                    className = { errors.email&&touched.email? 'border-danger':'' }
                                    value={values.email}
                                    onBlur={handleBlur}
                                    onChange={handleChange} />
                            </Form.Group>
                            <small className="text-danger fw-light">{ 
                                        errors.email && touched.email? errors.email:'' 
                                    }</small>
                            <Form.Group className="mt-3" controlId="password">
                                <Form.Label >Password</Form.Label>
                                <Form.Control 
                                    type="password" 
                                    name="password" 
                                    placeholder="John@123"
                                    className = { errors.password&&touched.password? 'border-danger':'' }
                                    value={values.password}
                                    onBlur={handleBlur}
                                    onChange={handleChange} />
                            </Form.Group>
                            <small className="text-danger fw-light">{ 
                                        errors.password && touched.password? errors.password:'' 
                                    }</small>
                            <Form.Check className='mt-3'
                                type="checkbox"
                                id="rememberMe"
                                label="Remember Me?"
                                checked={values.rememberMe}
                                onBlur={handleBlur}
                                onChange={handleChange}
                            />
                            
                            <Button disabled={isSubmitting||!isValid} className='w-100 mt-3' type='submit'>
                                {
                                    isSubmitting? 
                                    <Spinner animation="border" role="status" size='sm'>
                                        <span className="visually-hidden">Loading...</span>
                                    </Spinner>
                                    :"Login"
                                }
                            </Button>
                        </Form>
                        <Card.Text className='mt- text-center'><small>Not Registered? <Link to={'/register'}>Sign Up</Link></small></Card.Text>
                    </Card.Body>
                </Card>
            </Col>
            </Row>
    </>)
}

export default Login