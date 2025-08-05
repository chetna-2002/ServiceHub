import jwt from 'jsonwebtoken'


export const authenticate= (req,res,next)=>{
   try{
    const token = req.headers.token
    const decode = jwt.verify(token,process.env.JWT_SECRET)
// decode is just a JavaScript object containing user info (from token payload).
/*
Request object ke andar user naam ka ek key bana do, jisme decoded user info ho.”

Ab har route mein req.user se user ki info mil jayegi — bina database query ke.
*/
    req.user= decode;
    next();
   }

catch(error){
    res.status(401).json({
        message : "invalid credentials"
    })
}


}