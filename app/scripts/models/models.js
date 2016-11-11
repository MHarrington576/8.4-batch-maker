var Backbone = require('backbone');

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

var RecipeCollection = ParseCollection.extend({
  model: Recipe,
  url: 'https://shadow-of-the-colossus-server/herokuapp.com/classes/Recipes'
});

module.exports = {
  Ingredient: Ingredient,
  IngredientCollection: IngredientCollection,
  Recipe: Recipe,
  RecipeCollection: RecipeCollection
};
