var APP = {};

var OrderItem = React.createClass({
  render: function() {
    return <li>{this.props.name}</li>;
  }
})

var ConfirmOrder = React.createClass({
    getInitialState: function (){
    return {itens: [], pier_image: null};
  },
  componentDidMount: function(){
    $(APP).on('finish', function(e){
      var new_itens = $('.acessory-item .acessory-name').map(function(){return $(this).text();}).get();
      this.setState({itens: new_itens,  pier_image: canvas.toDataURL()});
    }.bind(this));
  },

  render: function() {
    var itens = this.state.itens;
      console.log(this.state.pier_image);
      return (
      <div>
        <div className = 'col-lg-3' >
          <ul key ='order-list' >
            { itens.map(function(item) {
              return <OrderItem name = {item} />;
            })}
          </ul>
        </div>
        <div className= 'col-lg-3' >
          <img src = {this.state.pier_image} />
        </div>
      </div>
    );
  }
})

var FinishOrder = React.createClass({
  finishOrder: function() {
    $(APP).trigger('finish');
  },

  render: function(){
    return (
      <button className="btn btn-success next" type="submit" onClick={this.finishOrder}>Finalizar Pedido<span className="glyphicon glyphicon-ok-sign" aria-hidden="true"></span></button>
    );
  }

	//finishOrder: function(){
    //this.setState({finished: true });
    //ReactDOM.render(<ConfirmOrder  />, document.getElementById('confirm-order'));
        //document.getElementById('confirm-order').appendChild( Canvas2Image.convertToPNG(canvas, WIDTH, HEIGHT));

  	/*emailjs.send("default_service","teste", {name: "Caio", deck: $('#screenshot').html() })
  .then(function(response) {
     console.log("SUCCESS. status=%d, text=%s", response.status, response.text);
  }, function(err) {
     console.log("FAILED. error=", err);
  });

  }, 
 render: function(){
  return (
    <button className="btn btn-success next" type="submit" onClick={this.finishOrder}>Finalizar Pedido<span className="glyphicon glyphicon-ok-sign" aria-hidden="true"></span></button>
  );*/
  //}
});

var FinishOrder  = React.createFactory(FinishOrder);
var ConfirmOrder = React.createFactory(ConfirmOrder);
ReactDOM.render(<FinishOrder  />, document.getElementById('finish-order'));
ReactDOM.render(<ConfirmOrder  />, document.getElementById('confirm-order'));


var Counter = React.createClass({
});