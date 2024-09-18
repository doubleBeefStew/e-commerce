import Col from "react-bootstrap/Col"
import Row from "react-bootstrap/Row"
import Container from "react-bootstrap/Container"
import { Link, useNavigate, useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import axios from "axios"
import Loading from "../../components/notifPages/loading"
import success from '../../assets/animations/thumbsup.json'
import error from '../../assets/animations/error.json'
import Lottie from "lottie-react"

const Activation = ()=>{
    const {token} = useParams()
    const [error,setError]=useState(true)
    const [loading,setLoading]=useState(true)
    const navigate = useNavigate()
    const style = { height: '30%' }


    useEffect(()=>{
        const createUser = async ()=>{
            try{
                setLoading(true)
                
                if(token){
                    const user = await axios.get(`${import.meta.env.VITE_API_URL}/auth/activation/${token}`)

                    setError(false)
                    setLoading(false)

                    setTimeout(()=>{
                        navigate('/login')
                    },5000)
                }else{
                    setError(true)
                    setLoading(false)
                }
            }catch(e){
                (err)=>{
                    setError(true)
                    setLoading(false)
                    console.log(err)
                }
            }
        } 
        createUser()
    },[])

    return (<>
    {
        loading? <Loading/> : 
        <Container>
            <Row className='vh-100'>
                <Col className='d-flex flex-column align-items-center justify-content-center text-center'>
                    {
                        error?
                            (<>
                                <Lottie style={style} animationData={error} loop={false}/>
                                <h1>Verification Failed.</h1>
                                <p>Please <Link to={'/register'}>re-register</Link> your account.</p>
                            </>)
                            :
                            (<>
                                <Lottie style={style} animationData={error} loop={false}/>
                                <h1>Verification Successful.</h1>
                                <p>You will be automatically redirected to login page or click <Link to={'/login'}>here</Link> to continue.</p>
                            </>)
                    }
                </Col>
            </Row>
        </Container>
    }
    </>)
}

export default Activation