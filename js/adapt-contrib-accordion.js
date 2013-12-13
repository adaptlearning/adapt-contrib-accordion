define(function(require) {
  var ComponentView = require('coreViews/componentView');
  var Adapt = require('coreJS/adapt');

  var Accordion = ComponentView.extend({

    postRender: function() {
      this.setReadyStatus();
    },

    events: {
      'click .accordion-item-title' : 'toggleItem'
    },

    toggleItem: function (event) {
      event.preventDefault();
      this.$('.accordion-item-body').stop(true,true).slideUp();
      if (!$(event.currentTarget).hasClass('selected')) {
        this.$('.accordion-item-title').removeClass('selected');
        $(event.currentTarget).addClass('selected visited').siblings('.accordion-item-body').slideToggle();
        this.$('.accordion-item-title-icon').removeClass('icon-minus').addClass('icon-plus');
        $('.accordion-item-title-icon', event.currentTarget).removeClass('icon-plus').addClass('icon-minus');
      } else {
        this.$('.accordion-item-title').removeClass('selected');
        $(event.currentTarget).removeClass('selected');
        $('.accordion-item-title-icon', event.currentTarget).removeClass('icon-minus').addClass('icon-plus');
      }
      if (this.$('.accordion-item-title.visited').length==this.$('.accordion-item-title').length && this.model.get('_isComplete')==false) {
        this.setCompletionStatus();
      }
    }

  });

  Adapt.register("accordion", Accordion);

});
