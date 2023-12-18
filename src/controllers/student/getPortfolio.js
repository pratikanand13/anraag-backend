const express = require("express");
const Dues = require("../../models/studentDues");
const Transaction = require("../../models/transaction");

const mapTransactions = require("../../utils/mapTransactions");

const auth = require("../../middlewares/auth");

const router = express.Router();

router.get("/getPortfolio", auth, async (req, res) => {
    try {
        const dues = await Dues.findOne({ rollNo: req.token.rollNo }).lean();

        const transactions = await Transaction.find({
            rollNo: req.token.rollNo,
        }).lean();

        const { newDues, totalAmountLeft } = mapTransactions(
            transactions,
            dues
        );

        res.json({
            success: true,
            dues,
            transactions,
            totalAmountLeft,
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
