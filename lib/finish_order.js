var FinishOrder = React.createClass({
	finishOrder: function(){
  	document.getElementById('screenshot').appendChild(Canvas2Image.convertToPNG(canvas, WIDTH, HEIGHT));
  	 /*emailjs.send("default_service","teste", {name: "Caio", deck: $('#screenshot').html() })
  .then(function(response) {
     console.log("SUCCESS. status=%d, text=%s", response.status, response.text);
  }, function(err) {
     console.log("FAILED. error=", err);
  });*/

  }, 

 render: function(){
  return (
    <button className="btn btn-success next" type="submit" onClick={this.finishOrder}>Finalizar Pedido<span className="glyphicon glyphicon-ok-sign" aria-hidden="true"></span></button>
  );
  }
});

var FinishOrder = React.createFactory(FinishOrder);
ReactDOM.render(<FinishOrder  />, document.getElementById('finish-order'));
