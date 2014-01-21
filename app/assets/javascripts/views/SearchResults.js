KR.Views.SearchResults = Backbone.View.extend({
  events: {
  },

  template: JST["search/results"],

  render: function () {
    var renderedContent = this.template();
    var that = this;

    this.$el.html(renderedContent);

    this.collection.each(function (book) {
      var view = new KR.Views.BookListItem({
        model: book
      });
      that.$('#result_list').append(view.render().$el);
    });

    return this;
  }
});