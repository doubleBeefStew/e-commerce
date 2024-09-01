import Col from "react-bootstrap/Col"
import Row from "react-bootstrap/Row"
import Nav from 'react-bootstrap/Nav'
import Tab from 'react-bootstrap/Tab'
import { useSelector } from "react-redux"
import { useNavigate,Navigate } from "react-router-dom"
import Profile from "./components/profile"
import Orders from "./components/orders"

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
                <Tab.Container id="left-tabs-example" defaultActiveKey="first">
                    <Row className="vh-auto py-5 px-2 px-sm-5 gx-2">
                        <Col className="col-12 col-sm-2 bg-white vh-auto p-4">
                            <div className="d-flex flex-column">
                            <Nav.Item className="pb-3">
                                <Nav.Link eventKey="first">Profile</Nav.Link>
                            </Nav.Item>
                            <Nav.Item className="pb-3">
                                <Nav.Link eventKey="second">Orders</Nav.Link>
                            </Nav.Item>
                        </div>
                        </Col>
                        <Col className="col-12 col-sm-10 bg-white vh-auto p-4">
                            <Tab.Content>
                                <Tab.Pane eventKey="first"><Profile /></Tab.Pane>
                                <Tab.Pane eventKey="second"><Orders /></Tab.Pane>
                            </Tab.Content>
                        </Col>
                    </Row>
                </Tab.Container>
                </>)
            )
        }
    </>)
}

export default AccountLayout