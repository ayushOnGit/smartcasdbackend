import bcrypt from "bcryptjs";
import User from "../Models/user.model.js";
import generateWebTokens from "../utils/jwtTokenWithCookies.js";



const signupController = async (req, res) => {
  const { userName, email, phoneNumber, designation, password, confirmPassword, role } = req.body;

  console.log("Request body: ", req.body);

  try {
    if (!password || !confirmPassword) {
      return res.status(400).json({ message: "Password and Confirm Password are required" });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords don't match" });
    }

    const existingUser = await User.findOne({ $or: [{ userName }, { email }] });
    if (existingUser) {
      return res.status(401).json({ message: "User with this username or email already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      userName,
      email,
      phoneNumber,
      designation,
      password: hashedPassword,
      role
    });

    await newUser.save();

    generateWebTokens(newUser._id, res);

    res.status(201).json({ message: "Signup successful!" });
  } catch (error) {
    console.error("Signup controller error: ", error);
    res.status(500).json({ message: "Server error" });
  }
};






// const loginController = async (req, res) => {
//   const { userName, password } = req.body;
  
//   try {
//     const user = await User.findOne({ userName });
//     if (!user) {
//       return res.status(401).json({ message: "Invalid credentials" });
//     }
//     const isPasswordValid = await bcrypt.compare(
//       password,
//       user?.password || ""
//     );
    
//     if (!isPasswordValid) {
//       return res.status(401).json({ message: "Invalid credentials" });
//     }
//     generateWebTokens(user._id, res);
//     res.status(200).json({ 
//       message: "Login successful!", 
//       role: user.role // Sending the user's role in the response
//     });
    
//   } catch (error) {
//     console.log("login controller causing error: ", error);
//     res.status(500).json({ message: "Internal server error" });
//   }
// };


// const loginController = async (req, res) => {
//   const { email, password } = req.body;
//   console.log('requested body for login',req.body)
  
//   try {
//     // Find the user by userName
//     const user = await User.findOne({ email });

//     // If user is not found
//     if (!user) {
//       return res.status(401).json({ message: "Invalid credentials" });
//     }

//     // Check if the password is valid
//     // const isPasswordValid = await bcrypt.compare(
//     //   password,
//     //   user?.password || ""
//     // );
    
//     const isPasswordValid = await bcrypt.compare(password, user?.password || "");
//     console.log('Password comparison:', isPasswordValid);  // Log the result of the comparison
    

//     // Generate JWT and send tokens
//     generateWebTokens(user._id, res);

//     // Send success response with the role
//     res.status(200).json({ 
//       message: "Login successful!", 
//       role: user.role ,// Fetching the user's role from the database
//       name : email
//     });
    
//   } catch (error) {
//     console.log("login controller causing error: ", error);
//     res.status(500).json({ message: "Internal server error" });
//   }
// };


const loginController = async (req, res) => {
  const { userName, password } = req.body;

  try {
    const user = await User.findOne({ userName });

    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Ensure password exists before comparing
    if (!user.password) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    generateWebTokens(user._id, res);
    res.status(200).json({ message: "Login successful!" });
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