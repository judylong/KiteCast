SkyCast.Routers.Router = Backbone.Router.extend({
  initialize: function(options) {
    this.$rootEl = options.$rootEl;
  },

  routes: {
    "":"displayResult"
  },

  displayResult: function() {
    var view = new SkyCast.Views.DisplayResult({model: SkyCast.Models.weather});
    this._swapView(view);
  },

  _swapView: function(view) {
    this._currentView && this._currentView.remove();
    this._currentView = view;
    this.$rootEl.html(this._currentView.render().$el);
  }
});
