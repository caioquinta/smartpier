var APP = {};

var OrderItem = React.createClass({
  render: function() {
    return <li>{this.props.name}</li>;
  }
})

var OrderForm = React.createClass({
  render: function() {
    return (
      <div >
        <h4>Preencha seus dados Pessoais </h4>
        <form action="" method="post" enctype="multipart/form-data">
          <fieldset>
            <div className = 'col-lg-3'>
              Nome:
            </div>
            <div className = 'col-lg-9'>
              <input id = 'name' type="text" name="name" />
            </div>
            <div className = 'col-lg-3'>
              Endereço: 
            </div>
            <div className = 'col-lg-9'>
              <input type="text" name="address" />
            </div>
            <div className = 'col-lg-3'>
              Telefone:
            </div>
            <div className = 'col-lg-9'>
               <input type="text" name="phone" />
            </div>
            <input type="submit" className= 'btn btn-success sucess' value="Solicitar Orçamento " />
          </fieldset>
        </form>
      </div>
    );
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
    return (
    <div>
      <div className = 'order-list col-lg-4' >
        <h4>Itens do Pedido </h4>
        <ul>
          { itens.map(function(item) {
            return <OrderItem name = {item} />;
          })}
        </ul>
      </div>
      <div className = 'col-lg-4' >
        <h4> Layout </h4>
        <img className = 'preview-img' src = {this.state.pier_image} />
      </div>
      <div className = 'col-lg-4'>
        <OrderForm  pier_image = {this.state.pier_image} order_itens = {itens} />
      </div>
    </div>
    );
  }
})

var FinishOrder = React.createClass({
  finishOrder: function() {
    $(APP).trigger('finish');
    var $anchor = $('.order-wrapper').offset();
    $('body').animate({ scrollTop: $anchor.top });
  },

  render: function(){
    return (
      <button id = 'finish-btn' className="btn btn-success sucess" type="submit" onClick={this.finishOrder}>Finalizar Pedido<span className="glyphicon glyphicon-ok-sign" aria-hidden="true"></span></button>
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
