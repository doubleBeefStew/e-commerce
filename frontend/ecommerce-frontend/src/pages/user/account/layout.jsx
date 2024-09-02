import Col from "react-bootstrap/Col"
import Row from "react-bootstrap/Row"
import { useSelector } from "react-redux"
import { useNavigate,Navigate, Outlet, Link } from "react-router-dom"

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
                    <Row className="vh-auto py-5 px-2 px-sm-5 gx-2">
                        <Col className="col-12 col-sm-2 vh-auto p-4 py-0">
                            <div className="d-flex flex-sm-column justify-content-around pb-2">
                                <Link className="text-decoration-none text-dark mb-3" to={""}>Profile</Link>
                                <Link className="text-decoration-none text-dark  mb-3" to={"orders"}>Orders</Link>
                        </div>
                        </Col>
                        <Col className="col-12 col-sm-10 vh-auto p-4 py-0">
                                <Outlet/>
                        </Col>
                    </Row>
                </>)
            )
        }
    </>)
}

export default AccountLayout