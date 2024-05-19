import jwt from 'jsonwebtoken';
import { ACCESS_SECRET} from '../config/index.mjs';

const auth= async(req,res,next)=>{
    
    let authHeader=req.headers.authorization.split(" ");
    
    let token=authHeader[1];
    // console.log(token)
    if(!token)
        {
            res.json("invalid user . token not found ");
        }
    try {
        let user=jwt.verify(token,ACCESS_SECRET);
        // console.log(user)
        req.user=user;
        
        next();
        
    } catch (error) {
        console.log(error);
        res.status(401).json(error)
        
    }
}  
export default auth;

    