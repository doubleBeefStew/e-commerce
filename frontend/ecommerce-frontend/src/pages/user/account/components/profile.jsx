import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

const Profile = ()=>{
    const handleSubmit = (e)=>{
        e.preventDefault()
        console.log('submitting');
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
                            // TODO: validate updated data 
                        }
                        <tr>
                            <td className='w-25 text-end text-secondary'>Name</td>
                            <td><Form.Control type="email" name="email" value={''} /></td>
                        </tr>
                        <tr>
                            <td className='w-25 text-end text-secondary'>Email</td>
                            <td><Form.Control type="email" name="email" value={''} /></td>
                        </tr>
                        <tr>
                            <td className='w-25 text-end text-secondary'>Phone</td>
                            <td><Form.Control type="email" name="email" value={''} /></td>
                        </tr>
                        <tr>
                            <td className='w-25 text-end text-secondary'>Address</td>
                            <td><Form.Control as="textarea" name="email" value={''} /></td>
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