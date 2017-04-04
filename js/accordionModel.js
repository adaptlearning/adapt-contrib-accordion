define([
    'core/js/models/itemsModel'
], function(ItemsModel) {

    var AccordionModel = ItemsModel.extend({

        defaults: function() {
            return _.extend({
                _shouldCollapseItems: true,
                _toggleSpeed: 200,
                _activeItems: []
            }, ItemsModel.prototype.defaults);
        },

        initialize: function() {
            if (this.get('_shouldCollapseItems') === false) {
                this.set('_activeItems', []);
            }

            _.each(this.get('_items'), function(item) {
                item._isActive = false;
            });

            ItemsModel.prototype.initialize.apply(this, arguments);
        },

        checkCompletionStatus: function() {
            if (this.getVisitedItems().length == this.get('_items').length) {
                this.setCompletionStatus();
            }
        },

        toggleActiveItems: function(itemIndex) {
            var activeItems = this.get('_activeItems');
            var index = _.indexOf(activeItems, itemIndex);

            if (this.get('_shouldCollapseItems')) {
                activeItems = (index >= 0) ? [] : [itemIndex];
            } else {
                // multiple active items possible
                if (index >= 0) {
                    // item is active remove it from the acite items list 
                    activeItems.splice(index, 1);
                } else {
                    // items is not active 
                    activeItems.push(itemIndex);
                }
            }

            this.set('_activeItems', activeItems, {silent: true});
            this.trigger('change:_activeItems', this, activeItems);
        },

        setItemState: function() {
            var items = this.get('_items');
            var activeItems = this.get('_activeItems');
            // make sure there is only one item open 
            if (this.get('_shouldCollapseItems'))
                activeItems = activeItems.slice(0,1);
            
            for (var i = 0; i < items.length; i++) {
                items[i]._isActive = (_.indexOf(activeItems, i) >= 0);
            }

            this.set('_items', items);
            this.trigger('change:_items', this, items);
        }


    });

    return AccordionModel;

});
