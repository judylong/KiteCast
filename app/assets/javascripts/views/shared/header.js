KiteCast.Views.Header = Backbone.View.extend({
  initialize: function() {
    this.listenTo(KiteCast.currentUser, "logIn logOut", this.renderSub);
    this.render();
  },

  events: {
    "click #log-out-link": "logOut",
  },

  template: JST['shared/header'],

  render: function() {
    var content = this.template();
    this.$el.html(content);
    setTimeout(this.renderSub.bind(this), 0);
    return this;
  },

  renderSub: function() {
    $('#headerSub').html(JST['shared/headerSub']({currentUser: KiteCast.currentUser}));
  },

  logOut: function(e) {
    e.preventDefault();
    KiteCast.currentUser.logOut({
      success: function() {
        Backbone.history.navigate("session/new", { trigger: true });
      }
    });
  }
});
