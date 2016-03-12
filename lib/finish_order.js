var OrderItem = React.createClass({
  getInitialState: function(){
     return {
        qtd: $('#'+ this.props.name + '-item .qtd').text()
     }
  },

  componentDidMount: function(){
    $(APP).on('finish', function(e){
      this.setState({
        qtd: $('#'+ this.props.name + '-item .qtd').text()
      });
    }.bind(this));
  },

  render: function() {
    return ( 
      <div>
        <div className = 'col-lg-10'>
          {ACESSORIES_DISPLAY_NAMES[this.props.name]}
        </div>
        <div className = 'col-lg-2'>
          x{this.state.qtd}
        </div>
      </div>
    );
  }
})


var OrderForm = React.createClass({
  getInitialState: function (){
    return { pier_image: null, name: '', phone: '', address: '', email: '', 
             company: '', province: '', neighbourhood: '', city: '',
             cep: '', itens: {}, piers_selected: {}, connectors_qtd: 0, mother_connectors_qtd: 0 };
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
      var new_itens = [];
      var new_piers = [];
      $('.acessory-item .acessory-name').map(function(){ new_itens.push({name: $(this).text(), qtd: $('#'+ $(this).attr('value') + '-item .qtd').text()})}).get();
      $.map(itensByOcurrency(piers), function( value, key ) { new_piers.push({ name: PIERS_DISPLAY_NAMES[key], qtd: value })}); 
      this.setState({itens: new_itens, piers_selected: new_piers, pier_image: canvas.toDataURL()});
    }.bind(this));
  },

  goBack: function() {
    var $anchor = $('.acessory-wrapper').offset();
    $('body').animate({ scrollTop: $anchor.top });
  },
  
  handleSubmit: function(e) {
    e.preventDefault();
    var $anchor = $('.finished-wrapper').offset();
    var connectors = calculateConnectors();
    this.state['connectors_qtd'] = connectors['connectors_qtd'];
    this.state['mother_connectors_qtd'] = connectors['mother_connectors_qtd'];
    $('body').animate({ scrollTop: $anchor.top });
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
        <form id = 'order_form' onSubmit ={this.handleSubmit} method="post" enctype="multipart/form-data">
          <fieldset>
            <div className = 'col-lg-3'>
              Nome:*
            </div>
            <div className = 'col-lg-9'>
              <input type="text" value={this.state.name} onChange={this.handleChange('name')} required title="Campo obrigatório" />
            </div>
            <div className = 'col-lg-3'>
              Telefone:*
            </div>
            <div className = 'col-lg-9'>
              <input type="text" value={this.state.phone} onChange={this.handleChange('phone')} required title="Campo obrigatório" />
            </div>
            <div className = 'col-lg-3'>
              E-mail:*
            </div>
            <div className = 'col-lg-9'>
              <input type="text" value={this.state.email} onChange={this.handleChange('email')} required title="Campo obrigatório"  />
            </div>
            <div className = 'col-lg-3'>
              Endereço: 
            </div>
            <div className = 'col-lg-9'>
              <input type="text" value={this.state.address} onChange={this.handleChange('address')}  />
            </div>
            <div className = 'col-lg-3'>
              Bairro: 
            </div>
            <div className = 'col-lg-3'>
              <input type="text" value={this.state.neighbourhood} onChange={this.handleChange('neighbourhood')}  />
            </div>
            <div className = 'col-lg-2'>
              CEP: 
            </div>
            <div className = 'col-lg-3'>
              <input type="text" value={this.state.cep} onChange={this.handleChange('cep')}  />
            </div>
            <div className = 'col-lg-3'>
              Cidade: 
            </div>
            <div className = 'col-lg-3'>
              <input type="text" value={this.state.city} onChange={this.handleChange('city')}  />
            </div>
            <div className = 'col-lg-2'>
              Estado: 
            </div>
            <div className = 'col-lg-2'>
              <input type="text" value={this.state.province} onChange={this.handleChange('province')}  />
            </div>
            <div className = 'col-lg-3'>
              Empresa:
            </div>
            <div className = 'col-lg-9'>
              <input type="text" value={this.state.company} onChange={this.handleChange('company')}  />
            </div>
            <div className = 'col-lg-10'>
              <button type="submit" className= 'btn btn-success sucess'>Solicitar Orçamento<span className="glyphicon glyphicon-ok-sign" aria-hidden="true"></span></button>
            </div>
            <div className = 'col-lg-2'>
              <button type = 'button' className="btn btn-primary up"  onClick={this.goBack}><span className="glyphicon glyphicon-chevron-up" aria-hidden="true"></span></button>
            </div>
          </fieldset>
        </form>

      </div>
    );
  }
})

