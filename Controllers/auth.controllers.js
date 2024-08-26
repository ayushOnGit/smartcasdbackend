import bcrypt from "bcryptjs";
import User from "../Models/user.model.js";
import generateWebTokens from "../utils/jwtTokenWithCookies.js";




const signupController = async (req, res) => {
  const { userName, fullName, password, confirmPassword, role } =
    req.body;
  try {
    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Password Don't match" });
    }
    const user = await User.findOne({ userName });

    if (user) {
      return res.status(401).json({ message: "User already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      userName,
      fullName,
      password: hashedPassword,
      role,
    });
    generateWebTokens(newUser._id, res);
    await newUser.save();
    res.status(201).json({ message: "signup successfull!!" });
  } catch (error) {
    console.log("signup controller causing error: ", error);
  }
};



const loginController = async (req, res) => {
  const { userName, password } = req.body;
  try {
    const user = await User.findOne({ userName });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    const isPasswordValid = await bcrypt.compare(
      password,
      user?.password || ""
    );
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    generateWebTokens(user._id, res);
    res.status(200).json({ message: "login successfull!!" });
  } catch (error) {
    console.log("login controller causing error: ", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const logoutController = async (req, res) => {
  try {
    res.cookie("token", "", {
      httpOnly: true,
      expires: new Date(0),
    });
    res.status(200).json({ message: "logout successfull!!" });
  } catch (error) {
    console.log("logout controller causing error: ", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export { loginController, signupController, logoutController };