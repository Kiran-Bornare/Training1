var mailer = require('nodemailer');
mailer.SMTP = {
    host: "host.com", 
    port:587,
    use_authentication: true, 
    user: "doctorsonclick123@gmail.com", 
    pass: "doconclick123"
};

//Then read a file and send an email :

fs.readFile('./attachment.txt', function (err, data) {

    mailer.send_mail({       
        sender: 'doctorsonclick123@gmail.com',
        to: 'kiranbornare88@gmail.com',
        subject: 'Attachment!',
        body: 'mail content...',
        attachments: [{'filename': 'attachment.txt', 'content': data}]
    }), function(err, success) {
        if (err) {
            // Handle error
        }

    }
});