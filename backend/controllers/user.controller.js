import {asyncHandler} from '../utils/asyncHandler.js';
import {User} from '../models/youtube/user.model.js';
import {uploadOnCloudinary} from '../utils/cloudinary.js';

const generateAccessAndRefreshTokens = async(userId)=>{
    try {
        const user=await User.findById(userId);
        const accessToken=await user.generateAccessToken();
        const refreshToken=await user.generateRefreshToken();
        user.refreshToken=refreshToken;
        await user.save({validateBeforeSave:false});
        return {accessToken,refreshToken};
    } catch (error) {
        throw new Error('Token generation failed');
    }
}

const registerUser = asyncHandler(async(req,res)=>{
   //get user details from frontend
   const {fullname,email,username,password}=req.body;
   console.log("email",email,"username",username,"password",password);
   
   //validation of details

   if([fullname,email,username,password].some(
    (field)=> field?.trim() === "")){
        throw new Error('Please fill all fields correctly');
    }

   //check if already exists
   const existedUser= await User.findOne({
    $or:[{email},{username}]
});


if(existedUser) throw new Error('User already exists');

 //check for images ,check for avatar

const avatarLocalPath=req.files?.avatar[0]?.path;
const coverImageLocalPath=req.files?.coverImage[0]?.path;
//console.log(req.files.avatar[0].path);
//console.log(avatarLocalPath);
if(!avatarLocalPath) throw new Error('Please upload an avatar image');

    //upload them to cloudinary,avatar
    const avatarResponse=await uploadOnCloudinary(avatarLocalPath);
    if(!avatarResponse) throw new Error('Avatar upload failed');
    const coverImageResponse=await uploadOnCloudinary(coverImageLocalPath);
    //create user object -create entry in db
     const user=await User.create(
        {
            fullname,
            email,
            username:username.toLowerCase(),
            password,
            avatar:avatarResponse.url,
            coverImage:coverImageResponse?.url||"",

        }
     )
    //remove password and refresh token from response
    const createdUser=await User.findById(user._id).select("-password -refreshToken");
    if(!createdUser) throw new Error('User creation failed');

    // check for user crestion
    //return res
    res.status(200).json({createdUser});

})

const loginUser = asyncHandler(async(req,res)=>{
    //get user details from frontend from req.body
    //username or email and password
    //find the user
    //check for password
    //access and refresh token
    //send cookies

    const {username,email,password}=req.body;

    if(!username&&!email) throw new Error('Please provide username or email');
    if(!password) throw new Error('Please provide password');

    const user=await User.findOne({
        $or:[{username},{email}]
    });
    if(!user) throw new Error('User does not exist');
    //check password
    const isPasswordCorrect=await user.isPasswordCorrect(password);
    if(!isPasswordCorrect) throw new Error('Password is incorrect');

    //generate access and refresh tokens
    const {accessToken,refreshToken}=await generateAccessAndRefreshTokens(user._id);
    //send cookies
    const loggedInUser=await User.findById(user._id).select("-password -refreshToken");

    const options={
        httpOnly:true,
        secure:true,
    }
    return res.status(200)
    .cookie('accessToken',accessToken,options)
    .cookie('refreshToken',refreshToken,options)
    .json({user:loggedInUser,accessToken,refreshToken,
        message:'User logged in successfully'});
});

const logOutUser=asyncHandler(async(req,res)=>{
    const userToLogOut=await User.findByIdAndUpdate(req.user._id,
        {
            $set:{refreshToken: undefined},
        },
            {new:true},
    );
    const options={
        httpOnly:true,
        secure:true,
    }
    return res.status(200)
          .clearCookie('accessToken',options)
          .clearCookie('refreshToken',options)
            .json({message:'User logged out successfully'}); 
})

export {registerUser,loginUser,logOutUser};