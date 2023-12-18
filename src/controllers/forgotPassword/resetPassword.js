const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const express = require("express");
const User = require("../../models/user");
const UserValidation = require("../../models/userValidation");

const router = express.Router();

// req.body: token, email, validTill, newPassword
router.post("/resetPassword", async (req, res) => {
    try {
        if (
            req.body.token &&
            req.body.email &&
            req.body.validTill &&
            req.body.newPassword
        ) {
            const record = await UserValidation.findOne({
                email: req.body.email,
                validTill: req.body.validTill,
            });

            if (!record) {
                res.status(401).json({
                    success: false,
                    message: "Link not found",
                });
                return;
            }
            if (record.isUsed) {
                res.status(402).json({
                    success: false,
                    message: "Used Link",
                });
                return;
            }
            jwt.verify(
                req.body.token,
                record.secret,
                { issuer: "iiitg", sub: req.body.email },
                async (err, payLoad) => {
                    if (err) {
                        return res.status(403).json({
                            success: false,
                            message: "Authorization failed!!!",
                        });
                    }

                    const pwd = await bcrypt.hash(req.body.newPassword, 8);
                    const user = await User.findOne({ email: req.body.email });
                    user.password = pwd;

                    await user.save();

                    record.isUsed = true;
                    await record.save();
                    res.status(200).json({
                        success: true,
                        message: "Successfully updated password",
                    });
                }
            );
        } else {
            res.status(400).json({
                success: false,
                message: "Invalid request. Incorrect Payload",
            });
            return;
        }
    } catch (e) {
        res.status(500).json({
            success: false,
            message: e.toString(),
        });
        return;
    }
});

module.exports = router;
