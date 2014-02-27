
define(['jquery', 'underscore', 'backbone', 'text!templates/spot/listitem.html',
  'routing/router'],
  function($, _, Backbone, Template, Router) {

  var SpotListItemView = Backbone.View.extend({
    tagName: 'div',
    className: 'spot',
    template: _.template( Template ),

    events: {
      'click a[href="#delete"]': 'deleteSpot',
      'click a[href="#view"]': 'viewSpot'
    },

    initialize: function() {
      this.listenTo(this.model, 'change', this.render);
      this.listenTo(this.model, 'destroy', this.remove);
    },

    render: function() {
      this.$el.html( this.template( this.model.toJSON() ) );
      return this; 
    },

    deleteSpot: function() {
      this.model.destroy({wait: true})
        .done(function(data) {
          // good to go
        })
        .fail(function(xhr, data) {
          console.log('there was a problem deleting the model');
        });
      return false; 
    },

    viewSpot: function() {
      Router.sharedInstance().navigate(this.model.clienturl(), {trigger: true});
      return false;
    }
  });

  return SpotListItemView;

});