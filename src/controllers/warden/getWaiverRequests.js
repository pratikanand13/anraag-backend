const express = require("express");
const Waiver = require("../../models/waiverReq");

const router = express.Router();

// req.query=status, limit, skip  <------NOT IMPLEMENTED
router.get("/getWaiverRequests", async (req, res) => {
    try {
        const requests = await Waiver.find({ status: "pending" }).lean();
        res.json({ success: true, requests });
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
