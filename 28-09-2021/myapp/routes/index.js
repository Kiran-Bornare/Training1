var express = require('express');
var router = express.Router();

var UsersModel = require('../schema/user_table');
var ProductModel = require('../schema/product_table');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get('/signup', function(req, res, next) {
  res.render('signup', { title: 'Express' });
});

router.post('/signup', function (req, res, next) {
  console.log(req.body);

  //Create an Array 
  const mybodydata = {
    user_name: req.body.user_name,
    user_gender: req.body.user_gender,
    user_dob: req.body.user_dob,
    user_mobile: req.body.user_mobile,
    user_email: req.body.user_email,
    user_password: req.body.user_password,
    user_isadmin: req.body.user_isadmin

  }
  var data = UsersModel(mybodydata);

  data.save(function (err) {
    if (err) {
      console.log("Error in Insert Record" + err);
    } else {
      res.render('signup');
    }
  })

});
//login get method
router.get('/login', function (req, res, next) {
  res.render('login');
});
//Login Process  Method
router.post('/login', function (req, res, next) {

  var email = req.body.user_email;
  var password = req.body.user_password;

  console.log(req.body);
  UsersModel.findOne({ "user_email": email }, function (err, db_users_array) {

    console.log("Find One " + db_users_array);

    if (db_users_array) {
      var db_email = db_users_array.user_email;
      var db_password = db_users_array.user_password;

    }

    console.log("db_users_array.user_email " + db_email);
    console.log("db_users_array.user_password " + db_password);

    if (db_email == null) {
      console.log("If");
      res.end("Email not Found");
    }
    else if (db_email == email && db_password == password) {
      req.session.email = db_email;
      res.redirect('/home');
    }
    else {
      console.log("Credentials wrong");
      res.end("Login invalid");
    }
  });
});
//Display
router.get('/display-table', function (req, res, next) {

  UsersModel.find(function (err, db_users_array) {
    if (err) {
      console.log("Error in Fetch Data " + err);
    } else {
      //Print Data in Console
      console.log(db_users_array);
      //Render User Array in HTML Table
      res.render('display-table', { user_array: db_users_array });

    }
  });
});

router.get('/home', function (req, res, next) {

  console.log("Home Called " + req.session.email);
  var myemail = req.session.email;
  console.log(myemail);

  //Auth
  if (!req.session.email) {
    console.log("Email Session is Set");
    res.end("Login required to Access this page");
  }
  res.render('home', { myemail: myemail });
});

//forgot
//Forgot Password Get Method
router.get('/forgot-password', function (req, res, next) {
  res.render('forgot-password');
});


//Login Process  Method
router.post('/forgot-password', function (req, res, next) {

  var email = req.body.user_email; 

  console.log(req.body);
  UsersModel.findOne({ "user_email": email }, function (err, db_users_array) {

    console.log("Find One " + db_users_array);

    if (db_users_array) {
      var db_email = db_users_array.user_email;
      var db_password = db_users_array.user_password;

    }

    console.log("db_users_array.user_email " + db_email);
    console.log("db_users_array.user_password " + db_password);

    if (db_email == null) {
      console.log("If");
      res.end("Email not Found");
    }
    else if (db_email == email) {
      "use strict";
const nodemailer = require("nodemailer");

// async..await is not allowed in global scope, must use a wrapper
async function main(){

  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing
  let account = await nodemailer.createTestAccount();

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: "demo830870@gmail.com", // generated ethereal user
      pass: "Demo@123" // generated ethereal password
    }
  });

  // setup email data with unicode symbols
  let mailOptions = {
    from: "demo830870@gmail.com", // sender address
    to: email, // list of receivers
    subject: "Forgot Password", // Subject line
    text: "Hello your password is "  + db_password, // plain text body
    html: "Hello your password is "  + db_password // html body
  };

  // send mail with defined transport object
  let info = await transporter.sendMail(mailOptions)

  console.log("Message sent: %s", info.messageId);
  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

  res.end("Password Sent on your Email");
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}

main().catch(console.error);


      
    }
    else {
      console.log("Credentials wrong");
      res.end("Login invalid");
    }

 
  });
});

router.get('/product', function(req, res, next) {
  res.render('product',{ title: 'Express' });
});

router.post('/product', function (req, res, next) {
  console.log(req.body);

  //Create an Array 
  const mybodydata1 = {
    p_name : String,
    p_details : String,
    p_price : String,
    p_img : String,
    p_qty : String
  }
  var data = ProductModel(mybodydata1);

  data.save(function (err) {
    if (err) {
      console.log("Error in Insert Record" + err);
    } else {
      res.render('product');
    }
  })

});
module.exports = router;