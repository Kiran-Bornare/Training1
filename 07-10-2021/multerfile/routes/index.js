var express = require('express');
var router = express.Router();
const multer = require('multer');
const nodemailer = require("nodemailer");
/* GET home page. */
router.get('/',(req,res) => {
  res.render('index');
})

var to;
var subject;
var body;
var path

var Storage = multer.diskStorage({
    destination: function(req, file, callback) {
        callback(null, "./images");
    },
    filename: function(req, file, callback) {
        callback(null, file.fieldname + "_" + Date.now() + "_" + file.originalname);
    }
});

var upload = multer({storage: Storage}); //Field name and max count

router.get('/index',(req,res) => {
  res.render('index');
})

router.post('/sendemail',upload.array('image','2'),(req,res) => {
    (req,res,function(err){
        if(err){
            console.log(err)
            return res.end("Something went wrong!");
        }else{
            to = req.body.to
            subject = req.body.subject
            body = req.body.subject
            path = req.file.path
            var transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                  user: 'demo830870@gmail.com',
                  pass: 'Demo@123'
                }
              });
              
              var mailOptions = {
                from: 'demo830870@gmail.com',
                to: to,
                subject:subject,
                text:body,
                attachments: [
                  {
                   path: path
                  }
               ]
              };
              
              transporter.sendMail(mailOptions, function(error, info){
                if (error) {
                  console.log(error);
                } else {
                  console.log('Email sent: ' + info.response);
                  fs.unlink(path,function(err){
                    if(err){
                        return res.end(err)
                    }else{
                        console.log("deleted")
                        return res.send('Email sent')
                    }
                  })
                }
              });
        }
    })
})


module.exports = router;
