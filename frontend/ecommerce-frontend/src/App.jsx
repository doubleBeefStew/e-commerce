import { createBrowserRouter,RouterProvider } from 'react-router-dom'
import { Login,Register,Error,HomePage,Activation, AppContainer,MainLayout } from './pages'

import {useSelector,useDispatch} from 'react-redux'
import { useEffect } from 'react'
import { loadUser,setError } from './redux/slices/user'

const router = createBrowserRouter([{
    path:'/',
    element:<AppContainer/>,
    errorElement:<Error/>,
    children:[
        {
            path:'/',
            element:<MainLayout/>,
            children:[
            {
                index:true,
                element:<HomePage/>
            }]
        },{
            path:'login',
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
    const dispatch = useDispatch()
    const user = useSelector((state)=>{state.user})

    useEffect(()=>{
        const getUserData = async ()=>{
            try{
                await dispatch(loadUser())
            }catch(e){
                console.log(e)
                dispatch(setError('failed to load user data'))
            }
        }
        getUserData()
    },[])

    return <RouterProvider router={router} />
}

export default App