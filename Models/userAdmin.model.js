import mongoose from "mongoose";

const userAdminSchema = new mongoose.Schema({
    user_id: Number,
    lab_name: String,
    address_1: String,
    address_2: String,
    city: String,
    zip: String,
    country: String,
    state: String,
    other: String,
    date: Date,
    instruction: String,
    about: String,
    logo: String,
    contacts_preferences: String,
    occlusion_preferences: String,
    anatomy: String,
    pontic_preferences: String,
    liner_spacer_preferences: String,
    type_qc_image: Number,
    type_stl_file: Number,
    type_finish_file: Number,
    firstname: String,
    lastname: String,
    phone_code: Number,
    email: String,
    phone: String
});

export default mongoose.model("UserAdmin", userAdminSchema);
