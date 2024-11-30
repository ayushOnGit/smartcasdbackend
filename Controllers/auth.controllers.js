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
  
//   console.log("Login attempt with:", { userName, password });

//   try {
//     const user = await User.findOne({ userName });
//     console.log("User found:", user);

//     if (!user) {
//       return res.status(401).json({ message: "Invalid credentials" });
//     }

//     const isPasswordValid = await bcrypt.compare(password, user.password);
//     console.log("Is password valid:", isPasswordValid);

//     if (!isPasswordValid) {
//       return res.status(401).json({ message: "Invalid credentials" });
//     }

//     generateWebTokens(user._id, res);
//     res.status(200).json({ 
//       message: "Login successful!", 
//       role: user.role 
//     });

//   } catch (error) {
//     console.error("Login controller causing error: ", error);
//     res.status(500).json({ message: "Internal server error" });
//   }
// };


const loginController = async (req, res) => {
  const { email, password } = req.body;

  // Validate input
  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required." });
  }

  try {
    // Find user by email
    const user = await User.findOne({ email });

    // Check if user exists
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Compare the provided password with the stored hashed password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    
    // If password is invalid
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Generate web tokens for the authenticated user
    generateWebTokens(user._id, res);

    // Respond with success message and user role
    return res.status(200).json({ 
      userName:user.userName,
      email : user.email,
      message: "Login successful!", 
      // user : user,
      role: user.role
    });

  } catch (error) {
    console.error("Error during login:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

  
//   const { email, password } = req.body; // Change from userName to email
//   console.log('email',email)
//   console.log("password",password)
//   console.log("Request body:", req.body); // Debugging
//   console.log("Response object in loginController:", res); // Debugging

//   try {
//     // Find user by email instead of userName
//     const user = await User.findOne({ email });

//     if (!user) {
//       return res.status(401).json({ message: "User not found" });
//     }

//     // Compare password directly
//     const isPasswordValid = await bcrypt.compare(password, user.password);

//     if (!isPasswordValid) {
//       return res.status(401).json({ message: "Incorrect password" });
//     }

//     // Generate token
//     const token = generateWebTokens(user._id);
//     console.log("token",token)
    
//     // Send response with token and role if needed
//     res.status(200).json({
//       message: "Login successful!",
//       token,
//       role: user.role // Include role in response if needed
//     });
//   } catch (error) {
//     console.error("Login controller error:", error);
//     res.status(500).json({ message: "Internal server error" });
//   }
// };



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