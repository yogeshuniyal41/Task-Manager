// import jwt from 'jsonwebtoken';
// import { refreshToken } from '../models/index.mjs';
// import { ACCESS_SECRET, REFRESH_SECRET } from '../config/index.js';


// const refreshController=async(req,res)=>{
//     let token = req.body.token;
//       if(!token)
//         {
//             res.json({'error':"no token"});
//         }
    
//     let old_refresh_token= await refreshToken.findOne({token});
  
//     try {
//         let {_id}= await jwt.verify(token,REFRESH_SECRET);
//         refreshToken.deleteOne({old_refresh_token});

//         let new_refresh_token= jwt.sign(_id,REFRESH_SECRET,'10h');
//         let access_token = jwt.sign(_id,ACCESS_SECRET,'1h');
//         await refreshToken.create({token:new_refresh_token});
//         res.status(200).json({'access token':access_token,'refresh token':new_refresh_token})
        

        
//     } catch (error) {
//         res.json(error)
//     }
    
// }
// export default refreshController
import jwt from 'jsonwebtoken';
import { refreshToken } from '../models/index.mjs';
import dotenv from 'dotenv';
dotenv.config();
let ACCESS_SECRET = process.env.ACCESS_SECRET;
let REFRESH_SECRET= process.env.REFRESH_SECRET;


const refreshController = async (req, res) => {
    const token = req.body.token;
    // console.log(req.body);

    if (!token) {
        return res.status(400).json({ error: "No token provided" });
    }

    try {
        // Verify the provided refresh token
        // console.log("token received");
        // console.log(token)
        const payload = await jwt.verify(token, REFRESH_SECRET);
        // console.log(payload)
        // Find the old refresh token in the database
        const oldTokenRecord = await refreshToken.findOne({ token });

        if (!oldTokenRecord) {
            return res.status(404).json({ error: "Invalid refresh token" });
        }

        // Delete the old refresh token from the database
        

        // Generate a new refresh token and access token
        const newRefreshToken = jwt.sign(payload, REFRESH_SECRET);
        const accessToken = jwt.sign(payload, ACCESS_SECRET);

        // Save the new refresh token in the database
        await refreshToken.create({ token: newRefreshToken });
         await refreshToken.deleteOne({ _id: oldTokenRecord._id });
        // Return the new tokens to the client
        
       
        return res.status(200).json({
            accessToken,
            refreshToken: newRefreshToken,
        });
    } catch (error) {
        console.error(error)
        return res.status(500).json({ error: "Internal server error" });
    }
};

export default refreshController;
