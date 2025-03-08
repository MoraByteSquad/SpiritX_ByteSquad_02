import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Username is required"],
    trim: true,
    unique: true,
    minLength: [8, "Username must be at least 8 characters long"],
    maxLength: [50, "Username cannot exceed 50 characters"],
    index: true,
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    minlength: 8,
  },
  isAdmin: {
    type: Boolean,
    required: [true, "isAdmin is required"],
    default: false,
  },
}, {
  timestamps: true,
});

const User = mongoose.model("User", userSchema);

export default User;