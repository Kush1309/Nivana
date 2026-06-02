const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ msg: "No token provided" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || "secretkey"
    );

    /**
     * 🔥 IMPORTANT
     * - id      → MongoDB ObjectId (relations, Assessment.user)
     * - userId  → numeric ID (1,2,3...)
     * 
     * Safe fallback added so nothing breaks
     */
    req.user = {
      id: decoded.id || decoded._id,
      userId: decoded.userId || null,
    };

    // 🧪 DEBUG (temporary – remove later if you want)
    // console.log("AUTH MIDDLEWARE USER:", req.user);

    next();
  } catch (err) {
    return res.status(401).json({ msg: "Invalid token" });
  }
};
