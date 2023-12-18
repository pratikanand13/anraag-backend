const mongoose = require("mongoose");

const waiverSchema = mongoose.Schema({
    rollNo: {
        type: String,
        required: true,
        index: true,
    },
    waiverType: {
        //hostel, mess
        type: String,
        required: true,
        index: true,
    },
    startDate: {
        type: Date,
        required: true,
    },
    endDate: {
        type: Date,
        required: true,
    },
    amount: {
        type: Number,
        // required: true,
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    supportingDocuments: [
        {
            type: String,
        },
    ],
    status: {
        //pending, approved, rejected
        type: String,
        required: true,
        index: true,
    },
    remarks: {
        type: String,
        required: true,
    },
    approvedTimePeriod: {
        startDate: {
            type: Date,
            required: true,
        },
        endDate: {
            type: Date,
            required: true,
        },
    },
    actionTakenBy: {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
    },
});

const waiverRequest =
    mongoose.models["waiver-request"] ||
    mongoose.model("waiver-request", waiverSchema);

module.exports = waiverRequest;
