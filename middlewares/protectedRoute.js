import jwt from "jsonwebtoken";
import User from "../Models/user.model.js";

const protectedRoute = async (req, res, next) => {
  try {
    console.log("req.cookie : ", req.cookies);
    const token = req.cookies.jwt;

    if (!token) {
      return res.status(401).json({ message: "Unauthorized access" });
    }
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    if (!verified) {
      return res.status(402).json({ message: "Unauthorized access" });
    }
    console.log("verified : ", verified);
    const user = await User.findById(verified.id).select("-password");
    if (!user) {
      return res.status(401).json({ message: "Unauthorized access" });
    }
    
    req.user = user;

    next();
  } catch (error) {
    console.log("protected route causing error: ", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const adminRoute = async (req, res, next) => {
    try{
        const user = req.user;
        if(user.role !== "admin"){
            return res.status(403).json({message: "Forbidden access"});
        }
        next();
    }
    catch{
        res.status(500).json({message: "Internal server error"});
    }
}

const vendorRoute = async (req, res, next) => {
    try{
        const user = req.user;
        if(user.role !== "vendor"){
            return res.status(403).json({message: "Forbidden access"});
        }
        next();
    }
    catch{
        res.status(500).json({message: "Internal server error"});
    }
}


const superAdminRoute = async (req, res, next) => {
    try{
        const user = req.user;
        if(user.role !== "superAdmin"){
            return res.status(403).json({message: "Forbidden access"});
        }
        next();
    }
    catch{
        res.status(500).json({message: "Internal server error"});
    }
}

const userRoute = async (req, res, next) => {
    try{
        const user = req.user;
        if(user.role !== "user"){
            return res.status(403).json({message: "Forbidden access"});
        }
        next();
    }
    catch{
        res.status(500).json({message: "Internal server error"});
    }
}

export {protectedRoute, adminRoute, vendorRoute, superAdminRoute, userRoute};

