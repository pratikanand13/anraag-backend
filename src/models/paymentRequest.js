const mongoose = require("mongoose");

const paymentRequestSchema = mongoose.Schema({
    targetBatch: {
        joiningBatch: {
            type: String,
            required: true,
        },
        currentBatch: {
            type: String,
            required: true,
        },
    },
    studentsNotToInclude: [
        {
            rollNo: {
                type: String,
                required: true,
            },
        },
    ],
    semester: {
        type: Number,
        required: true,
    },
    feeStructure: {
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
        // others: [
        //     {
        //         name: {
        //             type: String,
        //             required: true,
        //         },
        //         amount: {
        //             type: Number,
        //             required: true,
        //         },
        //     },
        // ],
    },
    generatedBy: {
        type: String,
        required: true,
    },
    generatedOn: {
        type: Date,
        required: true,
    },
    dueDate: {
        type: Date,
        required: true,
    },
    remarks: {
        type: String,
    },
});

const paymentRequest =
    mongoose.models["payment-request"] ||
    mongoose.model("payment-request", paymentRequestSchema);

module.exports = paymentRequest;
