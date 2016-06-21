SkyCast.Views.ShowHistory = Backbone.View.extend({
  initialize: function() {
    this.listenTo(SkyCast.currentUser, 'sync', this.render);
  },
  template: JST['showHistory'],
  render: function() {
    var content = this.template({queries: SkyCast.currentUser.past_queries().models});
    this.$el.html(content);
    return this;
  }
});
