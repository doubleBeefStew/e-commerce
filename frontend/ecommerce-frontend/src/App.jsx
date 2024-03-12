import { useEffect, useState } from 'react'
import axios from 'axios'

const App = ()=>{
    const [msg, SetMsg] = useState('')

    useEffect(()=>{
        SetMsg('loading..')
        axios({
            url:'https://studious-couscous-x9gxvg999g2v5wx-3000.app.github.dev/api'
        })
            .then((res)=>{
                console.log(res.data.msg)
                SetMsg(res.data.msg)

            })
            .catch((err)=>{
                console.log(err.message)
                SetMsg(err.message)
            })
    },[])

    return (
        <>
            <h1>test application</h1>
            <h4>{msg ? msg : 'loading..'}</h4>
        </>
    )
}

export default App