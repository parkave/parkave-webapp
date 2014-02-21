
define(['jquery', 'underscore', 'backbone', 'text!templates/lot/lot.html',
  'routing/router', 'collections/lots'],
  function($, _, Backbone, Template, Router, LotsCollection) {


  var LotView = Backbone.View.extend({
    tagName: 'div',
    className: 'lot',
    template: _.template( Template ),

    events: {
      'click a[href="#delete"]': 'deleteLot',
      'click a[href="#lots"]': 'returnToLots',
      'click a[href="#create-spot"]': 'createLot'
    },

    initialize: function() {
      this.listenTo(this.model, 'change', this.render);
      this.listenTo(this.model, 'destroy', this.remove);
    },

    render: function() {
      this.$el.html( this.template( this.model.toJSON() ) );
      return this; 
    },

    returnToLots: function() {
      var lots = new LotsCollection();
      Router.sharedInstance().navigate(lots.clienturl(), {trigger: true});
      return false;
    },

    deleteLot: function() {
      this.model.destroy({wait: true})
        .done(function(data) {
          { // pop back to lots. this is annoying
            var lots = new LotsCollection();
            Router.sharedInstance().navigate(lots.clienturl(), {trigger: true});
          }
        })
        .fail(function(xhr, data) {
          console.log('there was a problem deleting the model');
        });
      return false;
    },

    createLot: function() {
      return false;
    }
  });

  return LotView;
});