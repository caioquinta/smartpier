var fs = require('fs');
var moment = require('moment');

exports.sendorder = function(req) {
  var order_number =  moment().format('DMMYYYY_Hmm');
  //var csvWriter = require('csv-write-stream');
  //var writer = csvWriter({sendHeaders: false});
  //order_to_csv(req, writer, order_number);
  var nodemailer = require('nodemailer');
  // create reusable transporter object using the default SMTP transport
  var transporter = nodemailer.createTransport('smtps://caiodaquinta@gmail.com:hagane22222@smtp.gmail.com');

  // setup e-mail data with unicode symbols
  var mailOptions = {
      from: 'Caio <caiodaquinta@gmail.com>', // sender address
      to: ['caiodaquinta@gmail.com', req.body.email], // list of receivers
      subject: 'Solicitação de Pedido ' + order_number +' ✔', // Subject line
      text: 'Solicitação do Pedido ' + order_number, // plaintext body
      html: '<h3>Dados do Cliente</h3><table><tr><td>Nome:</td><td>'+req.body.name+'</td></tr><tr><td>E-mail:</td><td>'+req.body.email+'</td></tr><tr><td>Empresa:</td><td>'+ req.body.empresa +'</td></tr><tr><td>Endereço:</td><td>'+req.body.address+'</td></tr><td>Telefone:</td><td>'+req.body.phone+'</td></tr></table><h3>Resumo do pedido</h3><h4>Piers</h4>'+ order_piers(req)+'<h4>Acessórios</h4>'+ order_itens(req),
      attachments: [{   // data uri as an attachment 
        path: req.body.pier_image
      }//,
     // {   // binary buffer as an attachment 
     //   content: order_to_csv
     // }
      ]
    };

  // send mail with defined transport object
  transporter.sendMail(mailOptions, function(error, info){
      if(error){
          return console.log(error);
      }
  });
}

order_itens = function(req) {
  itens_list = '';
  for (var i in req.body.itens) {
    itens_list = itens_list + '<tr><td style = "font-style = italic;">'+req.body.itens[i].name+'          qtd:'+ req.body.itens[i].qtd + '</td></tr>'
  }
  return itens_list
}

order_piers = function(req) {
  piers_list = '';
  for (var i in req.body.piers_selected) {
    piers_list = piers_list + '<tr><td style = "font-style = italic;">'+req.body.piers_selected[i].name+'          qtd:'+ req.body.piers_selected[i].qtd + '</td></tr>'
  }
  return piers_list
}

order_to_csv = function(req, writer, order_number) {
  writer.pipe(fs.createWriteStream(''));
  writer.write(req.body.piers_selected({hello: "world", foo: "bar", baz: "taco"}));
  writer.end();
  //'pedido_'+ order_number +'.csv'
}