const express = require("express");

const PaymentRequest = require("../../models/paymentRequest");
const User = require("../../models/user");
const StudentDues = require("../../models/studentDues");

const auth = require("../../middlewares/auth");

const router = express.Router();

// req.body: joiningBatch, currentBatch, semester, studentsNotToInclude, feeStructure{}, dueDate, remarks
router.post("/updatePaymentRequest", auth, async (req, res) => {
    try {
        if (req.token.type !== "admin") {
            res.status(403).json({
                success: false,
                message: "Unauthorized!!!",
            });
            return;
        }

        const paymentRequest = new PaymentRequest({
            joiningBatch: req.body.joiningBatch,
            currentBatch: req.body.currentBatch,
            semester: req.body.semester,
            studentsNotToInclude: req.body.studentsNotToInclude,
            feeStructure: {
                tutionFee: req.body.feeStructure.tutionFee,
                hostelRent: req.body.feeStructure.hostelRent,
                messAdvance: req.body.feeStructure.messAdvance,
            },
            dueDate: req.body.dueDate,
            remarks: req.body.remarks,
        });

        await paymentRequest.save();

        const users = await User.find({
            joiningBatch: req.body.joiningBatch,
            currentBatch: req.body.currentBatch,
            status: "active",
        })
            .select({ rollNo: 1 })
            .lean();

        const obj = {};

        req.body.studentsNotToInclude.forEach((e) => {
            obj[e] = 1;
        });
        const _users = users.filter((e) => (obj[e.rollNo] ? 0 : 1));

        const objTution = {
            duration: {
                targetBatch: {
                    joiningBatch: req.body.joiningBatch,
                    currentBatch: req.body.currentBatch,
                },
                semester: req.body.semester,
            },
            amount: req.body.feeStructure.tutionFee,
        };
        const objHostel = {
            duration: {
                targetBatch: {
                    joiningBatch: req.body.joiningBatch,
                    currentBatch: req.body.currentBatch,
                },
                semester: req.body.semester,
            },
            amount: req.body.feeStructure.hostelRent,
        };

        const arr = _users.map((val) => val.rollNo);

        const studentDueEntries = await StudentDues.find({
            rollNo: { $in: arr },
            status: "active",
        });

        await Promise.all(
            studentDueEntries.map(async (val) => {
                val.tutionFee.push(objTution);
                val.hostelRent.push(objHostel);

                await val.save();
            })
        );

        res.status(200).json({
            success: true,
            message: "Payment Request generated successfully",
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
