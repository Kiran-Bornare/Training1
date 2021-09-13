const nodemailer = require('nodemailer');
let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth:{
        user: 'doctorsonclick123@gmail.com',
        pass: 'doconclick123'
    }
});
let mailContent={
    from: 'Sender Name <doctorsonclick123@gmail.com>',
    to: 'Receiver Name <kiranbornare88@gmail.com>',
    subject: 'First Node.js email',
    text: 'Hi,This is a test mail sent using Nodemailer',
    html: '<h1>You can send html formatted content using Nodemailer with attachments</h1>',
    attachments: [
        {
            filename: 'attachment.txt',
            path: __dirname + '/attachment.txt'
        }
    ]
};
transporter.sendMail(mailContent, function(error, data){
    if(err){
        console.log('Unable to send mail');
    }else{
        console.log('Email send successfully');
    }
});