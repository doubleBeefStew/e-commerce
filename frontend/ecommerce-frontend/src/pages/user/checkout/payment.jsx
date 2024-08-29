import Col from "react-bootstrap/Col"
import Row from "react-bootstrap/Row"
import Container from "react-bootstrap/Container"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import PinField from "react-pin-field"
import { useNavigate } from "react-router-dom"
import { createPayment,setLoadingPayment, setRedirect } from "../../../redux/slices/payment"

const Payment = ({data})=>{
    const {currentCheckout} = useSelector((state)=>{ return state.orders })
    const {isLoadingPayment,redirect,error} = useSelector((state)=>{ return state.payment })
    const [pin,setPin] = useState('')
    const pinLength = 6
    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(()=>{
    },[])

    useEffect(()=>{
        if(redirect){
            dispatch(setRedirect(false))
            navigate('/')
        }
    },[redirect])

    useEffect(()=>{
        if(pin.length == pinLength){
            const data = {data:currentCheckout,pin}
            dispatch(createPayment(data))
        }
    },[pin])

    const changePin = (value)=>{
        setPin(value)
    }

    return (<>
        <Container>
        <Row className='vh-100'>
            <Col className='d-flex flex-column align-items-center justify-content-center text-center'>
                <h1>PIN</h1>
                <br/>
                <div className='d-flex'>
                    <PinField
                        className="field-a"
                        length={pinLength}
                        validate={/^[0-9]$/}
                        onChange={changePin}
                    />
                </div>
            </Col>
        </Row>
        </Container>
    </>)
}

export default Payment