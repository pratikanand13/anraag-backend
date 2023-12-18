const express = require("express");
const Transaction = require("../../models/transaction");
const User = require("../../models/user");
const auth = require("../../middlewares/auth");

const router = express.Router();

// req.body: transactionId
router.post("/removeTransaction", auth, async (req, res) => {
    try {
        if (req.token.type !== "admin") {
            res.status(403).json({
                success: false,
                message: "Unauthorized!!!",
            });
            return;
        }

        const transaction = await Transaction.findOne({
            _id: req.body.transactionId,
        }).lean();

        if (transaction) {
            await Transaction.deleteOne({
                _id: req.body.transactionId,
            });

            res.status(200).json({
                success: true,
                message: "Transaction removed successfully",
            });
            return;
        } else {
            res.status(404).json({
                success: false,
                message: "Transaction not found",
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
