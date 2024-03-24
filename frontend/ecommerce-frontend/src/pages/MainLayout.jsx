import { Outlet } from "react-router-dom"
import { Header } from "../components"

// layout isi header + outlet + footer
const MainLayout = ()=>{
    return (
        <>
            <Header/>
            <Outlet/>
        </>
    )
}

export default MainLayout