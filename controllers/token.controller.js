const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {

    const token = req.headers["x-access-token"];

    if (!token) {
        return res.status(403).send("Access Denied");
    }

    try {
        const decoded = jwt.verify(token, process.env.TOKEN_KEY);
        req.userId = decoded.user_id;
    } catch (err) {
        return res.status(401).send("Access Denied");
    }
    return next();
}

module.exports = verifyToken;