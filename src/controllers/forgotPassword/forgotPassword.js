const jwt = require("jsonwebtoken");
const express = require("express");
const UserValidation = require("../../models/userValidation");
const User = require("../../models/user");
const sendLink = require("../../utils/mail/sendLink");

const router = express.Router();

const getToken = (user, secret) => {
    const payload = {
        name: user.name,
        type: user.type,
        status: user.status,
        rollNo: user.rollNo || "N/A",
        batch: user.batch || "N/A",
    };

    const token = jwt.sign(payload, secret, {
        expiresIn: 3600,
        issuer: "iiitg",
        subject: user.email,
    });

    return token;
};

router.post("/forgotPassword", async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email }).lean();
        if (user) {
            const payLoad = {
                email: req.body.email,
            };
            payLoad.secret = Math.floor(
                Math.random() * 899999 + 100000
            ).toString();
            payLoad.validTill = new Date(
                new Date().getTime() + process.env.VALID_TIME * 60000
            );
            payLoad.token = getToken(user, payLoad.secret);

            const newRecord = new UserValidation(payLoad);
            await newRecord.save();

            if (payLoad.email) await sendLink(payLoad.email, newRecord);

            res.status(200).json({
                success: true,
                mailSent: true,
                message: "Mail sent",
                email: payLoad.email,
                validTill: payLoad.validTill,
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
