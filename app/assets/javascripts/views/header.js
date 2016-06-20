SkyCast.Views.Header = Backbone.View.extend({
  initialize: function() {
    this.render();
  },

  template: JST['header'],

  render: function() {
    var content = this.template();
    this.$el.html(content);
    return this;
  }
});
