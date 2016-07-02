KiteCast.Models.User = Backbone.Model.extend({
  urlRoot: "/api/users",

  toJSON: function() {
    var json = { user: _.clone(this.attributes) };
    return json;
  },

  past_queries: function() {
    if (!this._past_queries) {
      this._past_queries = new KiteCast.Collections.PastQueries();
    }
    return this._past_queries;
  },

  parse: function(resp) {
    if (resp.past_queries) {
      this.past_queries().set(resp.past_queries);
      delete resp.past_queries;
    }
    return resp;
  },

});

KiteCast.Models.CurrentUser = KiteCast.Models.User.extend({
  url: "/api/session",

  initialize: function(options) {
    this.listenTo(this, "change", this.fireSessionEvent);
  },

  isLoggedIn: function() {
    return !this.isNew();
  },

  logIn: function(options) {
    var model = this;
    var credentials = {
      "user[email]": options.email,
      "user[password]": options.password
    };

    $.ajax({
      url: this.url,
      type: "POST",
      data: credentials,
      dataType: "json",
      success: function(data) {
        model.set(data);
        model.fetch();
      },
      error: function() {
        alert("Error! Could not log in.");
      }
    });
  },

  logOut: function(options) {
    var model = this;

    $.ajax({
      url: this.url,
      type: "DELETE",
      dataType: "json",
      success: function(data) {
        model.clear();
        Backbone.history.navigate("", {trigger: true});
      },
      error: function() {
        alert("Error! Could not log out.");
      }
    });
  },

  fireSessionEvent: function() {
    if (this.isLoggedIn()){
      this.trigger("logIn");
    } else {
      this.trigger("logOut");
    }
  }
});
