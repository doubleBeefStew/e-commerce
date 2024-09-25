import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { logout, setLogout } from "../../redux/slices/user"
import { useNavigate } from "react-router-dom"
import Loading from "../../components/notifPages/loading"

const Logout = ()=>{
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {isAuthenticated,isLoadingUser} = useSelector((state)=>{return state.user})

    // TODO: fix logout
    useEffect(()=>{
        dispatch(setLogout())
        dispatch(logout())
    },[])
    
    useEffect(()=>{
        if(!isLoadingUser && !isAuthenticated){
            console.log(isLoadingUser)
            console.log(isAuthenticated)
            
            setTimeout(()=>{
                navigate('/login')
            },1000)
        }
    },[isLoadingUser])

    return <Loading/>
}

export default Logout