import {createBrowserRouter,RouterProvider} from 'react-router-dom'
import {Login,Register,Error, HomePage, Activation, AppContainer} from './pages'

const router = createBrowserRouter([{
    path:'',
    element:<AppContainer/>,
    errorElement:<Error/>,
    children:[
        {
            index:true,
            element:<HomePage/>,
        },{
            path:'/login',
            element:<Login/>,
        },{
            path:'register',
            element:<Register/>,
        },{
            path:'register/activation/:token',
            element:<Activation/>,
        }
    ]
}])

const App = ()=>{
    return <RouterProvider router={router} />
}

export default App