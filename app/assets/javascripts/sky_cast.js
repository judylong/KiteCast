window.SkyCast = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    this.header = new SkyCast.Views.Header({el: $("#header")});
    this.router = new SkyCast.Routers.Router({$rootEl: $("#main")});
    Backbone.history.start();
  }
};

$(document).ready(function(){
  SkyCast.initialize();
});
