import jwt from "jsonwebtoken";

const adminAuth = (req, res, next) => {
  try {
    // Extract Authorization header (expected: "Bearer <token>")
    const authHeader = req.headers.authorization || req.headers.Authorization;
    if (!authHeader) {
      return res.json({ success: false, message: "No token provided" });
    }

    const token = authHeader.startsWith("Bearer ")
      ? authHeader.split(" ")[1]
      : authHeader;

    let token_decoded;
    try {
      token_decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    } catch (err) {
      console.log('adminAuth: token verification failed', err.message);
      return res.json({ success: false, message: 'Invalid token' });
    }

    console.log('adminAuth: authHeader=', authHeader);
    console.log('adminAuth: token_decoded=', token_decoded);

    // Support both legacy string payloads and the newer object payload { data: email+password }
    const decodedValue =
      typeof token_decoded === 'object' && token_decoded.data
        ? token_decoded.data
        : token_decoded;

    if (decodedValue !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD) {
      console.log('adminAuth: decoded token does not match admin credentials');
      return res.json({ success: false, message: "Unauthorized access" });
    }

    req.admin = { email: process.env.ADMIN_EMAIL };
    next();
  }
catch (error) {
    console.log(error);
    return res.json({ success: false, message: "Unauthorized access" });
  } 
}

export default adminAuth;