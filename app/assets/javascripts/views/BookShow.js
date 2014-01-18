KR.Views.BookShow = Backbone.View.extend({
  events: {
    "change #list-selector" : "listSelected"
  },
  
  template: JST["books/show"],

  initialize: function () {
    this.listenTo(this.model, "add remove reset", this.render)
  },

  render: function () {
    var renderedContent = this.template({
      book: this.model
    });
    this.$el.html(renderedContent);
    return this;
  },

  listSelected: function (event) {
    event.preventDefault();
    var statusVal = $(event.target).val();

    var status = new KR.Models.BookStatus({
      book_id: this.model.id, 
      status: statusVal
    });
    status.save();

    //KR.books.add(this.model);
  }
  
});