// import userModel from "../models/userModel.js";
// import jwt from "jsonwebtoken";
// import bcrypt from "bcrypt";
// import validator from "validator";

// //Login User
// const loginUser = async (req, res) => {
//   const { name, password, email } = req.body;
//   try {
//     const user = await userModel.findOne({ email });
//     if (!user) {
//       res.json({ success: false, message: "User does not Exist" });
//     }
//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//       res.json({ success: false, message: "Incorrect Password" });
//     }

//     const token = createToken(user.id);
//     res.json({ success: true, token });
//   } catch (error) {
//     console.log(error);
//     res.json({ success: false, message: "Error" });
//   }
// };

// const createToken = (id) => {
//   return jwt.sign({ id }, process.env.JWT_SECRET);
// };

// //Register User
// const reigsterUser = async (req, res) => {
//   const { name, password, email } = req.body;
//   try {
//     // Checking USer Already Exists
//     const exists = await userModel.findOne({ email });
//     if (exists) {
//       return res.json({ success: false, message: "User Already Exists" });
//     }
//     // Validating Email Format & Strong Password
//     if (!validator.isEmail(email)) {
//       return res.json({
//         success: false,
//         message: "Please Enter a Valid Email",
//       });
//     }
//     if (password.length < 8) {
//       return res.json({
//         success: false,
//         message: "Please Enter a Strong Password",
//       });
//     }
//     // Hashing User Password
//     const salt = await bcrypt.genSalt(10);
//     const hashedPassword = await bcrypt.hash(password, salt);

//     const newUser = new userModel({
//       name: name,
//       email: email,
//       password: hashedPassword,
//     });

//     const user = await newUser.save();
//     const token = createToken(user._id);
//     res.json({ success: true, token });
//   } catch (error) {
//     console.log(error);
//     res.json({ success: false, message: "Error" });
//   }
// };

// export { loginUser, reigsterUser };

import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";

//Login User
const loginUser = async (req, res) => {
  const { password, email } = req.body;
  try {
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.json({ success: false, message: "User does not exist" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.json({ success: false, message: "Incorrect password" });
    }

    const token = createToken(user._id);
    res.json({ success: true, token });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET);
};

//Register User
const registerUser = async (req, res) => {
  const { name, password, email } = req.body;
  try {
    // Checking if user already exists
    const exists = await userModel.findOne({ email });
    if (exists) {
      return res.json({ success: false, message: "User already exists" });
    }
    // Validating email format & strong password
    if (!validator.isEmail(email)) {
      return res.json({
        success: false,
        message: "Please enter a valid email",
      });
    }
    if (password.length < 8) {
      return res.json({
        success: false,
        message: "Please enter a strong password",
      });
    }
    // Hashing user password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new userModel({
      name: name,
      email: email,
      password: hashedPassword,
    });

    const user = await newUser.save();
    const token = createToken(user._id);
    res.json({ success: true, token });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

export { loginUser, registerUser };
