const mongoose = require("mongoose");

const transactionSchema = mongoose.Schema(
    {
        rollNo: {
            type: String,
            required: true,
            index: true,
        },
        name: {
            type: String,
            // required: true,
            // index: true,
        },
        course: {
            type: String,
            // required: true,
        },
        DOB: {
            type: Date,
        },
        mobile: {
            type: String,
        },
        mode: {
            //sbi-collect, cheque, dd, loan
            type: String,
            required: true,
            index: true,
        },
        txnRef: {
            type: String,
            unique: true,
            required: true,
            index: true,
        },
        breakDown: {
            tutionFee: {
                type: Number,
                required: true,
            },
            hostelRent: {
                type: Number,
                required: true,
            },
            messAdvance: {
                type: Number,
                required: true,
            },
            messDues: {
                type: Number,
                required: true,
            },
            others: {
                type: Number,
                required: true,
            },
        },
        totalAmount: {
            type: Number,
            required: true,
        },
        remarks: {
            type: String,
        },
    },
    {
        timestamps: true,
    }
);

const transaction =
    mongoose.models["transaction"] ||
    mongoose.model("transaction", transactionSchema);

module.exports = transaction;
