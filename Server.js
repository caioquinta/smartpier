var express = require('express');
var path = __dirname + '/views/';
var app = express();
var router = express.Router();
var order = require('./controllers/order_controller.js');

var bodyParser = require('body-parser')
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use( bodyParser.urlencoded({
	limit: '50mb',     // to support URL-encoded bodies
  	extended: true
})); 

router.use(function (req,res,next) {
  console.log("/" + req.method);
  next();
});

router.get("/",function(req,res){
  res.sendFile(path + "pedido.html");
});

app.post('/sendorder', function (req, res) {
  order.sendorder(req);
  res.sendFile(path + "pedido.html");
}); 

app.use("/",router);
app.use(express.static(__dirname + '/'));

app.listen(process.env.PORT || 5000);
