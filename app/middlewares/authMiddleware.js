
import jwt from "jsonwebtoken";

export const VerifyToken = (req, res, next) => {
    try {
        const token = req.cookies.authToken; 
        if (!token) {
            return res.status(401).json({ status: "Fail", message: "No token provided" });
        }

        const decoded = jwt.verify(token, "YOUR_SECRET_KEY");
        req.user = decoded; 
        next();
    } catch (err) {
        return res.status(500).json({ status: "Fail", message: "Invalid token" });
    }
};
export default VerifyToken;
