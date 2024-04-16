const customErrorHandler = (err,req,res,next)=>{
    let customError ={
        message: err.message || 'internal server error',
        statusCode: err.statusCode || 500,
        errorCode: err.errorCode || 'GNRL-500',
    }

    res.status(customError.statusCode)
        .json({
            error:{
                message:customError.message, 
                code:customError.errorCode
            }
        })
}

export default customErrorHandler