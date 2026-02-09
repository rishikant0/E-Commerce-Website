import dotenv from "dotenv";
dotenv.config();   // <-- REQUIRED

import validator from 'validator';
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";

// Create token function
const createToken = (id) => {
  if (!process.env.JWT_SECRET_KEY) {
    throw new Error("JWT_SECRET_KEY is not set in environment variables");
  }
  const secret = process.env.JWT_SECRET_KEY;
  const payload = { id };
  const token = jwt.sign(payload, secret);
  console.log("===== TOKEN CREATION =====");
  console.log("🔑 Secret used:", secret);
  console.log("🔑 Secret length:", secret.length);
  console.log("🔑 Secret chars:", [...secret].map(c => c.charCodeAt(0)).join(','));
  console.log("📝 Payload:", payload);
  console.log("🎫 Created token:", token.substring(0, 50) + "...");
  console.log("===== END TOKEN CREATION =====");
  return token;
};

// ---------------- LOGIN USER ----------------
const loginUser = async (req, res) => {
  try{
  const {email,password} = req.body;

  const user = await userModel.findOne({email});
  if(!user){
    return res.json({ success: false, message: "User doesn't  exists" });
  }
 
  // if email and password will match it mean user already register
  const isMatch = await bcrypt.compare(password,user.password);

  if (isMatch){
    const token = createToken(user._id)
    res.json({success:true,token})
  }
  else{
    res.json({success:false,message:"Invalid credentials"})
  }
  }catch(error){
    console.log(error);
    res.json({ success: false, message: error.message });

  }
};

// ---------------- REGISTER USER ----------------
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // FIXED: Correct check
    const exists = await userModel.findOne({ email });

    if (exists) {
      return res.json({ success: false, message: "User already exists" });
    }

    // Email validation
    if (!validator.isEmail(email)) {
      return res.json({ success: false, message: "Please enter a valid email" });
    }

    // Password validation
    if (password.length < 8) {
      return res.json({ success: false, message: "Please enter strong password" });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user
    const newUser = new userModel({
      name,
      email,
      password: hashedPassword
    });

    const user = await newUser.save();

    const token = createToken(user._id);

    res.json({ success: true, token });

  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// ---------------- ADMIN LOGIN ----------------
const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (
      email === process.env.ADMIN_EMAIL &&
      password === process.env.ADMIN_PASSWORD
    ) {
      // Sign a predictable object payload so verification is consistent
      const token = jwt.sign({ data: email + password }, process.env.JWT_SECRET_KEY);
      return res.json({ success: true, token });
    } else {
      return res.json({ success: false, message: "Invalid admin credentials" });
    }

  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};




// ------------ GET USER PROFILE ------------
const getUserProfile = async (req, res) => {
  try {
    const userId = req.userId;
    console.log("🔍 Getting profile for user:", userId);

    const user = await userModel.findById(userId).select("-password");
    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }

    res.json({ success: true, user });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// ------------ UPDATE USER PROFILE --------
const updateUserProfile = async (req, res) => {
  try {
    const userId = req.userId;
    const { name, email } = req.body;

    console.log("✏️ Updating profile for user:", userId);

    const user = await userModel.findById(userId);
    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }

    // Check if email is being changed and if it already exists
    if (email && email !== user.email) {
      const emailExists = await userModel.findOne({ email });
      if (emailExists) {
        return res.json({ success: false, message: "Email already in use" });
      }
    }

    // Update fields
    if (name) user.name = name;
    if (email) user.email = email;

    const updatedUser = await user.save();

    res.json({ success: true, user: updatedUser.toObject({ virtuals: false }) });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};


export { loginUser, registerUser, adminLogin, getUserProfile, updateUserProfile };
