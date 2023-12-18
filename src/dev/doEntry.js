const mongoose = require("mongoose");

mongoose.set("strictQuery", false);
mongoose.connect(
    "mongodb+srv://user_alpha-0:cTG0c73paGPHvs37@alpha-0.ac4wr.mongodb.net/anraag?retryWrites=true&w=majority",
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    },
    (error, success) => {
        if (error) return console.log(error);
        console.log("Connected to Database");
    }
);

const Dues = require("../models/studentDues");

const driver = async () => {
    const _d = await Dues.findOne({ rollNo: "2001030" });
    const dues = {
        tutionFee: [
            {
                duration: {
                    targetBatch: {
                        joiningBatch: "btech_2020_cse",
                        currentBatch: "btech_2020_cse",
                    },
                    semester: 1,
                },
                amount: 112500,
            },
            {
                duration: {
                    targetBatch: {
                        joiningBatch: "btech_2020_cse",
                        currentBatch: "btech_2020_cse",
                    },
                    semester: 2,
                },
                amount: 112500,
            },
            {
                duration: {
                    targetBatch: {
                        joiningBatch: "btech_2020_cse",
                        currentBatch: "btech_2020_cse",
                    },
                    semester: 3,
                },
                amount: 112500,
            },
            {
                duration: {
                    targetBatch: {
                        joiningBatch: "btech_2020_cse",
                        currentBatch: "btech_2020_cse",
                    },
                    semester: 4,
                },
                amount: 112500,
            },
        ],
        hostelRent: [
            {
                duration: {
                    targetBatch: {
                        joiningBatch: "btech_2020_cse",
                        currentBatch: "btech_2020_cse",
                    },
                    semester: 1,
                },
                amount: 12500,
            },
            {
                duration: {
                    targetBatch: {
                        joiningBatch: "btech_2020_cse",
                        currentBatch: "btech_2020_cse",
                    },
                    semester: 2,
                },
                amount: 12500,
            },
            {
                duration: {
                    targetBatch: {
                        joiningBatch: "btech_2020_cse",
                        currentBatch: "btech_2020_cse",
                    },
                    semester: 3,
                },
                amount: 12500,
            },
            {
                duration: {
                    targetBatch: {
                        joiningBatch: "btech_2020_cse",
                        currentBatch: "btech_2020_cse",
                    },
                    semester: 4,
                },
                amount: 12500,
            },
        ],
        messBill: [
            {
                monthSlug: "2021_01",
                totalAmount: 1200,
            },
            {
                monthSlug: "2021_02",
                totalAmount: 1200,
            },
            {
                monthSlug: "2021_03",
                totalAmount: 1200,
            },
            {
                monthSlug: "2021_04",
                totalAmount: 1200,
            },
            {
                monthSlug: "2021_05",
                totalAmount: 1200,
            },
        ],
        fine: [
            {
                amount: 1000,
                title: "Academic fine",
                generatedBy: "sumit@iiitg.ac.in",
                generatedOn: new Date(),
            },
        ],
    };

    _d.tutionFee = dues.tutionFee;
    _d.hostelRent = dues.hostelRent;
    _d.messBill = dues.messBill;
    _d.fine = dues.fine;

    await _d.save();
    console.log("done");
};

driver();
