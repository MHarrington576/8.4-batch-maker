var React = require('react');

var models = require('../models/models');
var BaseLayout = require('./templates/base.jsx').BaseLayout;

var ListItem = React.createClass({
    render: function() {
      var recipe = this.props.recipe;
      return (
           <a href={'#recipes/' + recipe.objectId + '/'} className="list-group-item">{recipe.name}</a>
      )
    }
});

var List= React.createClass({
  render: function(){
    var recipeList = this.props.recipes.map(function(recipe){
      return <ListItem key={recipe.objectId} recipe={recipe}/>
    });
    return(
      <div className='col-md-9'>
        <p className='lead'>Recipes</p>
        <div className="list-group">
          {recipeList}
        </div>
      </div>
    )
  }
  });


var RecipeListContainer = React.createClass({
    getInitialState: function() {
        return {
          recipeCollection: new models.RecipeCollection()
        };
    },
    componentWillMount: function() {
        var recipeCollection = this.state.recipeCollection;
        recipeCollection.fetch().then((response) => {
            this.setState({recipeCollection: response.results});
            console.log(this.state);
        });
    },

    render: function() {
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
