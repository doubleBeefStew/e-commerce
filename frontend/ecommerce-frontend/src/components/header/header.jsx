import {Logo} from "../index"
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Button from "react-bootstrap/Button"
import { createSearchParams, Link, useNavigate } from "react-router-dom"
import styles from "./header.module.css"
import { BsSearch,BsCart3 } from "react-icons/bs";
import { useSelector } from "react-redux"
import { CgDropInvert, CgProfile } from "react-icons/cg"
import ProfilePicture from "../profilePicture/profilePicture"
import { useEffect, useState } from "react"

//TODO: make header sticky when scrolling
const Header = ()=>{
    const {userData,isAuthenticated} = useSelector((state)=>{return state.user})
    const {isLoadingCart,cartData} = useSelector((state)=>{ return state.cart })
    const [formData, setFormData] = useState({ keyword: '', sort: 'asc' });
    const imageUrl= userData.avatar?.url
    const navigate = useNavigate()

    const handleChange = (e)=>{
        setFormData({...formData,keyword:e.target.value})
    }

    const handleSubmit = (e)=>{
        e.preventDefault()

        const searchData = {
            keyword: formData.keyword,
            sort:formData.sort || 'asc'
        }

        setFormData({ keyword: '', sort: 'asc' })
        
        navigate({
            pathname: '/products',
            search: createSearchParams(searchData).toString()
        })
    }

    return (
    <>
        {/* header login-signup */}
        <Row className='bg-orange justify-content-end py-1'>
            <Col className='col-auto d-flex align-items-center justify-content-center no-wrap'>
                {
                    isAuthenticated &&
                        (userData.avatar?
                            <ProfilePicture className='d-inline' image={imageUrl} size={'1rem'}/>:
                            <CgProfile color='white' size='20'/>
                        )

                }
                <span className="text-white px-1">
                    {
                        isAuthenticated ? (
                            <>
                            <Link className="text-decoration-none text-white " to={'user/'}>
                                
                                <span>{userData.name}</span>
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
                <Link to={'/'} className='text-decoration-none d-flex align-items-center'>
                    <span className="text-white me-2 fw-bold fredoka-500 fs-1"><i>DealDash!</i></span>
                    <img src="pricetag.svg" height={40} width={40} style={{filter:'invert(100%)'}}/>
                </Link>
            </Col>
            <Col>
                {/* searchbar & menu */}    
                <Row className="flex-nowrap px-3">
                    <Col className='p-0 d-flex flex-column justify-content-center'>
                        <div className={`${styles.searchBar} mb-1 shadow-sm`}>
                            <Form className="d-flex" onSubmit={handleSubmit}>
                                <Form.Control 
                                    className="border-0" 
                                    type="text" 
                                    name="search" 
                                    value={formData.keyword}
                                    onChange={handleChange}
                                    placeholder="Register & get Discount Vouchers for Free!"/>
                                    <Button type="submit" className={`${styles.searchButton} btn btn-primary border-0`}><BsSearch/></Button>
                            </Form>
                        </div>
                        {/* <div className="d-flex justify-content-center align-items-center text-center">
                            <Col><small><Link className="px-1 text-decoration-none text-white" to={'/'}>Home</Link></small></Col>
                            <Col><small><Link className="px-1 text-decoration-none text-white" to={'/events'}>Events</Link></small></Col>
                            <Col><small><Link className="px-1 text-decoration-none text-white" to={'/best-sellers'}>Best Selling</Link></small></Col>
                            <Col><small><Link className="px-1 text-decoration-none text-white" to={'/products'}>Products</Link></small></Col>
                        </div> */}
                    </Col>
                    {/* Cart */}
                    <Col className='col-auto px-4 d-flex align-items-center justify-content-center'>
                        <div className="position-relative p-0">
                            <Link to={'/cart'}>
                                <BsCart3 color='white' size='30'/>
                                {
                                    (!isLoadingCart && cartData.products?.length > 0) && 
                                    <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                                        { (cartData.products?.length > 99 ? '99+' : cartData.products?.length) }
                                    </span>
                                }
                            </Link>
                        </div>
                    </Col>
                </Row>
            </Col>
        </Row>
    </>
    )
}

export default Header