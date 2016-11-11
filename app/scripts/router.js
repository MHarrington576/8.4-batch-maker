var Backbone = require('backbone');
var React = require('react');
var ReactDOM = require('react-dom');

var setupParse = require('./parseUtilities').setupParse;
var AdjustRecipeContainer = require('./components/adjustRecipe.jsx').AdjustRecipeContainer;
var RecipeAddEditContainer = require('./components/recipeForm.jsx').RecipeAddEditContainer;
var RecipeListContainer = require('./components/recipeList.jsx').RecipeListContainer;
var RecipeDetailContainer = require('./components/recipeDetail.jsx').RecipeDetailContainer;
var LoginContainer = require('./components/login.jsx').LoginContainer;

var AppRouter = Backbone.Router.extend({
  routes: {
    '': 'index',
    'recipes/add/': 'recipeAddEdit',
    'recipes/:id/edit/': 'recipeAddEdit',
    'recipes/:id/': 'recipeDetail',
    'recipes/': 'recipeList',
  },
  initialize: function(){
    setupParse("tiyfeefall2016", "parietinaeumbra")
  },

  index: function(){
    ReactDOM.render(
      React.createElement(LoginContainer),
      document.getElementById('app')
    )
  },

  recipeAddEdit: function(recipeId){
    ReactDOM.render(
      React.createElement(RecipeAddEditContainer, {recipeId: recipeId}),
      document.getElementById('app')
    );
  },

  recipeDetail: function(recipeId){
    ReactDOM.render(
      React.createElement(RecipeDetailContainer, {recipeId: recipeId}),
      document.getElementById('app')
    );
  },

  recipeList: function(){
    // var token = localStorage.getItem('token');
    // setupParse("tiyfeefall2016", "parietinaeumbra", token);
    ReactDOM.render(
      React.createElement(RecipeListContainer),
      document.getElementById('app')
    );
  },
});

var router = new AppRouter();

module.exports = router;
