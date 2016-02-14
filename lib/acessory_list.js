var SelectAcessories = React.createClass({
  selectAcessories: function() {
    var $anchor = $('.acessory-wrapper').offset();
    $('body').animate({ scrollTop: $anchor.top });
  },

  render: function(){
    return (
      <button id = 'select-acesssories-btn' className="btn btn-success sucess" type="submit" onClick={this.selectAcessories}>Escolher Acessórios<span className="glyphicon glyphicon-ok-sign" aria-hidden="true"></span></button>
    );
  }
});

var AcessoryItem = React.createClass({
  incrementCount: function(){
    this.setState({
      count: this.state.count + 1
    });
  },

  decrementCount: function(){
  	if (this.state.count > 0){
	    this.setState({
	      count: this.state.count - 1
	    });
	  };
  },

  removeItem: function(){
    $(APP).trigger('remove_item', [this.props.name.toLowerCase()]);
  },

  getInitialState: function(){
     return {
       count: 1
     }
  },

 render: function(){
    return (
      <div className="acessory-item">
      	<div value={this.props.name} className= 'col-lg-8 acessory-name'>{ACESSORIES_DISPLAY_NAMES[this.props.name]}</div>
        <div className= 'col-lg-3'>
          <div className= 'col-lg-2'>
          	<span onClick={this.decrementCount}>
  	        	<span className="glyphicon glyphicon-minus qtd-btn" aria-hidden="true"></span>
          	</span>
          </div>
          <div className= 'qtd col-lg-1'>{this.state.count}</div>
          <div className = 'col-lg-1'>
  	        <span onClick={this.incrementCount}>
  	          <span className="glyphicon glyphicon-plus qtd-btn" aria-hidden="true"></span>
  	        </span>
          </div>
        </div>
        <div className= 'col-lg-1'>
          <span onClick={this.removeItem}>
            <span className="glyphicon glyphicon-remove remove-btn" aria-hidden="true"></span>
          </span>
        </div>
      </div>
    );
  }
});

var AcessoryList = React.createClass({
	getInitialState: function (){
    return { list: [] };
  },
  
  componentDidMount: function(){
    $(APP).on('new_item', function(e, item_name){
      var new_itens = this.state.list;
      new_itens.push(item_name);
      this.setState({ list: unique(new_itens)});
    }.bind(this));

    $(APP).on('remove_item', function(e, item_name){
      var new_itens = this.state.list;
      new_itens = jQuery.grep(new_itens, function(value) {
        return value != item_name;
      });
      this.setState({ list: unique(new_itens)});
    }.bind(this));
  },

	render: function() {
			var acessory_list = this.state.list;
	    return (
	      <div key='acessory-list' >
	          { acessory_list.map(function(name) {
            	return <div id = {name.toLowerCase()+'-item'} ><AcessoryItem name = {name} /></div>;
          	})}
	      </div>
	    );
	  }
});

var SelectAcessories  = React.createFactory(SelectAcessories);
var AcessoryItem = React.createFactory(AcessoryItem);
var AcessoryList = React.createFactory(AcessoryList);
ReactDOM.render(<SelectAcessories  />, document.getElementById('select-acessories'));
ReactDOM.render(<AcessoryList  />, document.getElementById('acessory-list'));
