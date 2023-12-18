const sendMail = require("./sendMail");
const sendOtp = async (reciever, name, email, password) => {
    const mailSub = "Anrag Account Creation";
    const mailBody = `
    <h3>Hi ${name.trim()}, Your account has been created on Anrag. Use the credentials provided below to login.<h3>
    <h4>Email: ${email}<h4>
    <h4>Password: ${password}<h4>
    <p>Please change the credentials after login.<br>Click here to login: <a href=${
        process.env.FRONTEND_BASE
    }>Anrag<p>
    `;

    try {
        console.log(password);
        await sendMail(reciever, mailSub, mailBody);
        console.log("Account Creation Mail sent on: " + reciever);
    } catch (e) {
        console.log("Account Creation Mail not sent\nError: " + e);
    }
};

module.exports = sendOtp;
