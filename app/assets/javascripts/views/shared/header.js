SkyCast.Views.Header = Backbone.View.extend({
  initialize: function() {
    this.listenTo(SkyCast.currentUser, "logIn logOut", this.render);
    this.render();
  },

  events: {
    "click #log-out-link": "logOut",
  },

  template: JST['shared/header'],

  render: function() {
    var content = this.template({currentUser: SkyCast.currentUser});
    this.$el.html(content);
    return this;
  },

  logOut: function(e) {
    e.preventDefault();
    SkyCast.currentUser.logOut({
      success: function() {
        Backbone.history.navigate("session/new", { trigger: true });
      }
    });
  }
});
