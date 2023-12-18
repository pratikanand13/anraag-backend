const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        type: {
            //student, admin, warden
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
        profilePhoto: {
            type: String,
        },
        email: {
            type: String,
            unique: true,
            required: true,
            index: true,
        },
        password: {
            type: String,
            required: true,
        },
        rollNo: {
            type: String,
            unique: true,
            sparse: true,
        },
        joiningBatch: {
            //program_yearOfJoining_department
            type: String,
        },
        currentBatch: {
            //program_yearOfJoining_department
            type: String,
        },

        tokens: [
            {
                type: String,
            },
        ],
    },
    {
        timestamps: true,
    }
);

const user = mongoose.models["user"] || mongoose.model("user", userSchema);
module.exports = user;
