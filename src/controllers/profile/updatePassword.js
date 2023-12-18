const express = require("express");
const bcrypt = require("bcryptjs");
const User = require("../../models/user");
const auth = require("../../middlewares/auth");

const router = express.Router();

// req.body: password
router.post("/updatePassword", auth, async (req, res) => {
    try {
        if (!req.body.password) {
            res.status(400).json({
                success: false,
                message: "Invalid payload",
            });
        }
        const user = await User.findOne({ email: req.token.sub });
        if (user) {
            const pwd = await bcrypt.hash(req.body.password, 8);
            user.password = pwd;
            await user.save();
            return res
                .status(200)
                .json({ success: true, message: "Password changed" });
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
