export const getUser = (req,res,next)=>{

    //TODO: need authentication middleware? what is this controller used for?
    const {id} = req.params
    console.log(req.params);
    res.status(200).json({output:{message:'OK',userId:id}})
}