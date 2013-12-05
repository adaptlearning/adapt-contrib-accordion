define(function(require) {
  var ComponentView = require('coreViews/componentView');
  var Adapt = require('coreJS/adapt');

  var Accordion = ComponentView.extend({

    postRender: function() {
      this.setReadyStatus();
      this.setCompletionStatus();
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
        this.$('.accordion-item-icon').removeClass('minus').addClass('plus');
        $('.accordion-item-icon', event.currentTarget).removeClass('plus').addClass('minus');
      } else {
        this.$('.accordion-item-title').removeClass('selected');
        $(event.currentTarget).removeClass('selected');
        $('.accordion-item-icon', event.currentTarget).removeClass('minus').addClass('plus');
      }
      if (this.$('.accordion-item .visited').length==this.$('.accordion-item').length && this.model.get('complete')==false) {
        this.model.set('complete',true);
      }
    }

  });

  Adapt.register("accordion", Accordion);

});