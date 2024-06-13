const Counter = ({qty})=>{
    return (<div className="input-group">
        <span className="input-group-btn">
            <button type="button" className="btn btn-default btn-number">
                <span className="">-</span>
            </button>
        </span>
        <input type="text" className="form-control input-number" width={500}/>
        <span className="input-group-btn">
            <button type="button" className="btn btn-default btn-number">
                <span className="">+</span>
            </button>
        </span>
    </div>)
}

export default Counter