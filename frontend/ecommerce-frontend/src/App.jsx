import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import {
    Login,
    Logout,
    Cart,
    Register,
    Error,
    HomePage,
    Activation,
    AppContainer,
    MainLayout,
    AccountLayout,
    Bestselling,
    Events,
    Products,
    ProductDetail,
    Protected,
    Checkout,
    Payment
} from './pages'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import Profile from './pages/user/account/components/profile'
import Orders from './pages/user/account/components/orders'
import { loadUser, updateUser } from './redux/slices/user'
import { createCart, loadCart } from './redux/slices/cart'
import SuccessPage from './components/notifPages/successPage'
import { PayPalScriptProvider } from '@paypal/react-paypal-js'
import NotFound from './errors/notFound'
import { Slide, ToastContainer } from 'react-toastify'

const router = createBrowserRouter([{
    path: '/',
    errorElement: <Error />,
    children: [{
        path: 'login',
        element: <Login />,
    },{
        path: 'register',
        element: <Register />,
    },{
        path: 'logout',
        element: <Logout />,
    },{
        path: 'register/activation/:token',
        element: <Activation />,
    }, {
        path: 'payment/success',
        element: <Protected><SuccessPage/></Protected>,
    },{
        path: '/',
        element: <AppContainer />,
        children: [
            {
                path: '/',
                element: <MainLayout />,
                children: [
                    {
                        // index:true,
                        path:'/',
                        element: <HomePage />
                    }, {
                        path: 'user/',
                        element: <Protected><AccountLayout /></Protected>,
                        children:[
                            {
                                index: true,
                                element: <Profile />
                            },
                            {
                                path:'orders',
                                element: <Orders />
                            }
                        ]
                    }, {
                        path: 'best-sellers',
                        element: <Bestselling />
                    }, {
                        path: 'events',
                        element: <Events />
                    },{
                        path: 'products',
                        element: <Products />
                    },{
                        index:true,
                        element: <Products />
                    }, {
                        path: 'products/:id',
                        element: <ProductDetail/>
                    }, {
                        path: 'cart',
                        element: <Protected><Cart/></Protected>,
                    }, {
                        path: 'checkout',
                        element: <Protected><Checkout/></Protected>,
                    }, {
                        path: 'payment',
                        element: <Protected><Payment/></Protected>,
                    }
                ]
            }
        ]
    }]
},{
    path:'*',
    element:<NotFound/>
}])

const App = () => {
    const dispatch = useDispatch()
    const {cartError,cartData} = useSelector((state)=>{return state.cart})
    const {userData,isAuthenticated} = useSelector((state)=>{return state.user})

    useEffect(() => {
            dispatch(loadUser())
            dispatch(loadCart())
    }, [cartData._id,userData._id])

    useEffect(()=>{
        if(cartError=='Cart not found'){
            dispatch(createCart(userData._id))
        }
        if(cartData._id && isAuthenticated && !userData.cartId){
            console.log('adding cart to user')            
            dispatch(updateUser({cartId:cartData._id}))
        }
            
    },[cartData._id,userData._id,cartError])

    return (<>
        <PayPalScriptProvider options={{ 
            clientId: "AQvyqBwM3U7jRILb7xxUnDYTdou3kFj8z-KvEWey2bJTV10AfZdi_VdR3YlEMbiG0Y4PZR-dxrAH1utn", 
            components: "buttons", 
            currency: "USD" }}>
            <ToastContainer
                position='bottom-center'
                autoClose={3000}
                theme='light'
                hideProgressBar={true}
                draggable={true}
                closeOnClick={true}
                closeButton={true}
                transition={Slide}
            />
            <RouterProvider router={router} />
        </PayPalScriptProvider>
    </>)
}

export default App