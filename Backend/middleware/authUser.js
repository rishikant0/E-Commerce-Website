import jwt from "jsonwebtoken";

const authUser = (req, res, next) => {
  const authHeader = req.headers.authorization;

  console.log("\n========== AUTH MIDDLEWARE CALLED ==========");
  console.log("Authorization header:", authHeader ? "PRESENT" : "MISSING");
  console.log("Full headers:", JSON.stringify(req.headers, null, 2));

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    console.log("❌ No Bearer token found");
    return res.status(401).json({
      success: false,
      message: "Unauthorized, token missing",
    });
  }

  try {
    const token = authHeader.split(" ")[1];
    
    console.log("📥 Extracted token from header:", token.substring(0, 50) + "...");
    console.log("📥 Token length:", token.length);

    // Verify JWT_SECRET_KEY is set
    if (!process.env.JWT_SECRET_KEY) {
      console.error("❌ ERROR: JWT_SECRET_KEY not set in environment");
      return res.status(500).json({
        success: false,
        message: "Server configuration error",
      });
    }

    const secret = process.env.JWT_SECRET_KEY;
    console.log("🔑 Using secret for verification:", secret);
    console.log("🔑 Secret length:", secret.length);
    console.log("🔑 Secret char codes:", [...secret].map(c => c.charCodeAt(0)).join(','));

    const decoded = jwt.verify(token, secret);

    // ✅ Attach userId safely
    req.userId = decoded.id;
    console.log("✅ Token verified successfully for user:", req.userId);
    console.log("========== AUTH MIDDLEWARE SUCCESS ==========\n");

    next();
  } catch (error) {
    console.error("\n========== TOKEN VERIFICATION FAILED ==========");
    console.error("❌ Error message:", error.message);
    console.error("❌ Error type:", error.name);
    console.error("JWT_SECRET_KEY used:", process.env.JWT_SECRET_KEY);
    console.error("JWT_SECRET_KEY length:", process.env.JWT_SECRET_KEY?.length);
    console.error("Full error:", error);
    console.error("========== END ERROR ==========\n");
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token",
      error: error.message,
    });
  }
};

export default authUser;
