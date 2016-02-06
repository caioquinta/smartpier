var APP = {};

var OrderItem = React.createClass({
  render: function() {
    return <li>{this.props.name}</li>;
  }
})

var OrderForm = React.createClass({
  getInitialState: function (){
    return { pier_image: null, name: '', phone: '', address: '', email: '', itens: []};
  },

  handleChange: function (key) {
    return function (e) {
      var state = {};
      state[key] = e.target.value;
      this.setState(state);
    }.bind(this);
  },

  componentDidMount: function(){
    $(APP).on('finish', function(e){
      var new_itens = $('.acessory-item .acessory-name').map(function(){return $(this).text();}).get();
      this.setState({itens: new_itens,  pier_image: canvas.toDataURL()});
    }.bind(this));
  },


  handleSubmit: function(e) {
    e.preventDefault();
    $.ajax({
      type: 'POST',
      url: '/sendorder',
      data: this.state,
      success: function(data) {
        console.log('success');
      }.bind(this),
    })
  },

  render: function() {
    return (
      <div >
        <h4>Preencha seus dados Pessoais </h4>
        <form onSubmit ={this.handleSubmit} method="post" enctype="multipart/form-data">
          <fieldset>
            <div className = 'col-lg-3'>
              Nome:
            </div>
            <div className = 'col-lg-9'>
              <input type="text" value={this.state.name} onChange={this.handleChange('name')}  />
            </div>
            <div className = 'col-lg-3'>
              Endereço: 
            </div>
            <div className = 'col-lg-9'>
              <input type="text" value={this.state.address} onChange={this.handleChange('address')}  />
            </div>
            <div className = 'col-lg-3'>
              Telefone:
            </div>
            <div className = 'col-lg-9'>
              <input type="text" value={this.state.phone} onChange={this.handleChange('phone')}  />
            </div>
            <div className = 'col-lg-3'>
              E-mail:
            </div>
            <div className = 'col-lg-9'>
              <input type="text" value={this.state.email} onChange={this.handleChange('email')}  />
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
        <ul className = 'order-itens'>
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
        <OrderForm order_itens = {itens} />
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
});

var FinishOrder  = React.createFactory(FinishOrder);
var ConfirmOrder = React.createFactory(ConfirmOrder);
ReactDOM.render(<FinishOrder  />, document.getElementById('finish-order'));
ReactDOM.render(<ConfirmOrder  />, document.getElementById('confirm-order'));