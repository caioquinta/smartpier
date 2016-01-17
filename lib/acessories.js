/** @jsx React.DOM */
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
      	<h1>Produto: {this.props.name}!</h1>
        <span>Qtd: {this.state.count}</span>
        <button type="button" onClick={this.incrementCount}>Aumentar</button>
        <button type="button" onClick={this.decrementCount}>Diminuir</button>
      </div>
    );
  }
  
});

var AcessoryItem = React.createFactory(AcessoryItem);
ReactDOM.render(<AcessoryItem name="Banco" />, document.getElementById('acessory-item'));
