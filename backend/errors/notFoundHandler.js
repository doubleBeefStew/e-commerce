const notFoundHandler = (req,res,next)=>{
    res.status(404).json({message:'requested resource not found'})
}

export default notFoundHandler