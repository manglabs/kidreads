KR.Routers.Router = Backbone.Router.extend({
  initialize: function(object) {
    KR.books = new KR.Collections.Books();
    KR.fetch();
    this.$rootEl = object.$rootEl;
  },

  routes: {
    ""     : "booksIndex",
    "books/:id" : "bookShow"
  },

  booksIndex: function () {
    var view = new KR.Views.BooksIndex({
      collection: KR.books
    });
    this._swapView(view);
  },

  bookShow: function(bookId) {
    var book = KR.books.get(bookId);
    var view = new KR.Views.BookShow({
      model: book
    });
    this._swapView(view);
  },

  _swapView: function(view) {
    this._currentView && this._currentView.remove();
    this._currentView = view;
    $("#kr_pane").html(this._currentView.render().$el);
  }

});