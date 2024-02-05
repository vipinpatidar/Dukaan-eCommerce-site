import { isAuthenticated } from "./isAuth.js";

export const verifyIsAdmin = (req, res, next) => {
  isAuthenticated(req, res, () => {
    if (req.isAdmin) {
      next();
    } else {
      res.status(401).json({ error: "Unauthorized action" });
    }
  });
};
