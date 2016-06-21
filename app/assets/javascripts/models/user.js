SkyCast.Models.User = Backbone.Model.extend({
  urlRoot: "/api/users",

  toJSON: function() {
    var json = { user: _.clone(this.attributes) };
    return json;
  },

  // past_queries: function() {
  //   if (!this._past_queries) {
  //     this._past_queries = new SkyCast.Collections.PastQueries();
  //   }
  //   return this._past_queries;
  // },
  //
  // parse: function(resp) {
  //   if (resp.past_queries) {
  //     this.past_queries().set(resp.past_queries);
  //     delete resp.past_queries;
  //   }
  //   return resp;
  // },

});

SkyCast.Models.CurrentUser = SkyCast.Models.User.extend({
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
        options.success && options.success();
      },
      error: function() {
        options.error && options.error();
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
        options.success && options.success();
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
