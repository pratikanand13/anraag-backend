const express = require("express");
const fs = require("fs");
const auth = require("../../middlewares/auth");
const rentObj = require("../../hostelRent.json");

const router = express.Router();

// req.body: start, end, semesterRent, perDayRent
router.post("/changeHostelRent", auth, async (req, res) => {
    try {
        if (req.token.type !== "admin") {
            res.status(401).json({
                success: false,
                message: "Unauthorized!!!",
            });
            return;
        }

        rentObj.rent.push({
            start: req.body.start,
            end: req.body.end,
            semesterRent: req.body.semesterRent,
            perDayRent: req.body.perDayRent,
        });

        fs.writeFile(
            "../../hostelRent.json",
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
