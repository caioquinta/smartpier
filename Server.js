var express = require('express');
var path = __dirname + '/views/';
var app = express();
var router = express.Router();
var nodemailer = require('nodemailer');

var bodyParser = require('body-parser')
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 


router.use(function (req,res,next) {
  console.log("/" + req.method);
  next();
});

router.get("/",function(req,res){
  res.sendFile(path + "index.html");
});

app.post('/sendorder', function (req, res) {
  var name = req.body.name;
  sendorder(req);
  res.sendFile(path + "index.html");
}); 

app.use("/",router);
app.use(express.static(__dirname + '/'));

app.listen(3000,function(){
  console.log("Live at Port 3000");
});

sendorder = function(req) {
  var nodemailer = require('nodemailer');

  // create reusable transporter object using the default SMTP transport
  var transporter = nodemailer.createTransport('smtps://caiodaquinta@gmail.com:hagane22222@smtp.gmail.com');

  // setup e-mail data with unicode symbols
  var mailOptions = {
      from: 'Caio <caiodaquinta@gmail.com>', // sender address
      to: req.body.email, // list of receivers
      subject: 'Solicitação de Pedido ✔', // Subject line
      text: 'Solicitação do Pedido', // plaintext body
      html: '<h3>Dados do Cliente</h3><table><tr><td>Nome:</td><td>'+req.body.name+'</td></tr><tr><td>E-mail:</td><td>'+req.body.email+'</td></tr><tr><td>Endereço:</td><td>'+req.body.address+'</td></tr><td>Telefone:</td><td>'+req.body.phone+'</td></tr></table><h3>Resumo do pedido</h3><h4>Piers</h4>'+ orderPiers(req)+'<h4>Acessórios</h4>'+ orderItens(req),
      attachments: [{   // data uri as an attachment 
        path: req.body.pier_image
      }]
    };

  // send mail with defined transport object
  transporter.sendMail(mailOptions, function(error, info){
      if(error){
          return console.log(error);
      }
  });
}

orderItens = function(req) {
  itens_list = '';
  for (var i in req.body.itens) {
    itens_list = itens_list + '<tr><td style = "font-style = italic;">'+req.body.itens[i].name+'     x'+ req.body.itens[i].qtd + '</td></tr>'
  }
  return itens_list
}

orderPiers = function(req) {
  piers_list = '';
  for (var i in req.body.piers_selected) {
    piers_list = piers_list + '<tr><td style = "font-style = italic;">'+req.body.piers_selected[i].name+'     x'+ req.body.piers_selected[i].qtd + '</td></tr>'
  }
  return piers_list
}
