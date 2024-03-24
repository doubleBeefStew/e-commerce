import {Logo} from "../index"
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Button from "react-bootstrap/esm/Button"
import { Link } from "react-router-dom"
import styles from "./header.module.css"
import { BsSearch,BsCart3 } from "react-icons/bs";

const AppNav = ()=>{
    return (
    <>
        {/* header login-signup */}
        <Row className='bg-orange justify-content-end'>
            <Col className='col-auto'>
                <span className="text-white">
                    <Link className="px-1 text-decoration-none text-white" to={'/login'}>Login</Link> | 
                    <Link className="px-1 text-decoration-none text-white" to={'/register'}> Sign Up</Link>
                </span>
            </Col>
        </Row>

        {/* header searchbar */}
        <Row className='bg-orange py-2'>
            {/* logo */}
            <div className='col-auto'>
                <Logo className='d-none' />
            </div>

            {/* searchbar & menu */}
            <Col>
                <Row>
                    <Col className='p-0 d-flex flex-column justify-content-center'>
                        <div className={`${styles.searchBar} mb-1 shadow-sm`}>
                            <Form className="d-flex">
                                <Form.Control className="border-0" type="text" name="search" placeholder="Daftar & Dapatkan Voucher Gratis"/>
                                    <Button className={`${styles.searchButton} btn btn-primary border-0`}><BsSearch/></Button>
                            </Form>
                        </div>
                        <div className="d-flex justify-content-start align-items-center">
                                <Link className="px-1 text-decoration-none text-white" to={'/home'}>Home</Link>
                                <Link className="px-1 text-decoration-none text-white" to={'/home'}>Home</Link>
                                <Link className="px-1 text-decoration-none text-white" to={'/home'}>Home</Link>
                                <Link className="px-1 text-decoration-none text-white" to={'/home'}>Home</Link>
                        </div>
                    </Col>
                </Row>
            </Col>

            {/* cart */}
            <div className='col-auto px-4 d-flex align-items-center justify-content-center'>
                <div className="position-relative">
                    <BsCart3 color='white' size='30'/>
                    <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                        99+
                    </span>
                </div>
            </div>
        </Row>
    </>
    )
}

export default AppNav