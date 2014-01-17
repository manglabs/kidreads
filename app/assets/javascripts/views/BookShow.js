KR.Views.BookShow = Backbone.View.extend({
  events: {},
  
  template: JST["books/show"],

  render: function () {
    var renderedContent = this.template({
      book: this.model
    });
    this.$el.html(renderedContent);
    return this;
  }
  
});