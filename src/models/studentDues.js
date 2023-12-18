const mongoose = require("mongoose");

const duesSchema = mongoose.Schema(
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
        tutionFee: [
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
        // paymentRequests: [
        //     {
        //         reference: {
        //             type: mongoose.Schema.Types.ObjectId,
        //             ref: "payment-request",
        //             required: true,
        //         },
        //         targetBatch: {
        //             joiningBatch: {
        //                 type: String,
        //                 required: true,
        //             },
        //             currentBatch: {
        //                 type: String,
        //                 required: true,
        //             },
        //         },
        //         semester: {
        //             type: Number,
        //             required: true,
        //         },
        //         feeStructure: {
        //             tutionFee: {
        //                 type: Number,
        //                 required: true,
        //             },
        //             hostelRent: {
        //                 type: Number,
        //                 required: true,
        //             },
        //             messAdvance: {
        //                 type: Number,
        //                 required: true,
        //             },
        //             // others: [
        //             //     {
        //             //         name: {
        //             //             type: String,
        //             //             required: true,
        //             //         },
        //             //         amount: {
        //             //             type: Number,
        //             //             required: true,
        //             //         },
        //             //     },
        //             // ],
        //         },
        //     },
        // ],

        // hostelRent: [
        //     {
        //         monthSlug: {
        //             // YYYY_MM
        //             type: String,
        //             required: true,
        //         },
        //         noDays: {
        //             type: Number,
        //             required: true,
        //         },
        //         version: {
        //             type: Number,
        //             required: true,
        //         },
        //         rate: {
        //             type: Number,
        //             required: true,
        //         },
        //         amount: {
        //             type: Number,
        //             required: true,
        //         },
        //     },
        // ],
        hostelRent: [
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
        messBill: [
            {
                monthSlug: {
                    // YYYY_MM
                    type: String,
                    required: true,
                },
                rates: [
                    {
                        from: {
                            type: Number,
                            required: true,
                        },
                        to: {
                            type: Number,
                            required: true,
                        },
                        cost: {
                            type: Number,
                            required: true,
                        },
                        noDays: {
                            type: Number,
                            required: true,
                        },
                        amount: {
                            type: Number,
                            required: true,
                        },
                    },
                ],
                totalAmount: {
                    type: Number,
                    required: true,
                },
            },
        ],
        libraryFine: [
            {
                amount: {
                    type: Number,
                    required: true,
                },
                generatedBy: {
                    type: String,
                    required: true,
                },
                generatedOn: {
                    type: Date,
                    required: true,
                },
            },
        ],
        fine: [
            {
                amount: {
                    type: Number,
                    required: true,
                },
                title: {
                    type: String,
                    required: true,
                },
                desc: {
                    type: String,
                },
                generatedBy: {
                    type: String,
                    required: true,
                },
                generatedOn: {
                    type: Date,
                    required: true,
                },
            },
        ],
        electricityBill: [
            {
                amount: {
                    type: Number,
                    required: true,
                },
                title: {
                    type: String,
                    required: true,
                },
                desc: {
                    type: String,
                },
                generatedBy: {
                    type: String,
                    required: true,
                },
                generatedOn: {
                    type: Date,
                    required: true,
                },
            },
        ],
    },
    {
        timestamps: true,
    }
);

const Dues =
    mongoose.models["student-dues"] ||
    mongoose.model("student-dues", duesSchema);
module.exports = Dues;
