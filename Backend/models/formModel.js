import mongoose from "mongoose";

const formSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    mode: {
        type: String,
        enum: ["offline", "online"],
    },
    description: {
        type: String,
    },
    date: {
        type: Date,
        // required: true
    },
    registrationLink: {
        type: String,
        // required: true
    },
    hackathonLink: {
        type: String,
        // required: true
    },
    image: {
        type: String,
        // required: true
    }
}, { timestamps: true }) // Adds createdAt and updatedAt fields.

const Form = mongoose.model('Form', formSchema)
export default Form