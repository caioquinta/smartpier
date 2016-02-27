var fs = require('fs');
var moment = require('moment');

exports.sendorder = function(req) {
  var order_number =  moment().format('DMMYYYY_Hmm');
  var csvWriter = require('csv-write-stream');
  var writer = csvWriter({sendHeaders: false});
  order_to_csv(req, writer, order_number);
  var nodemailer = require('nodemailer');
  // create reusable transporter object using the default SMTP transport
  var transporter = nodemailer.createTransport('smtps://caiodaquinta@gmail.com:hagane22222@smtp.gmail.com');

  // setup e-mail data with unicode symbols
  var mailOptions = {
      from: 'Caio <caiodaquinta@gmail.com>', // sender address
      to: ['caiodaquinta@gmail.com', req.body.email], // list of receivers
      subject: 'Solicitação de Pedido ' + order_number +' ✔', // Subject line
      text: 'Solicitação do Pedido ' + order_number, // plaintext body
      html: '<h3>Dados do Cliente</h3><table><tr><td>Nome:</td><td>'+req.body.name+'</td></tr><tr><td>E-mail:</td><td>'+req.body.email+'</td></tr><tr><td>Empresa:</td><td>'+ req.body.company +'</td></tr><tr><td>Endereço:</td><td>'+req.body.address+'</td></tr><td>Telefone:</td><td>'+req.body.phone+'</td></tr></table><h3>Resumo do pedido '+ order_number +'</h3><h4>Piers</h4>'+ order_piers(req)+'<h4>Acessórios</h4>'+ order_itens(req),
      attachments: [{   // data uri as an attachment 
        path: req.body.pier_image
      },
      {   // binary buffer as an attachment 
        path: './tmp/pedido_'+ order_number +'.csv'
      }]
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
    piers_list = piers_list + '<tr><td style = "font-style = italic;">'+ req.body.piers_selected[i].name+'          qtd:'+ req.body.piers_selected[i].qtd + '</td></tr>'
  }
  return piers_list
}

order_to_csv = function(req, writer, order_number) {
  writer.pipe(fs.createWriteStream('./tmp/pedido_'+ order_number +'.csv'));
  writer.write({'col_1': '', 'col_2': 'EASY PIER', 'col_3': '', 'col_4': ''});
  writer.write('\n');  
  writer.write({'col_1': "Número do Pedido", 'col_2': order_number, 'col_3': '', 'col_4': ''});  
  personal_fields_to_csv(req, writer);
  piers_to_csv(req, writer);
  acessories_to_csv(req, writer);
  writer.end();
}

personal_fields_to_csv = function(req, writer) {
  writer.write({'col_1': 'Cliente:', 'col_2': req.body.name })
  writer.write({'col_1': 'Doc.CNPJ/CIC:' })
  writer.write({'col_1': 'Doc.I.E./ RG.:' })
  writer.write({'col_1': 'Endereço:', 'col_2': req.body.address})
  writer.write({'col_1': 'Bairro:',   'col_2': req.body.neighbourhood, 'col_3': 'Cidade:', 'col_4': req.body.city })
  writer.write({'col_1': 'CEP:',      'col_2': req.body.cep,           'col_3': 'Estado:', 'col_4': req.body.province })
  writer.write({'col_1': 'Telefone:', 'col_2': req.body.phone,         'col_3': 'E-mail:', 'col_4': req.body.email })
  writer.write({'col_1': 'Empresa:',  'col_2': req.body.company })
  writer.write({'col_1': 'Atenção de:'})
  writer.write('\n');
}

piers_to_csv = function(req, writer){  
  writer.write({'col_1': "Piers"});
  writer.write({'col_1': "Item", 'col_2': "Quant.", 'col_3' : "Preço", 'col_4' : "IPI", 'col_5' : "Tota l"});
  for (var i in req.body.piers_selected) {
    writer.write({ 'col_1': req.body.piers_selected[i].name, 
                   'col_2': req.body.piers_selected[i].qtd});
  }
  writer.write('\n');
}

acessories_to_csv = function(req, writer){
  writer.write({'col_1': "Acessórios"});
  writer.write({'col_1': "item", 'col_2': "Quantidade"});
  for (var i in req.body.itens) {
    writer.write({ 'col_1': req.body.itens[i].name, 
                   'col_2': req.body.itens[i].qtd});
  }
}