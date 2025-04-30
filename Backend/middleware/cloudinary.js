import { v2 as cloudinary } from 'cloudinary';
import "dotenv/config"
async function uploadToCloudinary(req) {

    // Configuration
    cloudinary.config({
        cloud_name: process.env.CLOUD_NAME,
        api_key: process.env.API_KEY,
        api_secret: process.env.API_SECRET 
    });

    // Upload an image
    try {
        
        const uploadResult = await cloudinary.uploader
            .upload(req.file.path, {
                folder: "hackathon"
            })
        return uploadResult.secure_url
    }
    catch (error) {
        console.log(error);
    };
};

export default uploadToCloudinary;