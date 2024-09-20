import jwt from 'jsonwebtoken';
import User from '../models/youtube/user.model.js';
export const verifyJWT = async (req, res, next) => {
const accessToken=req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ","");

try {
    if(!accessToken) throw new Error('User not authenticated');
    
    const decodedToken=await jwt.verify(accessToken,process.env.ACCESS_TOKEN_SECRET);
      
       const user=await User.findById(decodedToken?._id).select('-password -refreshToken');
        if(!user) throw new Error('User not authenticated');
    
        req.user=user;
        next();
} catch (error) {
    res.status(401).json({success:false,message:error.message||"invalid access token"});
    
}
}
