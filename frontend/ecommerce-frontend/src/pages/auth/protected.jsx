import { useEffect } from "react"
import { useSelector } from "react-redux"
import { Navigate, useNavigate } from "react-router-dom"

const Protected = ({children})=>{
    const {isLoadingUser,isAuthenticated} = useSelector((state)=>{ return state.user })
    
    if(!isLoadingUser && !isAuthenticated){
        return <Navigate to={'/login'} replace/>
    }

    return children
}

export default Protected