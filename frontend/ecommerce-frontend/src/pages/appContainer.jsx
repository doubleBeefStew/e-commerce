import Container from "react-bootstrap/Container"
import { Outlet } from "react-router-dom"

const AppContainer = ()=>{
    return (
        <Container fluid>
        <Outlet/>
        </Container>
    )
}

export default AppContainer