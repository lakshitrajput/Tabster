const jwt = require("jsonwebtoken");
const userModeL = require("../Model/user.model");

const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return res.status(401).json({
      msg: "Not authorized, token failed",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_KEY);
    req.user = await userModeL.findById(decoded.payload || decoded._id).select("-password");

    

    if (!req.user) {
      return res.status(401).json({
        msg: "Not authorized, user not found",
      });
    }

    next();
  } catch (error) {
    console.error("Token verification error:", error);
    return res.status(401).json({
      msg: "Not authorized, token failed",
    });
  }
};

module.exports = { protect };
