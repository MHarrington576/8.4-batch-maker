var React = require('react');

var models = require('../models/models');

var AdjustmentForm = React.createClass({
  getInitialState: function(){
    return {
      qty: this.props.recipe.get('servings')
    }
  },

  componentWillReceiveProps: function(){
    this.setState({qty: nextProps.recipe.get('servings')});
  },

  handleQty: function(e){
    this.setState({qty: e.target.value});
    this.props.adjustQtys(e.target.value);
  },

  handleSubmit: function(e){
    e.preventDefault();
    this.props.adjustQtys(this.state.qty);
  },

  render: function(){
    return (
      <form onSubmit={this.handleSubmit} className="form-inline well">
        <div className="form-group">
          Qty: <input onChange={this.handleQty} type="text" value={this.state.qty} />
          <input type="submit" value="Adjust Qty"/>
        </div>
      </form>
    )
  }
});

var IngredientList = React.createClass({
  render: function(){
    var factor = this.props.factor;

    var ingredientListItems = this.props.ingredients.map(function(ingredient){
      var adjustedAmount = ingredient.get('amount') * factor;
      var amount = parseInt(adjustedAmount) === adjustedAmount ? adjustedAmount : adjustedAmount.toFixed(2);
      return (
        <li key={ingredient.cid} className="list-group-item">
         <input type="checkbox" /> {amount} {ingredient.get('units')} {ingredient.get('name')}
        </li>
      )
    });

    return (
      <ul className="list-group">
        {ingredientListItems}
      </ul>
    )
  }
});

var AdjustRecipeContainer = React.createClass({
  getInitialState: function(){
    return {
      factor: 1
    }
  },

  adjustQtys: function(newServings){
    var recipe = this.props.recipe;
    var newFactor = (newServings / recipe.get('servings')) || 1;
    this.setState({factor: newFactor});
  },

  render: function(){
    //  <IngredientList factor={this.state.factor} ingredients={ingredients} />
    // var ingredients = this.props.recipe.get('ingredients');
    console.log(this.props);
    return (
      <div>
       <AdjustmentForm recipe={this.props.recipe} adjustQtys={this.adjustQtys}/>

       <p className="lead">Ingredients</p>


     </div>
    )
  }
});

module.exports = {
  AdjustRecipeContainer: AdjustRecipeContainer
};
