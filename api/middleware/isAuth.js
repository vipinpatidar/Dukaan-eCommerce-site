import jwt from "jsonwebtoken";
import Cookies from "js-cookie";

export async function isAuthenticated(req, res, next) {
  try {
    const token =
      req.header("Authorization")?.replace("Bearer ", "") ||
      req.cookies?.accessToken;

    if (!token) {
      throw new Error("Unauthorized action.");
    }

    const decoded = await jwt.verify(token, process.env.SECRET_KEY);

    if (!decoded) {
      throw new Error("unAuthenticated action");
    }

    // console.log(decoded);
    req.userId = decoded.id;
    req.isAdmin = decoded.isAdmin;

    next();
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
}
