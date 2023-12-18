const express = require("express");
const UserValidation = require("../../models/userValidation");

const router = express.Router();

// req.body: email, validTill, s
router.post("/verifyLink", async (req, res) => {
    try {
        const record = await UserValidation.findOne({
            email: req.body.email,
            validTill: req.body.validTill,
        });

        if (!record) {
            res.status(404).json({ success: false, message: "Invalid Link" });
            return;
        }
        if (record.secret === req.body.s) {
            if (record.isUsed) {
                res.status(401).json({
                    success: false,
                    message: "Used Link",
                });
                return;
            } else if (record.validTill <= new Date()) {
                res.status(402).json({
                    success: false,
                    message: "Expired Link",
                });
                return;
            }
            res.status(200).json({ success: true, token: record.token });
        } else {
            res.status(400).json({
                success: false,
                message: "Invalid Hash",
            });
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
