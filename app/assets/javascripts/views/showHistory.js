KiteCast.Views.ShowHistory = Backbone.View.extend({
  initialize: function() {
    this.listenTo(KiteCast.currentUser, 'sync change', this.render);
    KiteCast.currentUser.fetch();
  },
  className: "history",
  template: JST['showHistory'],
  render: function() {
    var content = this.template({queries: KiteCast.currentUser.past_queries().models});
    this.$el.html(content);
    return this;
  }
});
