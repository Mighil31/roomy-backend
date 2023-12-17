import jsonwebtoken from "jsonwebtoken";

export default (req, res, next) => {
  const token = req.header("x-auth-token");
  if (!token) {
    console.log("NO TOKEN");
    return res.status(401).json({ msg: "Authorization denied, no token" });
  }

  try {
    const decoded = jsonwebtoken.verify(token, process.env.JWT_SECRET);
    req.user = decoded.user;
    next();
  } catch (error) {
    console.log("Invalid");
    res.status(401).json({ msg: "Token is invalid" });
  }
};
