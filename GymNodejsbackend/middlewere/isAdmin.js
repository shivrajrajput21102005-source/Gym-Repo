export const isadmin=(...roles)=>{
    return(req,res,next)=>{

if(!roles.includes(req.user.role)){
    return res.status(400).json({code:"you are not admin lavde ke bal"})
}
next()
}}