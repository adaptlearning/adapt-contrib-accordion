define(function(require) {
  var ComponentView = require('coreViews/componentView');
  var Adapt = require('coreJS/adapt');

  var Accordion = ComponentView.extend({

    postRender: function() {
      this.setReadyStatus();
      this.setCompletionStatus();
    },

    events: {
      'click .item .title' : 'toggleItem'
    },

    toggleItem: function (event) {
      event.preventDefault();
      this.$('.item .body').stop(true,true).slideUp();
      if (!$(event.currentTarget).hasClass('selected')) {
        this.$('.item .title').removeClass('selected');
        $(event.currentTarget).addClass('selected visited').siblings('.body').slideToggle();
        this.$('.icon').removeClass('minus').addClass('plus');
        $('.icon', event.currentTarget).removeClass('plus').addClass('minus');
      } else {
        this.$('.item .title').removeClass('selected');
        $(event.currentTarget).removeClass('selected');
        $('.icon', event.currentTarget).removeClass('minus').addClass('plus');
      }
      if (this.$('.item .visited').length==this.$('.item').length && this.model.get('complete')==false) {
        this.model.set('complete',true);
      }
    }

  });

  Adapt.register("accordion", Accordion);

});