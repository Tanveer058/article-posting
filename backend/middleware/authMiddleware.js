import jwt from "jsonwebtoken";

export const protectRoute = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  console.log("Token:", token);

  if (!token) return res.status(401).json({ error: "Not authorized, token missing" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id; // Attach user ID to request
    console.log("Decoded Token:", decoded);
    next();
  } catch (error) {
    res.status(401).json({ error: "Invalid token" });
    console.error("Token verification error:", error);
  }
};
