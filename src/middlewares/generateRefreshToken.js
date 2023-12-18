const jwt = require("jsonwebtoken");

const refreshTokenGenerator = async (user) => {
    const payload = {
        name: user.name,
        type: user.type,
        status: user.status,
    };

    const refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
        expiresIn: "365d",
        audience: "/getToken",
        issuer: "iiitg",
        subject: user.email,
    });

    user.tokens.push(refreshToken);
    await user.save();

    return refreshToken;
};

module.exports = refreshTokenGenerator;
