const mongoose = require("mongoose");

const rentSchema = mongoose.Schema(
    {
        rollNo: {
            type: String,
            required: true,
            index: true,
        },
        status: {
            type: String,
            required: true,
            default: "active",
            index: true,
        },
        imposedRent: [
            {
                duration: {
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
                    semester: {
                        type: Number,
                        required: true,
                    },
                },
                amount: {
                    type: Number,
                    required: true,
                },
            },
        ],
        rent: [
            {
                duration: {
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
                    semester: {
                        type: Number,
                        required: true,
                    },
                },
                amount: {
                    type: Number,
                    required: true,
                },
            },
        ],
        waivers: [
            {
                request: {
                    _id: {
                        type: mongoose.Schema.Types.ObjectId,
                        ref: "waiver-request",
                        required: true,
                    },
                    title: {
                        type: String,
                        required: true,
                    },
                    description: {
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
                },
                duration: {
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
                    semester: {
                        type: Number,
                        required: true,
                    },
                },
                amount: {
                    type: Number,
                    required: true,
                },
            },
        ],
    },
    {
        timestamps: true,
    }
);

const Rent =
    mongoose.models["hostel-rent"] || mongoose.model("hostel-rent", rentSchema);
module.exports = Rent;
