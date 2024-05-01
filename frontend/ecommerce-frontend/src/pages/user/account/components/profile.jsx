import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { useSelector } from "react-redux"
import Button from 'react-bootstrap/Button'
import axios from 'axios'
import Alert from "react-bootstrap/Alert"
import profileSchema from '../../../../validationSchema/profileSchema'
import { useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useFormik } from 'formik'
import env from '../../../../../../env'
import { BiSolidEditAlt } from "react-icons/bi";
import { CgProfile } from "react-icons/cg"
import ProfilePicture from '../../../../components/profilePicture/profilePicture'
import styles from '../account.module.css'
import {loadUser} from '../../../../redux/slices/user'

const Profile = ()=>{
    const [alert,setAlert] = useState({message:'',type:''})
    const {userData} = useSelector((state)=>{ return state.user })
    const [displayedImage,setDisplayedImage] = useState(userData.avatar||'')
    const [selectedImage,setSelectedImage] = useState(null)
    const selectPicture = useRef(null)
    const dispatch = useDispatch()

    const initialValues = {
        name:userData.name,
        email:userData.email,
        phoneNumber:userData.phoneNumber,
        address:userData.address,
        avatar:userData.avatar,
    }

    //TODO: make profile pic only allow 1 image
    const onSubmit = (values,actions)=>{
        const formData = new FormData()
        values.name && formData.append('name',values.name)
        values.email && formData.append('email',values.email)
        values.phoneNumber && formData.append('phoneNumber',values.phoneNumber)
        values.address && formData.append('address',values.address)
        values.avatar && formData.append('avatar',values.avatar)
        selectedImage && formData.append('image',selectedImage)

        axios.patch(`${env.API_URL}/user/update/info`,formData,{withCredentials:true})
        .then(function(res){
            console.log(res)
            dispatch(loadUser())
            // TODO: alert message not showing because of change in redux state
            setAlert({message:`Your profile information is successfully updated.`,type:'success'})
            actions.resetForm()
            setSelectedImage('')
            setDisplayedImage('')
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

    const handleImageChange = (event)=>{
        handleChange(event)
        if(event.target.files && event.target.files[0]){
            setSelectedImage(event.target.files[0])

            const reader = new FileReader()
            reader.onload=(e)=>{setDisplayedImage(e.target.result)}
            reader.readAsDataURL(event.target.files[0])
        }
    }

    return(<>
        <Form onSubmit={handleSubmit}>
        <Row>
            <Col className='col-12 col-md-8 order-2 order-md-1'>
                <p className='fs-5 text-center text-sm-start fw-bold'>My Profile</p>
                {
                    alert.message && <Alert className="mb-3" variant={alert.type}>{alert.message}</Alert>
                }
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
            </Col>
            <Col className='col-12 col-md-4 order-1 order-md-2 d-flex align-items-center justify-content-center'>
                    <div className={`${styles.profileContainer}`} onClick={()=>{ selectPicture.current.click() }}>
                        {
                            displayedImage?
                            <ProfilePicture image={displayedImage} size={'10rem'} />:
                            <CgProfile color='grey' size='10rem'/>
                        }
                        <div className={`${styles.editIcon} h-100 d-flex align-items-center justify-content-center`}>
                            <BiSolidEditAlt  size={'4rem'}/>
                        </div>
                        <small className="d-block text-secondary text-center fw-light">Profile picture</small>
                    </div>
                    <input 
                        type='file' 
                        name='image'
                        className='d-none' 
                        ref={selectPicture}
                        value={values.image}
                        onBlur={handleBlur}
                        onChange={handleImageChange}/>
            </Col>
        </Row>
        </Form>
    </>)
}

export default Profile