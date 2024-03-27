import {Logo} from "../index"
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Button from "react-bootstrap/esm/Button"
import { Link, useNavigate } from "react-router-dom"
import styles from "./header.module.css"
import { BsSearch,BsCart3 } from "react-icons/bs";
import { useSelector,useDispatch } from "react-redux"
import { logout } from '../../redux/slices/user'
import { CgProfile } from "react-icons/cg"

const Header = ()=>{
    const user = useSelector((state)=>{return state.user})
    const dispatch = useDispatch()
    const navigate = useNavigate()

    return (
    <>
        {/* header login-signup */}
        <Row className='bg-orange  justify-content-end py-1'>
            <Col className='col-auto d-flex align-items-center'>
                <span className="text-white px-1">
                    {
                        user.isAuthenticated==true?(
                            <>
                            <Link className="text-decoration-none text-white " to={'/profile'}>
                                <span className="p-1 "><CgProfile color='white' size='20'/></span> 
                                <span>{user.userData.name}</span>
                            </Link> | 
                            <Link className="px-1 text-decoration-none text-white" to={'/logout'}> Logout</Link></>
                        ):(
                            <><Link className="px-1 text-decoration-none text-white" to={'/login'}>Login</Link> | 
                            <Link className="px-1 text-decoration-none text-white" to={'/register'}> Sign Up</Link></>
                        )
                    }
                </span>
            </Col>
        </Row>

        {/* header searchbar */}
        <Row className='bg-orange py-2 justify-content-center gy-3'>
            {/* logo */}
            <Col className='col-auto'>
                <Logo className='d-none' />
            </Col>
            <Col>
                {/* searchbar & menu */}    
                <Row className="flex-nowrap px-3">
                    <Col className='p-0 d-flex flex-column justify-content-center'>
                        <div className={`${styles.searchBar} mb-1 shadow-sm`}>
                            <Form className="d-flex">
                                <Form.Control className="border-0" type="text" name="search" placeholder="Daftar & Dapatkan Voucher Gratis"/>
                                    <Button className={`${styles.searchButton} btn btn-primary border-0`}><BsSearch/></Button>
                            </Form>
                        </div>
                        <div className="d-flex justify-content-center align-items-center text-center">
                            <Col><Link className="px-1 text-decoration-none text-white" to={'/home'}>Products</Link></Col>
                            <Col><Link className="px-1 text-decoration-none text-white" to={'/home'}>Events</Link></Col>
                            <Col><Link className="px-1 text-decoration-none text-white" to={'/home'}>Best Selling</Link></Col>
                            <Col><Link className="px-1 text-decoration-none text-white" to={'/home'}>Home</Link></Col>
                        </div>
                    </Col>
                    {/* Cart */}
                    <Col className='col-auto px-4 d-flex align-items-center justify-content-center'>
                        <div className="position-relative p-0">
                            <BsCart3 color='white' size='30'/>
                            <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                                99+
                            </span>
                        </div>
                    </Col>
                </Row>
            </Col>
        </Row>
    </>
    )
}

export default Header