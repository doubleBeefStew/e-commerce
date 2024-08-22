import { useDispatch, useSelector } from "react-redux"
import { removeItem, setQuantity,updateCart } from "../../../../redux/slices/cart"

const Counter = ({product})=>{
    const dispatch = useDispatch()
    const {cartData} = useSelector((state)=>{
        return state.cart
    })

    return (<div className="input-group">
        <span className="input-group-btn">
            <button type="button" className="btn btn-default btn-number" onClick={() => {
                if(product.quantity<=1){
                    dispatch(removeItem(product.productId))
                }else{
                    dispatch(setQuantity({
                        productId: product.productId,
                        quantity: product.quantity - 1
                    }))
                    dispatch(updateCart(JSON.parse(localStorage.getItem('cartData')).products))
                }
            }}>
                <span className="">-</span>
            </button>
        </span>
        <input 
            value={product.quantity}
            type="text" 
            className="input-number border border-0" 
            style={{'width':'30px'}}
            onChange={()=>{console.log('value')}}/>
        <span className="input-group-btn">
            <button type="button" className="btn btn-default btn-number" onClick={() => {
                dispatch(setQuantity({
                    productId: product.productId,
                    quantity: product.quantity + 1
                }))
                dispatch(updateCart(JSON.parse(localStorage.getItem('cartData')).products))
            }}>
                <span className="">+</span>
            </button>
        </span>
    </div>)
}

export default Counter