SkyCast.Views.ShowHistory = Backbone.View.extend({
  initialize: function() {
    this.listenTo(SkyCast.currentUser, 'sync change', this.render);
    SkyCast.currentUser.fetch();
  },
  className: "history",
  template: JST['showHistory'],
  render: function() {
    var content = this.template({queries: SkyCast.currentUser.past_queries().models});
    this.$el.html(content);
    return this;
  }
});
