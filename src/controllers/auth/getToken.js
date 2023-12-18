const express = require("express");
const jwt = require("jsonwebtoken");

const User = require("../../models/user");
const generateAccessToken = require("../../middlewares/generateAccessToken");

const router = express.Router();

router.post("/getToken", async (req, res) => {
    try {
        const refreshToken = req.body.refreshToken;
        jwt.verify(
            refreshToken,
            process.env.REFRESH_TOKEN_SECRET,
            { issuer: "iiitg" },
            async (err, payload) => {
                if (err) {
                    return res.status(400).json({
                        success: false,
                        message: "Authorization failed!!!",
                    });
                }
                if (payload.status !== "active")
                    return res.status(401).json({
                        success: false,
                        message: "Access Denied",
                    });

                const user = await User.findOne({ email: payload.sub });

                const accessToken = generateAccessToken(user);

                res.status(200).json({ success: true, accessToken });
            }
        );
    } catch (e) {
        console.log(e);
        res.status(500).json({
            success: false,
            message: e.toString(),
        });
        return;
    }
});

module.exports = router;
