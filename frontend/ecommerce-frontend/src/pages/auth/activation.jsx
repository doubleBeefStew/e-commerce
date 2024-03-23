import Col from "react-bootstrap/Col"
import Row from "react-bootstrap/Row"
import Container from "react-bootstrap/Container"
import { Link, useNavigate, useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import axios from "axios"

const Activation = ()=>{
    const {token} = useParams()
    const [error,setError]=useState(true)
    const [loading,setLoading]=useState(true)
    const navigate = useNavigate()

    useEffect(()=>{
        setLoading(true)
        if(token){
            axios.get(`https://studious-couscous-x9gxvg999g2v5wx-3000.app.github.dev/api/v1/auth/activation/${token}`)
            .then(function(res){
                setError(false)
                setLoading(false)
                console.log(res)
                setTimeout(()=>{
                    navigate('/login')
                },5000)
            })
            .catch((err)=>{
                setError(true)
                setLoading(false)
                console.log(err)
            })
        }else
            setError(true)
    },[])

    return (<>
        <Container>
        <Row className='vh-100'>
        <Col className='d-flex flex-column align-items-center justify-content-center text-center'>
            {
                loading?
                (<p>Please wait..</p>)
                    : 
                    error?
                        (<p>
                            <b>Verification Failed.</b><br/>
                            Please <Link to={'/register'}>re-register</Link> your account.
                        </p>)
                        :
                        (<p>
                            <b>Verification Successful.</b><br/>
                            You will be automatically redirected to login page or click <Link to={'/login'}>here</Link> to continue.
                        </p>)
            }
        </Col>
        </Row>
        </Container>
    </>)
}

export default Activation