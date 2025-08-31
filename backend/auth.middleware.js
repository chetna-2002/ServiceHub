import jwt from "jsonwebtoken";

export const authenticate = (req, res, next) => {
  try {
    // Token usually comes in headers.authorization = "Bearer <token>"
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "No token provided" });
    }

    const token = authHeader.split(" ")[1]; // extract actual token

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded; // attach user info to request object
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};







// import jwt from 'jsonwebtoken'


// export const authenticate= (req,res,next)=>{
//    try{
//     const token = req.headers.authorization
//     const decode = jwt.verify(token,process.env.JWT_SECRET)
// // decode is just a JavaScript object containing user info (from token payload).
// /*
// Request object ke andar user naam ka ek key bana do, jisme decoded user info ho.”

// Ab har route mein req.user se user ki info mil jayegi — bina database query ke.
// */
//     req.user= decode;
//     next();
//    }

// catch(error){
//     res.status(401).json({
//         message : "invalid credentials"
//     })
// }


// }