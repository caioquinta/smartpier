var AcessoryList = React.createClass({
	render: function() {
	    return (
	      <div key='acessory-list' >
	        {acessories.map(function(result) {
	          return <div id = {result.toLowerCase()+'-item'} key={result+'-item'}></div>;
	        })}
	      </div>
	    );
	  }
});

var AcessoryList = React.createFactory(AcessoryList);
ReactDOM.render(<AcessoryList  />, document.getElementById('acessory-list'));

