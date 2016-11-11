var React = require('react');

var models = require('../models/models');
var BaseLayout = require('./templates/base.jsx').BaseLayout;

var ListItem = React.createClass({
  render: function(){
    var recipe = this.props.recipe;
    return (
      <a href={'#/recipes' + recipe.get('objectId') + '/'} className="list-group-item">{recipe.get('name')}</a>
    )
  }
});

var List = React.createClass({
  render: function(){
    var recipeList = this.props.recipes.map(function(recipe){
      return <ListItem key={recipe.cid} recipe={recipe} />
    });

    return (
      <div className="col-md-9">
        <span className="lead">Recipes</span>
        <div className="list-group">
            {recipeList}
        </div>
      </div>
    )
  }
});

var RecipeListContainer = React.createClass({
  getInitialState: function(){
    return {
      recipeCollection: new models.RecipeCollection()
    };
  },

  componentWillMount: function(){
    var recipeCollection = this.state.recipeCollection;
    recipeCollection.fetch().then(function(){
      this.setState({recipeCollection: recipeCollection});
    });
  },

  render: function(){
    return (
      <BaseLayout>
        <List recipes={this.state.recipeCollection} />
      </BaseLayout>
    )
  }
});

module.exports = {
  RecipeListContainer: RecipeListContainer
};
