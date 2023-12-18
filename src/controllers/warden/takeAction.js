const express = require("express");
const Waiver = require("../../models/waiverReq");
const auth = require("../../middlewares/auth");

const router = express.Router();

// req.body: _id, status, remarks
router.post("/takeAction", auth, async (req, res) => {
    try {
        const request = await Waiver.findOne({ _id: req.body._id });
        request.status = req.body.status;
        if (req.body.remarks) request.remarks = req.body.remarks;
        request.body.actionTakenBy = {
            name: req.token.name,
            email: req.token.email,
        };

        await request.save();

        res.json({ success: true, request });
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
