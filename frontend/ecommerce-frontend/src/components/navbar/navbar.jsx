import {Logo} from "../index"
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Button from "react-bootstrap/esm/Button"
import { Link } from "react-router-dom"
import styles from "./navbar.module.css"
import { BsSearch,BsCart3 } from "react-icons/bs";
import { IconContext } from "react-icons";

//TODO: fix navbar
const AppNav = ()=>{
    return (<>
        <Row className='navbar justify-content-end'>
            <Col className='col-auto'>
                <span className="text-white">
                    <Link className="px-1 text-decoration-none text-white" to={'/login'}>Login</Link> | 
                    <Link className="px-1 text-decoration-none text-white" to={'/register'}> Sign Up</Link>
                </span>
            </Col>
        </Row>
        <Row className='navbar'>
            <div className='col-auto'>
                <Logo className='d-none' />
            </div>
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
            <div className='col-auto px-4'>
                <BsCart3 color='white' size='30'/>
            </div>
        </Row>
    </>)
}

export default AppNav