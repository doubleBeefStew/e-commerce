const Counter = ({qty})=>{
    return (<div className="input-group">
        <span className="input-group-btn">
            <button type="button" className="btn btn-default btn-number">
                <span className="">-</span>
            </button>
        </span>
        <input 
            value={Number(qty)? qty:0}
            type="text" 
            className="input-number border border-0" 
            style={{'width':'30px'}}
            onChange={()=>{console.log('value')}}/>
        <span className="input-group-btn">
            <button type="button" className="btn btn-default btn-number">
                <span className="">+</span>
            </button>
        </span>
    </div>)
}

export default Counter