import { useEffect, useState } from 'react'
import axios from 'axios'

const App = ()=>{
    const [message, SetMessage] = useState('')

    useEffect(()=>{
        SetMessage('loading..')
        axios({
            url:'https://studious-couscous-x9gxvg999g2v5wx-3000.app.github.dev/api'
        })
            .then((res)=>{
                console.log(res.data.message)
                SetMessage(res.data.message)

            })
            .catch((err)=>{
                console.log(err.message)
                SetMessage(err.message)
            })
    },[])

    return (
        <>
            <h1>test application</h1>
            <h4>{message ? message : 'loading..'}</h4>
        </>
    )
}

export default App