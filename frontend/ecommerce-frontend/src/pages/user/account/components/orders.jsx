import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

const Orders = ()=>{
    return(
    <Row className='flex-column gy-5'>
        <Col>
            <Row className='d-flex flex-nowrap gx-3 justify-content-start'>
                <Col className='col-auto text-nowrap border-bottom border-3'><small>Waiting for Payment</small></Col>
                <Col className='col-auto text-nowrap'><small>Paid</small></Col>
                <Col className='col-auto text-nowrap'><small>Shipping</small></Col>
                <Col className='col-auto text-nowrap'><small>Delivered</small></Col>
                <Col className='col-auto text-nowrap'><small>Returned</small></Col>
                <Col className='col-auto text-nowrap'><small>Cancelled</small></Col>
            </Row>
        </Col>
        <Col>
            <Row>Content</Row>
        </Col>
    </Row>
    )
}

export default Orders