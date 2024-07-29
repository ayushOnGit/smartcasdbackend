import mongoose from "mongoose";
const Schema = mongoose.Schema;

const labUserSchema = new Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    role: { type: String, required: true }
  });

const labSchema = new Schema({
  labName: { type: String, required: true },
  contact: {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    // phone: { type: String, required: true },
    password: { type: String, required: true },
    countryCode: { type: String, required: true },
    phone1: { type: String },
    phone2: { type: String },
    phone3: { type: String }
  },
  address: {
    address1: { type: String, required: true },
    address2: { type: String },
    zip: { type: String, required: true },
    country: { type: String, required: true },
    state: { type: String, required: true },
    city: { type: String, required: true }
  },
  coupon: { type: String },
  scanners: {
    dentalWings: { type: Boolean, default: false },
    threeShape: { type: Boolean, default: false },
    iTeroSTL: { type: Boolean, default: false },
    sironaInEOSSTL: { type: Boolean, default: false },
    other: { type: Boolean, default: false }
  },
  users: [labUserSchema]  // Array of lab users
});

export default mongoose.model("Lab", labSchema);