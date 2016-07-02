KiteCast.Routers.Router = Backbone.Router.extend({
  initialize: function(options) {
    this.$rootEl = options.$rootEl;
  },

  routes: {
    "":"landing",
    "users/new":"newUser",
    "history":"showHistory",
    "display":"displayResult",
    "session/new":"logIn",
  },

  displayResult: function() {
    var view = new KiteCast.Views.DisplayResult({model: KiteCast.Models.weather});
    this._swapView(view);
  },

  landing: function() {
    var view = new KiteCast.Views.Landing();
    this._swapView(view);
  },

  newUser: function() {
    if (!this._requireLoggedOut()) { return; }
    var model = new KiteCast.Models.User();
    var view = new KiteCast.Views.UsersForm({
      model: model
    });
    this._swapView(view);
  },

  showHistory: function() {
    var view = new KiteCast.Views.ShowHistory();
    this._swapView(view);
  },

  _swapView: function(view) {
    this._currentView && this._currentView.remove();
    this._currentView = view;
    this.$rootEl.html(this._currentView.render().$el);
  },

  logIn: function(callback) {
    if (!this._requireLoggedOut(callback)) { return; }

    var view = new KiteCast.Views.LogIn({
      callback: callback
    });
    this._swapView(view);
  },

  _requireLoggedIn: function(callback) {
    if (!KiteCast.currentUser.isLoggedIn()) {
      callback = callback || this._goHome.bind(this);
      this.logIn(callback);
      return false;
    }
    return true;
  },

  _requireLoggedOut: function(callback){
    if (KiteCast.currentUser.isLoggedIn()) {
      callback = callback || this._goHome.bind(this);
      callback();
      return false;
    }
    return true;
  },

  _goHome: function() {
    Backbone.history.navigate("#", { trigger: true });
  }
});
