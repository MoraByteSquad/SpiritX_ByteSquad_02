import mongoose from "mongoose";
import UserTeam from "./userTeam.model.js";

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

userSchema.post("save", async function (doc, next) {
  try {
    const userTeam = new UserTeam({ 
      userId: doc._id,
      remainingBudget: 9000000,
      teamSize: 0,
    });

    await userTeam.save();

    next();
  } catch (error) {
    next(error);
  }
});

const User = mongoose.model("User", userSchema, "users");

export default User;