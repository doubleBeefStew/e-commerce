import { Link, useNavigate } from "react-router-dom"
import Form from 'react-bootstrap/Form'
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import Alert from 'react-bootstrap/Alert'
import Spinner from 'react-bootstrap/Spinner'
import { useFormik } from 'formik'
import loginSchema from "../../validationSchema/loginSchema"
import { useDispatch, useSelector } from "react-redux"
import { login } from "../../redux/slices/user"
import { useEffect, useState } from "react"
import { errorMessages } from "../../errors/errorMessages"
import Loading from "../../components/notifPages/loading"

//TODO: remove token not provided error
const Login = ()=>{
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [alert,setAlert]=useState('')
    const {isAuthenticated,isLoadingUser,userData,isUserError} = useSelector((state)=>{return state.user})
    
    const initialValues = {
        email:'',
        password:'',
        rememberMe:false
    }

    useEffect(()=>{
        if(isAuthenticated){
            navigate('/')
        }
    },[isAuthenticated])

    const onSubmit = async (data,actions)=>{
            dispatch(login(data))
    }

    const {values,errors,touched,isSubmitting,isValid,handleSubmit,handleChange,handleBlur} = useFormik({
        initialValues,
        validationSchema:loginSchema,
        onSubmit
    })

    return (<>
        {
            isLoadingUser ? <Loading/> :
            <Row className='vh-100'>
                <Col className='col-12 col-sm-6 d-flex flex-column justify-content-center px-sm-5'>
                    <Card>
                        <Card.Body>
                            <Card.Title className='text-center mb-4'>Login</Card.Title>
                            {
                                isUserError && <Alert className="mb-3" variant='danger'>{errorMessages.general_error}</Alert>
                            }
                            <Form onSubmit={handleSubmit}>
                                <Form.Group className="mt-3" controlId="email">
                                    <Form.Label>Email address</Form.Label>
                                    <Form.Control 
                                        type="email" 
                                        name="email"
                                        placeholder="name@example.com"
                                        className = { (errors.email && touched.email) && 'border-danger' }
                                        value={values.email}
                                        onBlur={handleBlur}
                                        onChange={handleChange} />
                                </Form.Group>
                                <small className="text-danger fw-light">{ 
                                            (errors.email && touched.email) && errors.email
                                        }</small>
                                <Form.Group className="mt-3" controlId="password">
                                    <Form.Label >Password</Form.Label>
                                    <Form.Control 
                                        type="password" 
                                        name="password" 
                                        placeholder="John@123"
                                        className = { (errors.password && touched.password) && 'border-danger' }
                                        value={values.password}
                                        onBlur={handleBlur}
                                        onChange={handleChange} />
                                </Form.Group>
                                <small className="text-danger fw-light">{ 
                                    (errors.password && touched.password) && errors.password 
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
        } 
    </>)
}

export default Login