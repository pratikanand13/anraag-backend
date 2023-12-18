const jwt = require("jsonwebtoken");

module.exports = async (req, res, next) => {
    const authHeader = req.header("Authorization");
    if (authHeader && authHeader.replace("Bearer ", "")) {
        const token = authHeader.replace("Bearer ", "");
        jwt.verify(
            token,
            process.env.ACCESS_TOKEN_SECRET,
            { issuer: "iiitg" },
            (err, user) => {
                if (err) {
                    return res.status(401).json({
                        success: false,
                        message: "Authorization failed!!!",
                    });
                }
                if (user.status !== "active")
                    return res.status(402).json({
                        success: false,
                        message: "Access Denied",
                    });
                req.token = user;
                next();
            }
        );
    } else {
        return res
            .status(400)
            .json({
                success: false,
                message: "Authorization failed!!!No auth token found",
            });
    }
};
