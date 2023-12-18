const express = require("express");
const bcrypt = require("bcryptjs");
const User = require("../../models/user");
const generateAccessToken = require("../../middlewares/generateAccessToken");
const generateRefreshToken = require("../../middlewares/generateRefreshToken");

const router = express.Router();

router.post("/login", async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (user) {
            const flag = await bcrypt.compare(req.body.password, user.password);
            if (flag) {
                const accessToken = generateAccessToken(user);
                const refreshToken = await generateRefreshToken(user);

                const payload = {
                    name: user.name,
                    type: user.type,
                    email: user.email,
                    rollNo: user.rollNo || undefined,
                    batch: user.batch || undefined,
                };

                res.status(200).json({
                    success: true,
                    user: payload,
                    accessToken,
                    refreshToken,
                });
            } else {
                res.status(400).json({
                    success: false,
                    message: "Invalid password",
                });
                return;
            }
        } else {
            res.status(404).json({
                success: false,
                message: "User does not exist",
            });
            return;
        }
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
