export const checkBlocked = (req,res,next) =>{
    if(req.user.isBlocked){
       return res.status(403).json( {error: "Your account has been blocked by admin",})
    }
    next();
}