var Backbone = require('backbone');

var User = Backbone.Model.extend({
  idAttribute: 'objectId',
  urlRoot: 'https://shadow-of-the-colossus-server.herokuapp.com/users',

  parse: function(data){
    return data.results;
  },

  signUp: function(){
    var self = this;
    var username = this.get('username');
    var password = this.get('password');

    this.save().then(function(data){
      localStorage.setItem('user', JSON.stringify(self.toJSON()));
    });
  },

  signIn: function(username, password){
    var self = this;
    var loginUrl = 'https://shadow-of-the-colossus-server.herokuapp.com/' + 'login?username=' + encodeURI(username) + '&password=' + encodeURI(password);
    $.ajax(loginUrl).then(function(response){
      localStorage.setItem('token', response.sessionToken);
      Backbone.history.navigate('recipes/', {trigger: true});
    })
  }
});

var ParseModel = Backbone.Model.extend({
  idAttribute: 'objectId',
  save: function(key, val, options){
    delete this.attributes.createdAt;
    delete this.attributes.updatedAt;
    return Backbone.Model.prototype.save.apply(this, arguments);
  }
});

var ParseCollection = Backbone.Collection.extend({
  whereClause: {field: '', className: '', objectId: ''},
  parseWhere: function(field, className, objectId){
    this.whereClause = {
      field: field,
      className: className,
      objectId: objectId,
      '__type': 'Pointer'
    };
    return this;
  },

  url: function(){
    var url = this.baseUrl;
    if(this.whereClause.field){
      var field = this.whereClause.field;
      delete this.whereClause.field;
      url += '?where={"' + field + '":' + JSON.stringify(this.whereClause) + '}';
    }
    return url;
  },

  parse: function(data){
    return data.results;
  }
});

var Ingredient = ParseModel.extend({
  defaults: {
    name: '',
    amount: 0,
    units: ''
  }
});

var IngredientCollection = ParseCollection.extend({
  model: IngredientCollection,
  baseUrl: 'https://shadow-of-the-colossus-server.herokuapp.com/classes/Ingredients'
});

var Recipe = ParseModel.extend({
  defaults: {
    name: '',
    chefId: '',
    servings: 0,
    servingType: '',
    ingredients: new IngredientCollection()
  },

  urlRoot: 'https://shadow-of-the-colossus-server.herokuapp.com/classes/Recipes',

  save: function(key, val, options){
    this.set('ingredients', this.get('ingredients').toJSON());
    return ParseModel.prototype.save.apply(this, arguments);
  },

  parse: function(data){
    data.ingredients = new IngredientCollection(data.ingredients);
    return data;
  }
});

var RecipeCollection = Backbone.Collection.extend({
  model: Recipe,
  url: 'https://shadow-of-the-colossus-server.herokuapp.com/classes/Recipes',

  // parse: function(data){
  //   return data.results;
  // }
});

module.exports = {
  Ingredient: Ingredient,
  IngredientCollection: IngredientCollection,
  Recipe: Recipe,
  RecipeCollection: RecipeCollection,
  User: User
};
