const { google } = require("googleapis");
const nodemailer = require("nodemailer");
process.env.GMAIL_REFRESH_TOKEN =
    "1//04sEMTCpSnccPCgYIARAAGAQSNwF-L9Ir3aqZK8S2DwlFWy3TlfjqarZI8gNPPkciWoerw-2l-RiCvFsyiyC7g92PbhvomOaJuHs";

const CLIENT_ID =
    "336594137991-2okbtbbmtda7r5et1btm87ocecjsokh3.apps.googleusercontent.com";
const CLIENT_SECRET = "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";
const REDIRECT_URI = "https://developers.google.com/oauthplayground";
const REFRESH_TOKEN = process.env.GMAIL_REFRESH_TOKEN;
const G_MAIL = "ankit.iiitg@gmail.com";

const oAuthClient = new google.auth.OAuth2(
    CLIENT_ID,
    CLIENT_SECRET,
    REDIRECT_URI
);
oAuthClient.setCredentials({ refresh_token: REFRESH_TOKEN });

const sendMail = async (reciever, mailSub, mailBody) => {
    const accessToken = await oAuthClient.getAccessToken();
    console.log(accessToken);

    try {
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                type: "OAuth2",
                user: G_MAIL,
                clientId: CLIENT_ID,
                clientSecret: CLIENT_SECRET,
                refreshToken: REFRESH_TOKEN,
                accessToken: accessToken,
            },
        });
        const mailInfo = await transporter.sendMail({
            from: "'Ankit' <ankit.iiitg@gmail.com>",
            to: reciever,
            subject: mailSub,
            text: "",
            html: mailBody,
        });
        console.log(
            "Msg sent on mail(" + reciever + ")\nMailId: " + mailInfo.messageId
        );
    } catch (e) {
        console.log("Message Not sent\nError: " + e);
    }
};

module.exports = sendMail;
