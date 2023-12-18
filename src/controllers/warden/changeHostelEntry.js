const express = require("express");
const HostelRent = require("../../models/hostelRent");
const MessBill = require("../../models/messBill");

const router = express.Router();

// req.body = rollNo, hostelEntry, messEntry, entryType, date
router.post("/changeEntry", async (req, res) => {
    try {
        if (!req.body.messEntry && !req.body.hostelEntry) {
            res.status(400).json({
                success: false,
                message: "Invalid Payload",
            });
        }
        if (req.body.hostelEntry) {
            const hostelRent = await HostelRent.findOne({
                rollNo: req.body.rollNo,
            });
            if (req.body.entryType == "joining" && !hostelRent.isPresent) {
                const obj = {
                    start: req.body.date,
                    end: req.body.date,
                };
                hostelRent.entries.push(obj);
                hostelRent.isPresent = true;
                await hostelRent.save();
            } else if (
                req.body.entryType == "leaving" &&
                hostelRent.isPresent
            ) {
                const index = hostelRent.entries.length - 1;
                hostelRent.entries[index].end = req.body.date;

                hostelRent.isPresent = false;

                await hostelRent.save();
            } else {
                res.status(401).json({
                    success: false,
                    message: "Invalid Action",
                });
            }
        }
        if (messEntry) {
            const messBill = await MessBill.findOne({
                rollNo: req.body.rollNo,
            });
            if (req.body.entryType == "joining" && !messBill.isPresent) {
                const obj = {
                    start: req.body.date,
                    end: req.body.date,
                };
                messBill.entries.push(obj);

                messBill.isPresent = true;

                await messBill.save();
            } else if (req.body.entryType == "leaving" && messBill.isPresent) {
                const index = messBill.entries.length - 1;
                messBill.entries[index].end = req.body.date;

                messBill.isPresent = false;

                await messBill.save();
            } else {
                res.status(402).json({
                    success: false,
                    message: "Invalid Action",
                });
            }
        }
        res.json({ success: true });
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
