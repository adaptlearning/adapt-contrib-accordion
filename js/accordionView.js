define([
    'core/js/adapt',
    'core/js/views/componentView',
], function(Adapt, ComponentView) {

    var AccordionView = ComponentView.extend({

        events: {
            'click .accordion-item-title': 'toggleItem'
        },

        preRender: function() {
            // Checks to see if the accordion should be reset on revisit
            this.checkIfResetOnRevisit();
            this.listenTo(this.model, 'change:_activeItems', this.onActiveItemChanged);
            this.listenTo(this.model, 'change:_items', this.onItemsChanged);
        },

        postRender: function() {
            this.setReadyStatus();
        },

        // Used to check if the accordion should reset on revisit
        checkIfResetOnRevisit: function() {
            var isResetOnRevisit = this.model.get('_isResetOnRevisit');

            // If reset is enabled set defaults
            if (isResetOnRevisit) {
                this.model.reset(isResetOnRevisit);
                this.model.resetItems();
            }
        },

        toggleItem: function(event) {
            event.preventDefault();

            var $accordionItem = $(event.currentTarget).parent('.accordion-item');
            var itemIndex = $accordionItem.index();
            this.model.toggleActiveItems(parseInt(itemIndex));
        },

        onActiveItemChanged: function(model, activeItems, options) {
            this.model.setItemState(activeItems);
        },

        onItemsChanged: function(model, items, options) {
            var $accordionItems = this.$('.accordion-item');
            for (var i = 0; i < items.length; i++) {                
                if (items[i]._isActive) {
                    this.openItem($accordionItems[i], i);
                } else {
                    this.closeItem($accordionItems[i]);
                }
            }
        },

        closeItem: function(itemEl) {
            if (!itemEl) return false;

            var $body = $('.accordion-item-body', itemEl).first();
            var $button = $('button', itemEl).first();
            var $icon = $('.accordion-item-title-icon', itemEl).first();

            $body.stop(true, true).slideUp(this.model.get('_toggleSpeed'));
            $button.removeClass('selected');
            $button.attr('aria-expanded', false);
            $icon.addClass('icon-plus');
            $icon.removeClass('icon-minus');
        },

        openItem: function(itemEl, itemIndex) {
            if (!itemEl) return false;

            var $body = $('.accordion-item-body', itemEl).first();
            var $button = $('button', itemEl).first();
            var $icon = $('.accordion-item-title-icon', itemEl).first();

            $body = $body.stop(true, true).slideDown(this.model.get('_toggleSpeed'), function() {
                $body.a11y_focus();
            });

            $button.addClass('selected');
            $button.attr('aria-expanded', true);

            this.model.setItemAsVisited(itemIndex);
            this.model.checkCompletionStatus();
            $button.addClass('visited');

            $icon.removeClass('icon-plus');
            $icon.addClass('icon-minus');
        }

    });

    return AccordionView;

});
