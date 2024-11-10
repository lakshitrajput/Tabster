const jwt = require("jsonwebtoken");
const userModel = require("../Model/user.model");

const protect = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      const decoded = jwt.verify(token, process.env.JWT_KEY);

      req.user = await userModel.findById(decoded.payload).select("-password");

      if (!req.user) {
        return res.status(401).json({
          msg: "Not authorized, user not found",
        });
      }

      return next();
    } catch (error) {
      return res.status(401).json({
        msg: "Not authorized, token failed",
      });
    }
  }
  if (!token) {
    return res.status(401).json({
      msg: "Not authorized, token failed",
    });
  }
};

module.exports = { protect };
