KiteCast.Views.LogIn = Backbone.View.extend({
  template: JST['shared/login'],

  initialize: function(options) {
    this.callback = options.callback;
    this.listenTo(KiteCast.currentUser, "logIn", this.logInCallback);
  },

  render: function() {
    var content = this.template();
    this.$el.html(content);
    return this;
  },

  className: "signlog-div",

  events: {
    "submit form":"submit",
    "click .guest":"loginGuest"
  },
  submit: function(e) {
    e.preventDefault();

    var $form = $(e.currentTarget);
    var loginData = $form.serializeJSON().user;

    KiteCast.currentUser.logIn({
      email: loginData.email,
      password: loginData.password,
      error: function() {
          alert("Wrong username/password combination. Please try again.");
      }
    });
  },

  logInCallback: function(e) {
    if(this.callback) {
      this.callback();
    } else {
      Backbone.history.navigate("", { trigger: true });
    }
  },

  loginGuest: function(e) {
    e.preventDefault();
    KiteCast.currentUser.logIn({
      email: 'guestUser@example.com',
      password: 'password',
      error: function() {
        alert("Wrong username/password combination. Please try again.");
      }
    });
  }

})
