const express = require("express");
const bcrypt = require("bcryptjs");
const generator = require("generate-password");

const User = require("../../models/user");
const MessBill = require("../../models/messBill");
const HostelRent = require("../../models/hostelRent");
const StudentDues = require("../../models/studentDues");

const auth = require("../../middlewares/auth");
const sendMail = require("../../utils/mail/sendAccountCreationMail");

const router = express.Router();

// req.body: name, email, rollNo, batch
router.post("/addStudent", auth, async (req, res) => {
    try {
        if (req.token.type !== "admin") {
            res.status(403).json({
                success: false,
                message: "Unauthorized!!!",
            });
            return;
        }
        const password = generator.generate({
            length: 10,
            numbers: true,
            excludeSimilarCharacters: true,
        });
        const pwd = await bcrypt.hash(password, 8);

        const user = new User({
            name: req.body.name,
            type: "student",
            email: req.body.email,
            joiningBatch: req.body.batch,
            currentBatch: req.body.batch,
            rollNo: req.body.rollNo,
            password: pwd,
        });

        await user.save();

        await sendMail(user.email, user.name, user.email, password);

        const messBill = new MessBill({
            rollNo: req.body.rollNo,
        });
        await messBill.save();

        const hostelRent = new HostelRent({
            rollNo: req.body.rollNo,
        });
        await hostelRent.save();

        const studentDues = new StudentDues({
            rollNo: req.body.rollNo,
        });
        await studentDues.save();

        res.status(200).json({ success: true, message: "Student created" });
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
