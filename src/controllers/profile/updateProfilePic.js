const express = require("express");

const User = require("../../models/user");
const auth = require("../../middlewares/auth");

const router = express.Router();

// req.body: image
router.post("/updateProfilePic", auth, async (req, res) => {
    try {
        if (!req.file) {
            res.status(400).json({
                success: false,
                message: "Invalid payload",
            });
        }
        const user = await User.findOne({ email: req.token.sub });
        if (user) {
            user.profilePhoto = req.body.image;
            await user.save();

            res.status(200).json({
                success: true,
                message: "Pic updated",
                image: req.body.image,
            });
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
