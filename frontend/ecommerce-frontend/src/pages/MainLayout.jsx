import { Outlet } from "react-router-dom"
import { Header } from "../components"

// layout isi header + outlet + footer
const MainLayout = ()=>{
    return (
        <>
            <Header/>
            <div className="pt-3">
                <Outlet/>
            </div>
        </>
    )
}

export default MainLayout