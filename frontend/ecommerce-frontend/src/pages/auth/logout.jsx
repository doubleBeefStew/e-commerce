import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { logout } from "../../redux/slices/user"
import { useNavigate } from "react-router-dom"
import Loading from "../../components/notifPages/loading"

const Logout = ()=>{
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {isAuthenticated,isLoadingUser,setLogout} = useSelector((state)=>{return state.user})

    // TODO: fix logout
    useEffect(()=>{
        dispatch(setLogout())
        dispatch(logout())
    },[])
    
    useEffect(()=>{
        if(!isAuthenticated){
            navigate('/login')
        }
    },[isAuthenticated])

    return (<>
        { isLoadingUser && <Loading/> }
    </>)
}

export default Logout