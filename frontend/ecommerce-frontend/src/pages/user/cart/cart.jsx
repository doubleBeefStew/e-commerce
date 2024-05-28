import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/esm/Col'
import { useEffect } from "react"
import { useSelector,useDispatch } from "react-redux"
import { loadCart } from "../../../redux/slices/cart"

const Cart = ()=>{
    const {isLoadingCart,cartData} = useSelector((state)=>{ return state.cart })
    const {userData} = useSelector((state)=>{ return state.user })
    const dispatch = useDispatch()

    useEffect(() => {
            dispatch(loadCart())
            console.log(cartData)
    }, [])

    return (<>
    {
        isLoadingCart?
        <p>loading..</p>:
        (
            (!cartData || cartData.products.length==0)?
            <p>no item</p>:
            (<>
                <Row className="vh-auto py-5 px-2 px-sm-5 flex-column">
                    {
                        cartData.products?.map((item)=>{
                            <div key={item._id}>
                                <p></p>
                            </div>
                        })
                    }
                </Row>
            </>)
        )
    }
    </>)
}

export default Cart