import mongoose from "mongoose";
const UserSchema = new mongoose.Schema({
    email:
     { type: String,
       required: true,
        unique: true },
    password: 
    { type: String },
    name: 
    { type: String },
    authtype:
     { type: String, enum: ['manual', 'google'], default: 'manual' },
});

export default mongoose.model('User', UserSchema);
