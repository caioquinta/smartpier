var express = require('express');
var path = __dirname + '/views/';
var app = express();
var router = express.Router();
var nodemailer = require('nodemailer');

router.use(function (req,res,next) {
  console.log("/" + req.method);
  next();
});

router.get("/",function(req,res){
  res.sendFile(path + "index.html");
});

app.use("/",router);
app.use(express.static(__dirname + '/'));

app.listen(3000,function(){
  console.log("Live at Port 3000");
});

//var nodemailer = require('nodemailer');

// create reusable transporter object using the default SMTP transport
//var transporter = nodemailer.createTransport('smtps://caiodaquinta@gmail.com:hagane22222@smtp.gmail.com');

// setup e-mail data with unicode symbols
/*var mailOptions = {
    from: 'Caio <caiodaquinta@gmail.com>', // sender address
    to: 'caiodaquinta@gmail.com', // list of receivers
    subject: 'Hello ✔', // Subject line
    text: 'Hello world 🐴', // plaintext body
    html: '<b>Hello world 🐴</b>' // html body
};
*/
// send mail with defined transport object
/*transporter.sendMail(mailOptions, function(error, info){
    if(error){
        return console.log(error);
    }
    console.log('Message sent: ' + info.response);
});

*/