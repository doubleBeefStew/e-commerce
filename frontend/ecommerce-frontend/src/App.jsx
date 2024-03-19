import {createBrowserRouter,RouterProvider} from 'react-router-dom'
import {Login,Register,LandingLayout,Error, Activation} from './pages'

const router = createBrowserRouter([{
    path:'/',
    element:<LandingLayout/>,
    errorElement:<Error/>,
    children:[{
        element:<Login/>,
        index:true,
    },{
        path:'register',
        element:<Register/>,
    },{
        path:'register/activation/:token',
        element:<Activation/>,
    },{
        path:'login',
        element:<Login/>
    }]
}])

const App = ()=>{
    return <RouterProvider router={router} />
}

export default App