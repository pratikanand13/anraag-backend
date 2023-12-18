const express = require("express");
const Transaction = require("../../models/transaction");
const User = require("../../models/user");
const auth = require("../../middlewares/auth");

const router = express.Router();

// req.body: rollNo, mode, txnRef, breakdown, remarks
router.post("/addTransaction", auth, async (req, res) => {
    try {
        if (req.token.type !== "admin") {
            res.status(403).json({
                success: false,
                message: "Unauthorized!!!",
            });
            return;
        }
        const user = await User.findOne({ rollNo: req.body.rollNo }).lean();
        if (user) {
            let sum = 0;
            sum += req.body.breakDown.tutionFee || 0;
            sum += req.body.breakDown.hostelRent || 0;
            sum += req.body.breakDown.messAdvance || 0;
            sum += req.body.breakDown.messDues || 0;
            sum += req.body.breakDown.others || 0;

            const payload = {
                rollNo: req.body.rollNo,
                mode: req.body.mode,
                txnRef: req.body.txnRef,
                breakDown: {
                    tutionFee: req.body.breakDown.tutionFee || 0,
                    hostelRent: req.body.breakDown.hostelRent || 0,
                    messAdvance: req.body.breakDown.messAdvance || 0,
                    messDues: req.body.breakDown.messDues || 0,
                    others: req.body.breakDown.others || 0,
                },
                totalAmount: sum,
                remarks: req.body.remarks,
            };

            const transaction = new Transaction(payload);
            await transaction.save();

            res.status(200).json({
                success: true,
                transaction,
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
