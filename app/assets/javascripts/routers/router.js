SkyCast.Routers.Router = Backbone.Router.extend({
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
    var view = new SkyCast.Views.DisplayResult({model: SkyCast.Models.weather});
    this._swapView(view);
  },

  landing: function() {
    var view = new SkyCast.Views.Landing();
    this._swapView(view);
  },

  newUser: function() {
    if (!this._requireLoggedOut()) { return; }
    var model = new SkyCast.Models.User();
    var view = new SkyCast.Views.UsersForm({
      model: model
    });
    this._swapView(view);
  },

  showHistory: function() {
    if (SkyCast.currentUser.isLoggedIn()) {
      var view = new SkyCast.Views.ShowHistory();
      this._swapView(view);
    } else {
      alert("Must be logged in to view history!");
    }
  },

  _swapView: function(view) {
    this._currentView && this._currentView.remove();
    this._currentView = view;
    this.$rootEl.html(this._currentView.render().$el);
  },

  logIn: function(callback) {
    if (!this._requireLoggedOut(callback)) { return; }

    var view = new SkyCast.Views.LogIn({
      callback: callback
    });
    this._swapView(view);
  },

  _requireLoggedIn: function(callback) {
    if (!SkyCast.currentUser.isLoggedIn()) {
      callback = callback || this._goHome.bind(this);
      this.logIn(callback);
      return false;
    }
    return true;
  },

  _requireLoggedOut: function(callback){
    if (SkyCast.currentUser.isLoggedIn()) {
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
