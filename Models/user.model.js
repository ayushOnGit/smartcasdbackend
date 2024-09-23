import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  userName: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  phoneNumber: { type: String, required: true },
  designation: { type: String, required: true },
  password: { type: String, required: true },
  role: { 
    type: String, 
    enum: ['TeamLead', 'Designer', 'User'], 
    default: 'User' 
  }
});

export default mongoose.model("User", userSchema);