var ConfirmOrder = React.createClass({
  getInitialState: function (){
    return { itens: [], piers_selected: [], pier_image: null, connectors: {} };
  },
  
  componentDidMount: function(){
    $(APP).on('finish', function(e){
      var new_itens = $('.acessory-item .acessory-name').map(function(){return $(this).attr('value');}).get();
      var new_piers = [];
      var new_connectors = calculateConnectors();
      new_piers = itensByOcurrency(piers);
      this.setState({itens: new_itens, piers_selected: new_piers, pier_image: canvas.toDataURL(), connectors: new_connectors});
    }.bind(this));
  },

  render: function() {
    var acessories = this.state.itens;
    var current_piers = this.state.piers_selected;
    return (
    <div>
      <div className = 'order-list col-lg-6' >
        <div className = 'col-lg-12'>
          <h4>Itens do Pedido </h4>
          <h5>Piers </h5>
          <div className = 'order-itens panel-body'>
            { $.map(current_piers, function(qtd, name){
              return ( 
                <div>
                  <div className = 'col-lg-10'>
                    {PIERS_DISPLAY_NAMES[name]}
                  </div>
                  <div className = 'col-lg-2'>
                    x{qtd}
                  </div>
                </div>
                );
              })
            }
          </div >
          <div className = 'order-itens panel-body'>
            { $.map(this.state.connectors, function(qtd, name){
              return ( 
                <div>
                  <div className = 'col-lg-10'>
                    {name}
                  </div>
                  <div className = 'col-lg-2'>
                    x{qtd}
                  </div>
                </div>
                );
              })
            }
          </div >
          <h5>Acessórios </h5>
          <div className = 'order-itens panel-body'>
            { acessories.map(function(item) {
              return <OrderItem name = {item} />;
            })}
          </div >
        </div>
        <div className = 'col-lg-12' >
          <h4> Layout </h4>
          <img className = 'preview-img' src = {this.state.pier_image} />
        </div>
      </div>
      <div className = 'col-lg-6'>
        <OrderForm order_itens = {acessories} />
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

  goBack: function() {
    var $anchor = $('.draw-pier-wrapper').offset();
    $('body').animate({ scrollTop: $anchor.top });
  },

  render: function(){
    return (
      <div>
        <div className = 'col-lg-10'>
          <button id = 'finish-btn' className="btn btn-success sucess" type="submit" onClick={this.finishOrder}>Dados Pessoais<span className="glyphicon glyphicon-ok-sign" aria-hidden="true"></span></button>
        </div>
        <div className = 'col-lg-2'>
          <button className="btn btn-primary up" type='button' onClick={this.goBack}><span className="glyphicon glyphicon-chevron-up" aria-hidden="true"></span></button>
        </div>
      </div>
    );
  }
});

var FinishOrder  = React.createFactory(FinishOrder);
var ConfirmOrder = React.createFactory(ConfirmOrder);
ReactDOM.render(<FinishOrder  />, document.getElementById('finish-order'));
ReactDOM.render(<ConfirmOrder  />, document.getElementById('confirm-order'));
