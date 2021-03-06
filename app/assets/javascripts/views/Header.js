KR.Views.Header = Backbone.View.extend({
  events: {
    "submit form#searchbox" : "goSearch",
    "click button#new-club-submit" : "submitClub",
    "click button#new-kid-submit" : "submitKid",
    "click button#random-book-button" : "randomBook"
  },
  
  template: JST["root/header"],

  initialize: function () {
    this.listenTo(KR.clubs, "all", this.render);
    this.listenTo(KR.books, "all", this.render);
    this.listenTo(KR.kids, "all", this.render);
  },

  render: function () {
    var renderedContent = this.template({
      role: KR.currentRole
    });
    this.$el.html(renderedContent);
    return this;
  },  

  goSearch: function (event) {
    event.preventDefault();
    var formData = $('#searchbox').serializeJSON();
    var query_string = 'search/results/' + formData['q'];

    if(formData['filter']) {
      query_string = query_string + '/' + formData['filter'];
    }
    
    Backbone.history.navigate(query_string, {trigger: true});
  },

  submitClub: function (event) {
    event.preventDefault();
    var club = $('#new-club-form').serializeJSON();

    club = KR.clubs.create(club, { 
      success: function (club) {
        club.fetch();
        KR.activityStreams.create({
          url: "/#clubs/" + club.id,
          activity_verb: 'added',
          activity_object: 'a club:',
          club_name: club.get('club_name')   
        });
        Backbone.history.navigate('clubs/' + club.id, {trigger: true}); 
      }
    });
    $("#new-club-modal").modal('hide');
    $('body').removeClass('modal-open');
    $('.modal-backdrop').remove();
  },

  submitKid: function (event) {
    event.preventDefault();
    var kid = $('#new-kid-form').serializeJSON();
    kid.user_type_id = 1;

    kid = KR.kids.create(kid, { 
      success: function (kid) {
        kid.fetch();
        KR.activityStreams.create({
          url: "/#users/" + kid.id,
          activity_verb: 'added',
          activity_object: 'a kid: ' + kid.get('first_name')
        });
        Backbone.history.navigate('users/' + kid.id, {trigger: true}); 
      }
    });
    $("#new-kid-modal").modal('hide');
    $('body').removeClass('modal-open');
    $('.modal-backdrop').remove();
  },

  randomBook: function (event) {
    var bookId = Math.floor(Math.random() * 1000);
    Backbone.history.navigate('books/' + bookId, {trigger: true}); 
  }  
});