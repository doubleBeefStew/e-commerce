import Col from "react-bootstrap/Col"
import Row from "react-bootstrap/Row"
import { useSelector } from "react-redux"
import { useNavigate,Navigate, Outlet } from "react-router-dom"
import AccountSideBar from "./components/sidebar"

const AccountLayout = ()=>{
    const navigate = useNavigate()
    const {isLoadingUser,userData} = useSelector((state)=>{
        return state.user
    })

    return (<>
        {
            isLoadingUser?
                <p>loading..</p>: //make loader component
            (!userData ?
                <Navigate to={'/'} replace/>:
                (<>
                    <Row className="vh-auto py-5 px-5">
                        <Col className="bg-transparent vh-auto p-3 col-2">
                            <AccountSideBar/>
                        </Col>
                        <Col className={'bg-white vh-auto p-3 col-10'}>
                            <Outlet/>
                        </Col>
                    </Row>
                </>)
            )
        }
    </>)
}

export default AccountLayout