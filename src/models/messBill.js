const mongoose = require("mongoose");

const billSchema = mongoose.Schema(
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
        isPresent: {
            type: mongoose.Schema.Types.Boolean,
            required: true,
            default: false,
        },
        inOutEntries: [
            {
                entryType: {
                    // in, out
                    type: String,
                    required: true,
                },
                date: {
                    type: Date,
                    required: true,
                },
            },
        ],
        entries: [
            {
                start: {
                    type: Date,
                    required: true,
                },
                end: {
                    type: Date,
                    required: true,
                },
            },
        ],
        bills: [
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
    },
    {
        timestamps: true,
    }
);

const MessBill =
    mongoose.models["mess-bill"] || mongoose.model("mess-bill", billSchema);
module.exports = MessBill;
