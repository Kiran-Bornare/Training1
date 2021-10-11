// var express = require('express');
// var router = express.Router();

// var AdminModel = require('../schema/signup');

// /* GET home page. */
// router.get('/', function (req, res, next) {
//   res.render('index', { title: 'Express' });
// });
// router.get('/login', function (req, res, next) {
//   res.render('login',);
// });

// router.get('/signup', function (req, res, next) {
//   res.render('signup',);
// });




// // router.post('/signup', function (req, res, next) {

// //   // AdminModel.find.then(()=>{

// //   // }).catch(()=>{
// //   //   throw err;
// //   // })

// //   const mybodydata = {

// //     email: req.body.email,
// //     password: req.body.password,
// //     file: req.body.file,

// //   }

// //   var file = req.files.file;
// //   var myfilename = req.files.file.name;
// //   file.mv('bin/images/'+myfilename, function(err) {
// //     if (err)
// //     throw err;
// //     //res.send('File uploaded!');
// //     });


// //   var data = AdminModel(mybodydata);

// //   data.save(function (err) {
// //     if (err) {
// //       console.log("Error in Insert Record" + err);
// //     } else {
// //       res.render('signup');
// //       res.send("Record Successfully added")
// //     }
// //   })

// // });

// router.post('/signup', function (req, res, next) {
//   var myfile = req.files.file;
//   var myfilename = req.files.file.name;

//   myfile.mv('public/images/' + myfilename, function (err) {
//     if (err)
//       throw err;
//     //res.send('File uploaded!');
//   });

 
//   const mybodydata = {
//     email: req.body.email,
//     password: req.body.password,
//     file: myfilename,
//   }
//   var data = AdminModel(mybodydata);

//   data.save(function (err) {
//     if (err) {
//       console.log("Error in Add Record" + err);
//     } else {
//       console.log("Record Added");
//       res.send("Record Successfully Added")
//     }
//   }).lean();

// });


// router.get('/forgotpassword', function (req, res, next) {
//   res.render('forgotpassword');
// });

// router.get('/changepassword', function (req, res, next) {
//   res.render('changepassword');
// });
// router.get('/signupdisplay', function (req, res, next) {
//   res.render('signupdisplay');
// });

// module.exports = router;


var express = require('express');
var router = express.Router();

var AdminModel = require('../schema/signup');


/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});


router.get('/login', function(req, res, next) {
  res.render('login');
});

router.post('/login', function (req, res, next) {

  var email = req.body.user_email;
  var password = req.body.user_password;

  console.log(req.body);
  AdminModel.findOne({ "email": email }, function (err, db_admin_array) {

console.log("Find One " + db_admin_array);

if (db_admin_array) {
  var db_email = db_admin_array.email;
  var db_password = db_admin_array.password;

}

console.log("db_admin_array.email " + db_email);
console.log("db_admin_array.password " + db_password);

if (db_email == null ) {
  console.log("If");
  res.end("Email not Found");
}
else if ( db_email == email && db_password == password ) {
  // console.log("db_admin_array.email " + email);
  req.session.email = db_email;
  res.send('Login successfull');
}
else {
  console.log("Credentials wrong");
  res.end("Login invalid");
}
  });
});




router.get('/signup', function (req, res, next) {
  res.render('signup',);
});

router.post('/signup', function (req, res, next) {
  var myfile = req.files.file;
  var myfilename = req.files.file.name;

  myfile.mv('public/images/' + myfilename, function (err) {
    if (err)
      throw err;
    //res.send('File uploaded!');
  });

 
  const mybodydata = {
    email: req.body.email,
    password: req.body.password,
    file: myfilename,
  }
  var data = AdminModel(mybodydata);

  data.save(function (err) {
    if (err) {
      console.log("Error in Add Record" + err);
    } else {
      console.log("Record Added");
      res.send("Record Successfully Added")
    }
  })

});


//forgot password

router.get('/forgot', function(req, res, next) {
  res.render('forgot');
});
//Login Process  Method
router.post('/forgot', function (req, res, next) {

  var email = req.body.email; 

  console.log(req.body);
  AdminModel.findOne({ "email": email }, function (err, db_signup_array) {

console.log("Find One " + db_signup_array);

if ( db_signup_array) {
  var email =  db_signup_array.email;
  var password =  db_signup_array.password;

}

console.log(" db_signup_array.email " + email);
console.log(" db_signup_array.password " + password);

if (email == null) {
  console.log("If");
  res.end("Email not Found");
}
else if (email == email) {
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
      user: "doctorsonclick123@gmail.com", // generated ethereal user
      pass: "doconclick123" // generated ethereal password
    }
  });

  // setup email data with unicode symbols
  let mailOptions = {
    from: "demo830870@gmail.com", // sender address
    to: email, // list of receivers
    subject: "Forgot Password", // Subject line
    text: "Hello your password is "  + password, // plain text body
    html: "Hello your password is "  + password // html body
  };

  // send mail with defined transport object
  let info = await transporter.sendMail(mailOptions)

  console.log("Message sent: %s", info.messageId);
  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

  res.end("Password Sent on your Email");
  // Message sent: b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com
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

router.get('/changepassword', function (req, res, next) {
  res.render('changepassword');
});
// router.get('/signupdisplay', function (req, res, next) {
//   res.render('signupdisplay');
// });

router.get('/signupdisplay', function(req, res, next) {
  AdminModel.find(function (err, data) {
      if (err) {
        console.log("Error in Fetch Data " + err);
      } else {
        //Print Data in Console
        console.log(data);
        //Render User Array in HTML Table
        res.render('signupdisplay', { data: data });


      }
    }).lean();

  }
}).lean();
});

module.exports = router;



module.exports = router;
module.exports = router;