const mongoose = require("mongoose");

const validationSchema = mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
            // index: true,
        },
        secret: {
            type: String,
            required: true,
        },
        token: {
            type: String,
            required: true,
        },
        validTill: {
            type: Date,
            required: true,
            // index: true,
        },
        isUsed: {
            type: mongoose.Schema.Types.Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
    }
);

validationSchema.index({ email: 1, validTill: -1 });
const userValidation =
    mongoose.models["user-validation"] ||
    mongoose.model("user-validation", validationSchema);

module.exports = userValidation;
