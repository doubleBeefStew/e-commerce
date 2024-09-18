import { Link } from "react-router-dom"
import Form from 'react-bootstrap/Form'
import Row from "react-bootstrap/Row"
import Alert from "react-bootstrap/Alert"
import Col from "react-bootstrap/Col"
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import Spinner from 'react-bootstrap/Spinner'
import axios from 'axios'
import {useFormik} from 'formik'
import registerSchema from "../../validationSchema/registerSchema"
import { useState } from "react"
import Loading from "../../components/notifPages/loading"
import { useSelector } from "react-redux"

const Register = ()=>{
    const [alert, setAlert] = useState({ message:'', type:'' })
    const {isLoadingUser} = useSelector((state)=>{return state.user})

    const initialValues= {
        email:'',
        password:'',
        repeatPassword:'',
    }

    const onSubmit = (values,actions)=>{
        axios.post(`${import.meta.env.VITE_API_URL}/auth/register`,values)
        .then(function(res){
            console.log(res)
            setAlert({message:`Registration successful. Please confirm the email sent to ${values.email} to continue.`,type:'success'})
            actions.resetForm()
        })
        .catch((err)=>{
            console.log(err)
            actions.setSubmitting(false)
            if(err.response && err.response.data.error.code=='RGS-401'){
                setAlert({message:'Your email is already registered. Please login to continue',type:'danger'})
            }
            else{
                setAlert({message:'Sorry, something went wrong. Please try again later.',type:'danger'})
            }
        })
    }

    const {values,isSubmitting,errors,touched,isValid,handleChange,handleSubmit,handleBlur} = useFormik({
        initialValues,
        validationSchema:registerSchema,
        onSubmit
    })

    return (<>
    {
        isLoadingUser ? <Loading /> : 
        <Row className='vh-100'>
            <Col className='col-12 col-sm-6 d-flex flex-column justify-content-center px-sm-5'>
                <Card className='border-sm-0'>
                    <Card.Body>
                        <Card.Title className='text-center mb-4'>Create a New Account</Card.Title>
                        {
                            alert.message && <Alert className="mb-3" variant={alert.type}>{alert.message}</Alert>
                        }
                            <Form onSubmit={handleSubmit}>
                                <Form.Group controlId="email">
                                    <Form.Label>Email address</Form.Label>
                                    <Form.Control 
                                        type="email" 
                                        name="email" 
                                        placeholder="name@example.com" 
                                        className={errors.email && touched.email?'border-danger': ''}
                                        value={values.email}
                                        onBlur={handleBlur}
                                        onChange={handleChange}/>
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
                                        className={errors.password && touched.password? 'border-danger': ''}
                                        value={values.password}
                                        onBlur={handleBlur}
                                        onChange={handleChange}/>
                                </Form.Group>
                                <small className="text-danger fw-light">{ 
                                    errors.password && touched.password? errors.password:'' 
                                }</small>

                                <Form.Group className="mt-3" controlId="repeatPassword">
                                    <Form.Label >Repeat Password</Form.Label>
                                    <Form.Control 
                                        type="password" 
                                        name="repeatPassword" 
                                        placeholder="John@123"
                                        
                                        className={errors.repeatPassword && touched.repeatPassword? 'border-danger':''}
                                        value={values.repeatPassword}
                                        onBlur={handleBlur}
                                        onChange={handleChange}/>
                                </Form.Group>
                                <small className="text-danger fw-light">{ 
                                    errors.repeatPassword && touched.repeatPassword? errors.repeatPassword:'' 
                                }</small>
                                
                                <Button disabled={isSubmitting || !isValid} className='w-100 mt-4' type='submit'>
                                    {
                                        isSubmitting? 
                                        <Spinner animation="border" role="status" size='sm'>
                                            <span className="visually-hidden">Loading...</span>
                                        </Spinner>
                                        :"Register"
                                    }
                                </Button>
                            </Form>
                        <Card.Text className='mt-1 text-center'><small>Already have an account? <Link to={'/login'}>Login</Link></small></Card.Text>
                    </Card.Body>
                </Card>
            </Col>
        </Row>
    }
    </>)
}

export default Register