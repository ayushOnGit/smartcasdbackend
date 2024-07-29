import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    userName :{
        type: String,
        required: true,
        unique: true
    },
    fullName: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
    },
    confirmPassword: {
        type: String
    },
    role: {
        type: String,
        default: "visitor",
        Enum: ["visitor", "admin", "superAdmin", "user", "designer"]
    },
    IsDeleted: {
        type: Boolean,
        default: false
    }
})

export default mongoose.model("User", userSchema);