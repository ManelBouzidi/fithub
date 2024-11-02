const adminMiddleware=(req,res,next)=>{
    if(req.user&&req.user.role==='admin'){
        next();
    }else{
        res0status(403).json({message:'Acces Only For admin Sorry :))))'})
    }
}

module.exports=adminMiddleware