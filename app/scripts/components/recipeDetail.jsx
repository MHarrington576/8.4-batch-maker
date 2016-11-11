var React = require('react');

var models = require('../models/models');
var BaseLayout = require('./templates/base.jsx').BaseLayout;
var AdjustRecipeContainer = require('./adjustRecipe.jsx').AdjustRecipeContainer;

var RecipeHeading = React.createClass({
  render: function(){
    return (
      <div>
        <h2>{this.props.recipe.get('name')}</h2>
        <a href={'#/recipes/' + this.props.recipe.get('objectId') + '/edit/'}>Edit</a>
      </div>
    )
  }
});

var RecipeDetailContainer = React.createClass({
  getInitialState: function(){
    return {
      recipe: new models.Recipe()
    }
  },

  componentWillMount: function(){
    var recipe = this.state.recipe;
    var recipeId = this.props.recipeId;

    if(!recipeId){
      return;
    }

    recipe.set('objectId', recipeId);
    recipe.fetch().then(function(){
      this.setState({recipe: recipe});
    });
  },

  render: function(){
    return (
      <BaseLayout>
        <RecipeHeading recipe={this.state.recipe} />
        <AdjustRecipeContainer recipe={this.state.recipe} />
      </BaseLayout>
    )
  }
});

module.exports = {
  RecipeDetailContainer: RecipeDetailContainer
};
