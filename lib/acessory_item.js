
var AddButton = React.createClass({
  addItem: function(){
    $(APP).trigger('new_item', [this.props.name.toLowerCase()]);
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

var AddButton = React.createFactory(AddButton);
var AcessoryMenu = React.createFactory(AcessoryMenu);

ReactDOM.render(<AcessoryMenu itens= {acessories} />, document.getElementById('acessory-menu'));