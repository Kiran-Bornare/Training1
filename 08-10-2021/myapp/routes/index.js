var express = require('express');
var router = express.Router();

var AdminModel = require('../schema/signup');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get('/login', function (req, res, next) {
  res.render('login',);
});

router.get('/signup', function (req, res, next) {
  res.render('signup',);
});




// router.post('/signup', function (req, res, next) {

//   // AdminModel.find.then(()=>{

//   // }).catch(()=>{
//   //   throw err;
//   // })

//   const mybodydata = {

//     email: req.body.email,
//     password: req.body.password,
//     file: req.body.file,

//   }

//   var file = req.files.file;
//   var myfilename = req.files.file.name;
//   file.mv('bin/images/'+myfilename, function(err) {
//     if (err)
//     throw err;
//     //res.send('File uploaded!');
//     });


//   var data = AdminModel(mybodydata);

//   data.save(function (err) {
//     if (err) {
//       console.log("Error in Insert Record" + err);
//     } else {
//       res.render('signup');
//       res.send("Record Successfully added")
//     }
//   })

// });

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


router.get('/forgotpassword', function (req, res, next) {
  res.render('forgotpassword');
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
});

module.exports = router;



module.exports = router;
