const jwt = require("jsonwebtoken");

const accessTokenGenerator = (user) => {
    const payload = {
        name: user.name,
        type: user.type,
        status: user.status,
        rollNo: user.rollNo || "N/A",
        batch: user.batch || "N/A",
    };

    const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: 3600,
        issuer: "iiitg",
        subject: user.email,
    });

    return accessToken;
};

module.exports = accessTokenGenerator;
