const mongoose = require("mongoose");

const batchSchema = mongoose.Schema({
    slug: {
        //program_yearOfJoining_department
        type: String,
        unique: true,
        required: true,
        index: true,
    },
    yearOfJoining: {
        type: String,
        required: true,
    },
    program: {
        type: String,
        required: true,
    },
    department: {
        type: String,
        required: true,
    },
});

const Batch = mongoose.models["batch"] || mongoose.model("batch", batchSchema);

module.exports = Batch;
