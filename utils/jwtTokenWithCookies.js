import jwt from 'jsonwebtoken';

const generateWebTokens= (userId, res) => {
    const token = jwt.sign({id: userId}, process.env.JWT_SECRET, {
        expiresIn: "15d"
    });
    const options = {
        expires: new Date(
            Date.now() + 15*24*60*60*1000
        ),
        httpOnly: true,
        sameSite: "strict",
        secure: process.env.NODE_ENV === "production" ? true : false
    };

    res.cookie("jwt", token, options);
   
};

export default generateWebTokens;