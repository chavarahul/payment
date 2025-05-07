import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    pin: { type: String, required: true },
    uniquePin : { type : String }
},
    { timestamps: true }
);

const User = mongoose.model('User', userSchema);

export default User;



