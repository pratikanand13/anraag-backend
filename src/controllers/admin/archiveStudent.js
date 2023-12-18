const express = require("express");

const User = require("../../models/user");
const MessBill = require("../../models/messBill");
const HostelRent = require("../../models/hostelRent");
const StudentDues = require("../../models/studentDues");

const auth = require("../../middlewares/auth");

const router = express.Router();

// req.body: rollNo
router.post("/archiveStudent", auth, async (req, res) => {
    try {
        if (req.token.type !== "admin") {
            res.status(403).json({
                success: false,
                message: "Unauthorized!!!",
            });
            return;
        }
        const user = await User.findOne({ rollNo: req.body.rollNo });
        if (user) {
            user.status = "archived";
            await user.save();

            const messBill = await MessBill.findOne({
                rollNo: req.body.rollNo,
            });
            messBill.status = "archived";
            await messBill.save();

            const hostelRent = await HostelRent.findOne({
                rollNo: req.body.rollNo,
            });
            hostelRent.status = "archived";
            await hostelRent.save();

            const studentDues = await StudentDues.findOne({
                rollNo: req.body.rollNo,
            });
            studentDues.status = "archived";
            await studentDues.save();

            res.status(200).json({
                success: true,
                message: "Student archived",
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
