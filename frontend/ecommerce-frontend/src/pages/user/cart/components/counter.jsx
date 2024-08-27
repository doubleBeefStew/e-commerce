import { useDispatch, useSelector } from "react-redux"
import { removeItem, updateItem,updateCart } from "../../../../redux/slices/cart"

const Counter = ({product})=>{
    const dispatch = useDispatch()

    return (<div className="input-group">
        <span className="input-group-btn">
            <button type="button" className="btn btn-default btn-number" onClick={async () => {
                if(product.quantity<=1){
                    dispatch(removeItem(product.productId))
                }else{
                    dispatch(updateItem({
                        ...product,
                        quantity: product.quantity - 1,
                    }))
                    dispatch(updateCart())
                }
            }}>
                <span className="">-</span>
            </button>
        </span>
        <input 
            value={product.quantity==""? 1 : product.quantity}
            type="number" 
            className="border border-0 text-center form-control-small" 
            style={{'width':'30px'}}
            onChange={async (event)=>{
                dispatch(updateItem({
                    ...product,
                    quantity: event.target.value,
                }))
                dispatch(updateCart())
            }}/>
        <span className="input-group-btn">
            <button type="button" className="btn btn-default btn-number" onClick={async () => {
                dispatch(updateItem({
                    ...product,
                    quantity: product.quantity + 1,
                }))
                dispatch(updateCart())
            }}>
                <span className="">+</span>
            </button>
        </span>
    </div>)
}

export default Counter