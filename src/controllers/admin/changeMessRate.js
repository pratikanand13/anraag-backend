const express = require("express");
const fs = require("fs");
const auth = require("../../middlewares/auth");
const rentObj = require("../../messBill.json");

const router = express.Router();

// req.body: start, end, semesterRent, perDayRent
router.post("/changeMessRate", auth, async (req, res) => {
    try {
        if (req.token.type !== "admin") {
            res.status(401).json({
                success: false,
                message: "Unauthorized!!!",
            });
            return;
        }

        rentObj.bill.push({
            start: req.body.start,
            end: req.body.end,
            perDayBill: req.body.perDayBill,
        });

        fs.writeFile(
            "../../messBill.json",
            JSON.stringify(file, null, 2),
            function writeJSON(err) {
                if (err) return console.log(err);
                // console.log(JSON.stringify(file));
                // console.log("writing to " + fileName);
            }
        );

        res.status(200).json({
            success: true,
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
