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

  getInitialState: function(){
     return {
       count: 1
     }
  },

 render: function(){
    return (
      <div class="acessory-item">
      	<div>{this.props.name}</div>
        <span>Qtd: {this.state.count}</span>
        <button type="button" onClick={this.incrementCount}>Aumentar</button>
        <button type="button" onClick={this.decrementCount}>Diminuir</button>
      </div>
    );
  }
});
var AcessoryItem = React.createFactory(AcessoryItem);
var AddButton = React.createClass({
	addItem: function() {
		ReactDOM.render(<AcessoryItem name = {this.props.name} />, document.getElementById('acessory-itens'));
	},

 render: function(){
  return (
  	<button  onClick={this.addItem} >{this.props.name}</button>
  );
  }
});

var AddButton = React.createFactory(AddButton);
ReactDOM.render(<AddButton name ='Banco' />, document.getElementById('menu-buttons'));
