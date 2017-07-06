define([ 'core/js/views/componentView' ], function(ComponentView) {

    var AccordionView = ComponentView.extend({

        queuedItems: 0,

        events: {
            'click .accordion-item-title': 'onClick'
        },

        preRender: function() {
            // Checks to see if the accordion should be reset on revisit
            this.checkIfResetOnRevisit();

            this.model.resetActiveItems();

            this.listenTo(this.model.get('_items'), {
                'change:_isActive': this.onItemsActiveChange,
                'change:_isVisited': this.onItemsVisitedChange
            });
        },

        postRender: function() {
            this.setUpItems();
        },

        checkIfResetOnRevisit: function() {
            var isResetOnRevisit = this.model.get('_isResetOnRevisit');

            // If reset is enabled set defaults
            if (isResetOnRevisit) {
                this.model.reset(isResetOnRevisit);
            }
        },

        setUpItems: function() {
            var items = this.model.get('_items');

            this.queuedItems = items ? items.length : 0;
            this.checkReadyStatus();

            if (!items) return;

            var $container = this.$('.accordion-widget');
            var template = Handlebars.templates.accordionItem;

            items.each(_.bind(function(item) {
                $container.append($(template(item.toJSON())));
                this.queuedItems--;
                this.checkReadyStatus();
            }, this));
        },

        checkReadyStatus: function() {
            if (!this.queuedItems) {
                this.setReadyStatus();
            }
        },

        onClick: function(event) {
            event.preventDefault();

            var $accordionItem = $(event.currentTarget).parent('.accordion-item');
            this.model.toggleItemsState($accordionItem.index());
        },

        onItemsActiveChange: function(item, isActive) {
            this.toggleItem(item, isActive);
        },

        onItemsVisitedChange: function(item, isVisited) {
            if (!isVisited) return;

            var $item = this.$('.accordion-item').eq(item.get('_index'));

            $item.children('.accordion-item-title').addClass('visited');
        },

        toggleItem: function(item, shouldExpand) {
            var $item = this.$('.accordion-item').eq(item.get('_index'));
            var $body = $item.children('.accordion-item-body').stop(true, true);

            $item.children('.accordion-item-title')
                .toggleClass('selected', shouldExpand)
                .attr('aria-expanded', shouldExpand);
            $item.find('.accordion-item-title-icon')
                .toggleClass('icon-plus', !shouldExpand)
                .toggleClass('icon-minus', shouldExpand);

            if (!shouldExpand) {
                $body.slideUp(this.model.get('_toggleSpeed'));
                return;
            }

            $body.slideDown(this.model.get('_toggleSpeed'), function() {
                $body.a11y_focus();
            });
        }

    });

    return AccordionView;

});
