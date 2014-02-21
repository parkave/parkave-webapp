define(['jquery', 'underscore', 'backbone', 'text!templates/application/main.html',
        'models/user', 'models/lot', 'collections/users', 'collections/lots',
        'views/landing/landing', 'views/landing/getstarted', 'views/landing/login',
        'views/lot/lot-list', 'views/lot/lot', 'views/user/userpage',
        'views/reviews/userFeedback', 'views/reviews/userReviews', 'views/user/settings'
        ], 
  function($, _, Backbone, Template, User, Lot, UsersCollection, LotsCollection, LandingView, GetStartedView, LoginView, 
          LotsListView, LotView, UserPageView, UserFeedbackView, UserReviewsView, AccountSettingsView) {

  var MainAppView = Backbone.View.extend({
    el: '#content',
    template: _.template( Template ),

    render: function() {
      this.$el.html( this.template() );
      return this;
    },

    showLanding: function() {
      var landingView = new LandingView();
      this.$el.html( landingView.render().el );
    },

    showGetStarted: function(email){
      var getStartedModel = new Backbone.Model( {email: email} );
      var getStartedView = new GetStartedView( {model: getStartedModel} );
      this.$el.html( getStartedView.render().el );
    },

    showLogin: function(){
      if(this.$el.find('.landing-view-div').length == 0){
        var landingView = new LandingView();
        this.$el.html( landingView.render().el );
      }

      var loginView = new LoginView();
      this.$el.append( loginView.render().el );
    },

    showLots: function() {
      var lots = new LotsCollection();
      var lotsView = new LotsListView({collection: lots})
      $('#content').html( lotsView.render().el );
      lots.fetch();
    },

    showLot: function(id) {
      var lot = new Lot({_id: id});
      var lots = new LotsCollection([lot]);
      
      var lotView = new LotView({model: lot});
      $('#content').html( lotView.el );
      lot.fetch();
    },

    showUserPage: function(uid){
      var user = new User( {_id: uid});
      var usersCollection = new UsersCollection([user]);

      var userPageView = new UserPageView( {model: user} );
      this.$el.html( userPageView.el );
      user.fetch();
    },

    showUserFeedback: function(uid){
      var userFeedbackView = new UserFeedbackView();
      this.$el.html(userFeedbackView.render().el);
    },

    showUserReviews:  function(uid){
      var userReviewsView = new UserReviewsView();
      this.$el.html(userReviewsView.render().el);
    },
    showAccountSettings: function(){
      var accountSettingsView = new AccountSettingsView();
      this.$el.html(accountSettingsView.render().el);
    }
  });

  MainAppView.sharedInstance = _.once(function() {
    return new MainAppView();
  });

  return MainAppView;
});