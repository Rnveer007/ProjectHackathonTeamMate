import fs from 'fs';
import Form from "../models/formModel.js";
import uploadToCloudinary from "../middleware/cloudinary.js";

export async function submitForm(req, res) {
  try {
    const file = req.file;

    // 1) Ensure multer processed the file and it's an image
    if (!file || !file.mimetype.startsWith("image/")) {
      return res
        .status(400)
        .json({ message: "Invalid file type. Please upload an image." });
    }

    // 2) Destructure required fields from request body
    const { name, description, mode, date, registrationLink, hackathon } = req.body;

    // 3) Validate required fields
    if (!name || !description || !mode || !date || !registrationLink || !hackathon) {
      return res.status(400).json({
        message: "Missing required fields: name, description, mode, date, registrationLink, or hackathon."
      });
    }

    // 4) Upload local file to Cloudinary and get URL
    const imageUrl = await uploadToCloudinary(file.path);

    // 5) Delete the local file after successful upload
    fs.unlink(file.path, (err) => {
      if (err) console.error('Error deleting local file:', err);
    });

    // 6) Save form data in database with Cloudinary URL
    const newForm = await Form.create({
      name,
      description,
      mode,
      date,
      registrationLink,
      hackathon,
      image: imageUrl
    });

    // 7) Return success response
    return res.status(201).json({
      success: true,
      message: "Form submitted successfully.",
      data: newForm
    });
  } catch (error) {
    console.error(error.stack);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message
    });
  }
}
