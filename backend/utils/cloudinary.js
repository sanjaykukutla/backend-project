import {v2 as cloudinary} from 'cloudinary';
import fs from 'fs';
import dotenv from 'dotenv';
dotenv.config();


cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET // Click 'View API Keys' above to copy your API secret
});

const uploadOnCloudinary = async (file) => {
    try {
        if(!file) return null;
        //upload the file on cloudinary
        const response = await cloudinary.uploader.upload(file,{
            resource_type: 'auto',
        })
        //file has been uploaded successfully
        //console.log('File uploaded successfully on cloudinary',response.url);
        fs.unlinkSync(file);
        return response;
    } catch (error) {
        //console.log(error.message);
        fs.unlinkSync(file); //remove the file from the server as upload operation failed
        return null;

    }
}

export {uploadOnCloudinary};