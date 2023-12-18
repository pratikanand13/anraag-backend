const jwt = require("jsonwebtoken");
const express = require("express");
const User = require("../../models/user");
const auth = require("../../middlewares/auth");

const router = express.Router();

router.post("/logout", auth, async (req, res) => {
    try {
        const payload = jwt.decode(req.body.refreshToken);
        console.log(payload);
        if (payload.sub === req.token.sub) {
            const user = await User.findOne({ email: payload.sub });
            if (user) {
                const sz = user.tokens.length;
                user.tokens = user.tokens.filter((val) => {
                    if (val === req.body.refreshToken) return 0;
                    return 1;
                });
                const _sz = user.tokens.length;

                await user.save();

                res.json({ success: true, noTokensRemoves: sz - _sz });
            } else {
                res.status(403).json({
                    success: false,
                    message: "Invalid Auth Credentials",
                });
            }
        } else {
            res.json({ success: false });
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
