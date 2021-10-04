var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('signup');
});



router.post('/form', function (req, res, next) {

  var a = req.body.txt1;
  var b = req.body.txt2;
  var c = req.body.txt3;
  var d = req.body.txt4;
  var e = req.body.txt5;


  const nodemailer = require("nodemailer");

  // async..await is not allowed in global scope, must use a wrapper
  async function main() {
    // Generate test SMTP service account from ethereal.email
    // Only needed if you don't have a real mail account for testing
    let testAccount = await nodemailer.createTestAccount();

    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user:  "doctorsonclick123@gmail.com", // generated ethereal user
        pass: "doconclick123", // generated ethereal password
      },
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
      from: "doctorsonclick123@gmail.com", // sender address
      to: "kiranbornare88@gmail.com", // list of receivers
      subject: " Data", // Subject line
      text: " Hello ", // plain text body
      html: `<html>
        <b> USER -DATA</b>
  
        <body>
        <table border ="1px" style="background-color: #6D8299; color:white">
            <tr>
                <td>Name : </td>
                <td>`+ a + `</td>
            </tr>
            <tr>
                <td>Email : </td>
                <td>`+ b + `</td>
            </tr>
            <tr>
                <td>Password : </td>
                <td>`+ c + `</td>
            </tr>
            <tr>
                <td>Mobile : </td>
                <td>`+ d + `</td>
            </tr>
            <tr>
                <td>Gender : </td>
                <td>`+ e + `</td>
            </tr>
        
        </table>
    </body>
        </html>
        ` // html body
    });
    res.send("Data Submitted ! ")

  }

  main().catch(console.error);

});

module.exports = router;