const cors = require("cors");
const express = require("express");
require("./utils/db");

// auth
const login = require("./controllers/auth/login");
const logout = require("./controllers/auth/logout");
const getToken = require("./controllers/auth/getToken");

// resetPassword
const forgotPassword = require("./controllers/forgotPassword/forgotPassword");
const verifyLink = require("./controllers/forgotPassword/verifyLink");
const resetPassword = require("./controllers/forgotPassword/resetPassword");

// profile
const updatePassword = require("./controllers/profile/updatePassword");
const updateProfilePic = require("./controllers/profile/updateProfilePic");

// admin
const addTransaction = require("./controllers/admin/addTransaction");
const updateTransaction = require("./controllers/admin/updateTransaction");
const removeTransaction = require("./controllers/admin/removeTransaction");
const addStudent = require("./controllers/admin/addStudent");
const archiveStudent = require("./controllers/admin/archiveStudent");

// warden
const getWaiverRequests = require("./controllers/warden/getWaiverRequests");
const takeAction = require("./controllers/warden/takeAction");

// student
const getPortfolio = require("./controllers/student/getPortfolio");

// dev
const createUser = require("./dev/createUser");
// const _router = require("./dev/router");

// misc
const getUser = require("./controllers/misc/getUser");

const app = express();

app.use(cors({ origin: process.env.CORS_ORIGIN }));
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true }));

// auth
app.use(login);
app.use(logout);
app.use(getToken);

// resetPassword
app.use(forgotPassword);
app.use(verifyLink);
app.use(resetPassword);

// profile
app.use(updatePassword);
app.use(updateProfilePic);

// admin
app.use(addTransaction);
app.use(removeTransaction);
app.use(addStudent);
app.use(archiveStudent);

// warden
app.use(getWaiverRequests);
app.use(takeAction);

// student
app.use(getPortfolio);

// dev
app.use(createUser);
// app.use(_router);

// misc
app.use(getUser);

app.get("/", (req, res) => {
    res.status(200).json({ success: true, message: "Server is up" });
});

module.exports = app;
