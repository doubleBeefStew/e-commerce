import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import {
    Login,
    Logout,
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
    Protected
} from './pages'

import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { loadUser } from './redux/slices/user'
import Profile from './pages/user/account/components/profile'

const router = createBrowserRouter([{
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
        errorElement: <Error />,
        children: [
            {
                path: '/',
                element: <MainLayout />,
                children: [
                    {
                        index: true,
                        element: <HomePage />
                    }, {
                        path: 'user/account',
                        element: <Protected><AccountLayout /></Protected>,//protected route + account page(sidebar & outlet)
                        children:[
                            {
                                index: true,
                                element: <Profile />
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
                    }
                ]
            }
        ]
    }])

const App = () => {
    const dispatch = useDispatch()

    useEffect(() => {
            dispatch(loadUser())
    }, [])

    return <RouterProvider router={router} />
}

export default App