import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { useSelector } from "react-redux"
import { useState } from 'react'
import Button from 'react-bootstrap/Button'
import axios from 'axios'

//TODO: learn about formik & validation on FE & BE
const Profile = ()=>{
    const [alert,setAlert] = useState({message:'',type:''})
    const [loading,setLoading] = useState(false)
    const {userData} = useSelector((state)=>{ return state.user })
    const [newState,setNewState] = useState({
        name:userData.name,
        email:userData.email,
        phoneNumber:userData.phoneNumber,
        address:userData.address,
    })

    const handleFieldChange = (e)=>{
        const key = e.target.name
        const value = e.target.value
        setNewState((prev)=>{return {...prev,[key]:value}})
    }

    const handleSubmit = (e)=>{
        e.preventDefault()

        const data = Object.fromEntries(new FormData(e.currentTarget))
    }

    return(<>
        <Row>
            <Col className='col-9'>
                <p className='fs-5'>My Profile</p>
                <Form onSubmit={handleSubmit}>
                    <table className='w-100 table table-borderless align-middle'>
                        <tbody>
                        {
                            // TODO: display user data first, then make change email feature
                        }
                        <tr>
                            <td className='w-25 text-end text-secondary'>Name</td>
                            <td><Form.Control name="name" value={newState.name} onChange={handleFieldChange}/></td>
                        </tr>
                        <tr>
                            <td className='w-25 text-end text-secondary'>Email</td>
                            <td><Form.Control type="email" name="email" value={newState.email} onChange={handleFieldChange} /></td>
                        </tr>
                        <tr>
                            <td className='w-25 text-end text-secondary'>Phone</td>
                            <td><Form.Control name="phone" value={newState.phoneNumber} onChange={handleFieldChange} /></td>
                        </tr>
                        <tr>
                            <td className='w-25 text-end text-secondary'>Address</td>
                            <td><Form.Control as="textarea" name="address" value={newState.address} onChange={handleFieldChange} /></td>
                        </tr>
                        </tbody>
                    </table>
                    <Button type='submit'>Save Changes</Button>
                </Form>
            </Col>
            <Col className='col-3'>
            </Col>
        </Row>
    </>)
}

export default Profile