const express = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/user");
// const sendMail = require("../utils/mail/sendAccountCreationMail");
const router = express.Router();

// req.body: name, type, email, password, rollNo, batch
router.post("/createUser", async (req, res) => {
    try {
        const pwd = await bcrypt.hash(req.body.password, 8);

        const user = new User({
            name: req.body.name,
            type: req.body.type,
            email: req.body.email,
            password: pwd,
        });

        await user.save();

        // await sendMail(user.email, user.name, user.email, user.password);

        res.json({ success: true, message: "User created" });
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
