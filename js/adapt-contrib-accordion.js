define(function(require) {

    var ComponentView = require('coreViews/componentView');
    var Adapt = require('coreJS/adapt');

    var Accordion = ComponentView.extend({

        events: {
            'click .accordion-item-title': 'toggleItem'
        },

        preRender: function() {
            // Checks to see if the accordion should be reset on revisit
            this.checkIfResetOnRevisit();
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

                _.each(this.model.get('_items'), function(item) {
                    item._isVisited = false;
                });
            }
        },

        toggleItem: function(event) {
            event.preventDefault();

            var toggleButton = $(event.currentTarget);
            var accordionItem = toggleButton.parent('.accordion-item');
            var isCurrentlyExpanded = toggleButton.hasClass('selected');

            if (!this.model.get('_persistExpansion')) {
                // Close and reset all Accordion items
                var allAccordionItems = this.$('.accordion-item');
                for (var i = 0; i < allAccordionItems.length; i++) {
                    this.closeItem($(allAccordionItems[i]));
                }
            } else {
                // Close and reset the selected Accordion item
                this.closeItem(accordionItem);
            }

            if (!isCurrentlyExpanded) {
                this.openItem(accordionItem);
            }
        },

        closeItem: function(itemEl) {
            if (!itemEl) {
                return false;
            }

            $(itemEl).find('.accordion-item-body').first().stop(true, true).slideUp(this.toggleSpeed);
            $(itemEl).find('button').first().removeClass('selected');
            $(itemEl).find('button').first().attr('aria-expanded', false);
            $(itemEl).find('.accordion-item-title-icon').first().removeClass('icon-plus');
            $(itemEl).find('.accordion-item-title-icon').first().addClass('icon-minus');
        },

        openItem: function(itemEl) {
            if (!itemEl) {
                return false;
            }

            var body = $(itemEl).find('.accordion-item-body').first().stop(true, true).slideDown(this.toggleSpeed, function() {
                body.a11y_focus();
            });

            $(itemEl).find('button').first().addClass('selected');
            $(itemEl).find('button').first().attr('aria-expanded', true);
            $(itemEl).find('.accordion-item-title-icon').first().addClass('icon-plus');
            $(itemEl).find('.accordion-item-title-icon').first().removeClass('icon-minus');

            this.setVisited(itemEl.index());
            $(itemEl).find('button').first().addClass('visited');
        },

        setVisited: function(index) {
            var item = this.model.get('_items')[index];
            item._isVisited = true;
            this.checkCompletionStatus();
        },

        getVisitedItems: function() {
            return _.filter(this.model.get('_items'), function(item) {
                return item._isVisited;
            });
        },

        checkCompletionStatus: function() {
            if (this.getVisitedItems().length == this.model.get('_items').length) {
                this.setCompletionStatus();
            }
        }

    });

    Adapt.register('accordion', Accordion);

    return Accordion;

});
