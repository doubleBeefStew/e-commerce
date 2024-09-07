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
import SuccessPage from './components/successPage/SuccessPage'

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
    },{
        path: '/',
        element: <AppContainer />,
        children: [
            {
                path: '/',
                element: <MainLayout />,
                children: [
                    {
                        index: true,
                        path: '/',
                        element: <HomePage />
                    }, {
                        path: 'user/',
                        element: <Protected><AccountLayout /></Protected>,//protected route + account page(sidebar & outlet)
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
                    }, {
                        path: 'products',
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
                    }, {
                        path: 'payment/success',
                        element: <Protected><SuccessPage/></Protected>,
                    }
                ]
            }
        ]
    }]
}])

const App = () => {
    const dispatch = useDispatch()
    const {cartError,cartData} = useSelector((state)=>{return state.cart})
    const {userData} = useSelector((state)=>{return state.user})

    //TODO: fix missing cart
    useEffect(() => {
            dispatch(loadUser())
            dispatch(loadCart())
    }, [cartData._id,userData._id])

    useEffect(()=>{
        if(cartError=='Cart not found'){
            dispatch(createCart(userData._id))
        }
        if(cartData._id && !userData.cartId){
            console.log('adding cart to user')
            
            dispatch(updateUser({cartId:cartData._id}))
        }
            
    },[cartData._id,userData._id,cartError])

    return <RouterProvider router={router} />
}

export default App