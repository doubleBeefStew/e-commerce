const customErrorHandler = (err,req,res,next)=>{
    let customError ={
        message: err.message || 'internal server error',
        statusCode: err.statusCode || 500
    }

    res.status(customError.statusCode).json({message:customError.message})
}

export default customErrorHandler