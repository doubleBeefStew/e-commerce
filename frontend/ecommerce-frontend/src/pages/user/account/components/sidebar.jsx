
import { Link } from "react-router-dom"

const AccountSideBar = ()=>{
    return(<>
        
        <Link className="text-decoration-none text-dark" to={'/'}>Profile</Link>
        <Link className="text-decoration-none text-dark" to={'/'}>Orders</Link>
        </>)
}

export default AccountSideBar