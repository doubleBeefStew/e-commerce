import Form from 'react-bootstrap/Form';

const FormGroup = ({label,type,placeholder})=>{
    return (
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>{label}</Form.Label>
            <Form.Control type={type} placeholder={placeholder} />
        </Form.Group>
    )
}

export default FormGroup