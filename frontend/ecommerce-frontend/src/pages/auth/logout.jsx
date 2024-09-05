import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { logout } from "../../redux/slices/user"
import { useNavigate } from "react-router-dom"

const Logout = ()=>{
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {isAuthenticated} = useSelector((state)=>{return state.user})

    // TODO: fix logout
    useEffect(()=>{
        dispatch(logout())
    },[])
    
    useEffect(()=>{
        if(!isAuthenticated){
            navigate('/login')
        }
    },[isAuthenticated])
}

export default Logout