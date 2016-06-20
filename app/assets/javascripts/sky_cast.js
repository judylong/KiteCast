window.SkyCast = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    this.router = new SkyCast.Routers.Router({$rootEl: $("#main")});
    Backbone.history.start();
  }
};

$(document).ready(function(){
  SkyCast.initialize();
});
