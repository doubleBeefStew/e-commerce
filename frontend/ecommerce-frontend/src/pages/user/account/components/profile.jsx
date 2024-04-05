import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { useSelector } from "react-redux"
import Button from 'react-bootstrap/Button'
import axios from 'axios'
import Alert from "react-bootstrap/Alert"
import profileSchema from '../../../../schema/profileSchema'
import { useState } from 'react'
import { useFormik } from 'formik'
import env from '../../../../../../env'

//TODO: learn about validation on BE
const Profile = ()=>{
    const [alert,setAlert] = useState({message:'',type:''})
    const {userData} = useSelector((state)=>{ return state.user })

    const initialValues = {
        name:userData.name,
        email:userData.email,
        phoneNumber:userData.phoneNumber,
        address:userData.address,
    }

    const onSubmit = (values,actions)=>{
        console.log(values)

        axios.post(`${env.API_URL}/user/update/info`,values,{withCredentials:true})
        .then(function(res){
            console.log(res)
            setAlert({message:`Your profile information is successfully updated.`,type:'success'})

            actions.resetForm()
        })
        .catch((err)=>{
            console.log(err)
            actions.setSubmitting(false)
            if(err.response && err.response.data.code=='USR-404'){
                setAlert({message:'User is not found or not registered',type:'danger'})
            }
            else{
                setAlert({message:'Failed to update your profile information. Please try again later.',type:'danger'})
            }
        })
    }

    const {touched,errors,values,handleBlur,handleChange,handleSubmit} = useFormik({
        initialValues,
        validationSchema:profileSchema,
        onSubmit
    })

    return(<>
        <Row>
            <Col className='col-9'>
                <p className='fs-5'>My Profile</p>
                {
                    alert.message && <Alert className="mb-3" variant={alert.type}>{alert.message}</Alert>
                }
                <Form onSubmit={handleSubmit}>
                    <table className='w-100 table table-borderless align-middle'>
                        <tbody>
                        {/* Name */}
                        <tr>
                            <td className='w-25 text-end text-secondary'><label>Name</label></td>
                            <td><Form.Control 
                            name="name"
                            className={errors.name && touched.name? 'border-danger':''} 
                            value={values.name}
                            onBlur={handleBlur} 
                            onChange={handleChange}/>
                            <small className="text-danger fw-light">{ 
                                    errors.name && touched.name? errors.name:'' 
                            }</small>
                            </td>
                        </tr>
                        {/* Email */}
                        <tr>
                            <td className='w-25 text-end text-secondary'>Email</td>
                            <td><label>{userData.email}</label></td>
                        </tr>
                        {/* Phone Number */}
                        <tr>
                            <td className='w-25 text-end text-secondary'>Phone Numbers</td>
                            <td><Form.Control 
                            name="phoneNumber" 
                            value={values.phoneNumber}
                            onBlur={handleBlur} 
                            onChange={handleChange} />
                            <small className="text-danger fw-light">{ 
                                    errors.phoneNumber && touched.phoneNumber? errors.phoneNumber:'' 
                            }</small>
                            </td>
                        </tr>
                        {/* Address */}
                        <tr>
                            <td className='w-25 text-end text-secondary'>Address</td>
                            <td><Form.Control as="textarea" 
                            name="address" 
                            className={errors.address && touched.address? 'border-danger':''} 
                            value={values.address} 
                            onBlur={handleBlur}
                            onChange={handleChange} />
                            <small className="text-danger fw-light">{ 
                                    errors.address && touched.address? errors.address:'' 
                            }</small>
                            </td>
                        </tr>
                        <tr>
                            <td colSpan={2} className='text-center'><Button type='submit'>Save Changes</Button></td>
                        </tr>
                        </tbody>
                    </table>
                </Form>
            </Col>
            <Col className='col-3'>
            </Col>
        </Row>
    </>)
}

export default Profile