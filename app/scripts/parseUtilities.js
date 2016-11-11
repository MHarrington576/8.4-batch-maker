var Backbone = require('backbone');

function setUpParse(appId, apiKey, sessionId){
  $.ajaxSetup({
    beforeSend: function(xhr){
      xhr.setRequestHeader('X-Parse-Application-Id', appId);
      xhr.setRequestHeader('X-Parse-REST-API-Key', apikey);

      if(sessionId){
        xhr.setRequestHeader('X-Parse-Session-Token', sessionId);
      };
    }
  });
}

var User = Backbone.Model.extend({
  auth: function(){
    $.ajaxSetup({
      beforeSend: function(xhr){
        xhr.setRequestHeader('X-Parse-Application-Id', appId);
        xhr.setRequestHeader('X-Parse-REST-API-Key', apikey);

        if(sessionId){
          xhr.setRequestHeader('X-Parse-Session-Token', sessionId);
        };
      }
    });
  },

}, {
  login: function(username, password, callbackObj){
    $.post('/login/', {username: username, password: password}).then(function(response){
      var user = new User(response);
    });
  },

  current: function(){
    var userData = localStorage.getItem('user');

    if(!userData || !JSON.parse(userData).token){
      return undefined;
    };

    return new User(JSON.parse(userData));
  }
});

var user = User.current();

module.exports = {
  setUpParse: setUpParse
};
