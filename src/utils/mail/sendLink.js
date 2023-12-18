const sendMail = require("./sendMail");
const sendLink = async (reciever, obj) => {
    const mailSub = "Anraag: Reset Password";
    const mailBody = `
        <p>
        Reset <a href="${
            process.env.FRONTEND_BASE +
            "resetPassword?email=" +
            obj.email +
            "&validTill=" +
            obj.validTill.getTime() +
            "&s=" +
            obj.secret
        }">link<a>.
        </p>
        `;
    console.log(mailBody);
    try {
        await sendMail(reciever, mailSub, mailBody);
        console.log("Otp sent on mail: " + reciever);
    } catch (e) {
        console.log("Otp Not sent\nError: " + e);
    }
};

module.exports = sendLink;
