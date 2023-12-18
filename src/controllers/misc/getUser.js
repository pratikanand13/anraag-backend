const express = require("express");
const User = require("../../models/user");

const auth = require("../../middlewares/auth");

const router = express.Router();

router.get("/getUser", auth, async (req, res) => {
    try {
        const user = await User.findOne({ email: req.token.sub })
            .select({ password: 0, tokens: 0 })
            .lean();

        if (user)
            res.json({
                success: true,
                user,
            });
        else
            res.status(403).json({
                success: false,
                message: "Invalid Request",
            });
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
