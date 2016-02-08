var AddButton = React.createClass({
  addItem: function(){
    $(APP).trigger('new_item', [this.props.name]);
  },

  render: function(){
    return (
      <button  className= 'btn btn-primary' onClick={this.addItem} >{ acessories[this.props.name] }</button>
    );
  }
});

var AcessoryMenu = React.createClass({
    render: function() {
      return (
        <div key='menu-itens' >
          {
            $.map(acessories, function(_, name){
              return <AddButton id = {name.toLowerCase()+'-btn'} key={name +'-menu'} name = {name.toLowerCase()} />;
            })
          }
        </div>
      );
    }
});

var AddButton = React.createFactory(AddButton);
var AcessoryMenu = React.createFactory(AcessoryMenu);

ReactDOM.render(<AcessoryMenu  />, document.getElementById('acessory-menu'));