const mongoose = require("mongoose");

mongoose.set("strictQuery", false);
mongoose.connect(
    process.env.MONGO_URI,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    },
    (error, success) => {
        if (error) return console.log(error);
        console.log("Connected to Database");
    }
);
