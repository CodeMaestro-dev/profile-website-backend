const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

app.listen(process.env.PORT, async () => {
  console.log(`Server Listening on PORT ${process.env.PORT}`);
});

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
});

function sendEmail(name, email, phoneno, message) {
  const mailOptions = {
    from: email,
    to: "codemaestro101@gmail.com",
    subject: "Portfolio Contact Me",
    html: `
    <!doctype html>
    <html>
      <head>
        <meta charset="utf-8">
      </head>
      <body>
        <table border="1" cellspacing="0">
            <tr style="padding: 10px;">
                <th style="padding: 10px;">Name</th>
                <td style="padding: 10px;">${name}</td>
            </tr>
            <tr style="padding: 10px;">
                <th style="padding: 10px;">Email</th>
                <td style="padding: 10px;">${email}</td>
            </tr>
            <tr style="padding: 10px;">
                <th style="padding: 10px;">Phone Number</th>
                <td style="padding: 10px;">${phoneno}</td>
            </tr>
            <tr style="padding: 10px;">
                <th style="padding: 10px;">Message</th>
                <td style="padding: 10px;">${message}</td>
            </tr>
        </table>
      </body>
    </html>`,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.error(error);
    } else {
      console.log(info.response);
    }
  });
}

const sendContactMe = async (req, res) => {
    try {
        const { name, email, phoneno, message } = req.body;

        sendEmail(name, email, phoneno, message);

        return res.status(200).json({message: `Your message has successfully being sent to me.`})
    } catch(error) {
        return res.status(500).json({error: "Internal server error"})
        console.error(error)
    }
};

app.post("/api/v1/mail", sendContactMe);
