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
      <div  className="acessory-item">
      	<div className= 'col-lg-6'>{this.props.name}</div>
        <div className= 'qtd col-lg-2'>Qtd: {this.state.count}</div>
        <div className= 'col-lg-2'> 
        	<button className= "btn btn-default"  type="button" onClick={this.decrementCount}>
	        	<span className="glyphicon glyphicon-minus" aria-hidden="true"></span>
        	</button>
        </div>
	      <div className= 'col-lg-2'> 
	        <button className= "btn btn-default" type="button" onClick={this.incrementCount}>
	        		<span className="glyphicon glyphicon-plus" aria-hidden="true"></span>
	        </button>
	      </div>
      </div>
    );
  }
});


var AddButton = React.createClass({
  addItem: function(){
    var acessory_id= this.props.name.toLowerCase() + '-item';
    ReactDOM.render(<AcessoryItem name = {this.props.name} />, document.getElementById(acessory_id));
  },

 render: function(){
  return (
    <button  className= 'btn btn-primary' onClick={this.addItem} >{this.props.name}</button>
  );
  }
});

var AcessoryMenu = React.createClass({
    render: function() {
      return (
        <div key='menu-itens' >
          {acessories.map(function(result) {
            return <AddButton id = {result.toLowerCase()+'-btn'} key={result+'-menu'}  name = {result}/>;
          })}
        </div>
      );
    }
});


var AcessoryItem = React.createFactory(AcessoryItem);
var AddButton = React.createFactory(AddButton);
var AcessoryMenu = React.createFactory(AcessoryMenu);

ReactDOM.render(<AcessoryMenu itens= {acessories} />, document.getElementById('acessory-menu'));