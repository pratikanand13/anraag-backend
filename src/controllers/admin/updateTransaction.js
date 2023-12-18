const express = require("express");
const Transaction = require("../../models/transaction");
const User = require("../../models/user");
const auth = require("../../middlewares/auth");

const router = express.Router();

// req.body: transactionId, rollNo, mode, txnRef, breakdown, remarks
router.post("/updateTransaction", auth, async (req, res) => {
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
            const transaction = await Transaction.findOne({
                _id: req.body.transactionId,
            });
            transaction = { ...transaction, ...req.body };

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

// const obj = { a: 1, b: 4 };

// const bj = { b: 1, c: 3 };

// console.log({ ...bj, ...obj });
