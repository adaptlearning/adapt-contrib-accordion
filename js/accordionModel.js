define([
    'core/js/models/itemsModel'
], function(ItemsModel) {

    var AccordionModel = ItemsModel.extend({

        defaults: function() {
            return _.extend({
                _shouldCollapseItems: true,
                _toggleSpeed: 200
            }, ItemsModel.prototype.defaults);
        },

        initialize: function() {
            this.resetActiveItems(false);

            ItemsModel.prototype.initialize.apply(this, arguments);
        },

        toggleActiveItems: function(itemIndex) {
            var activeItemsIndexes = this.getActiveItemsIndexes();

            if (activeItemsIndexes.length === 0) {
                this.setItemAtIndexAsActive(itemIndex, false);
            } else {
                if (this.get('_shouldCollapseItems')) {
                    if (activeItemsIndexes[0] === itemIndex) {
                        this.setItemAtIndexAsInactive(itemIndex, false);
                    } else {
                        this.setItemAtIndexAsActive(itemIndex, false);
                        this.setItemAtIndexAsInactive(activeItemsIndexes[0], false);
                    }
                } else {
                    if (_.indexOf(activeItemsIndexes, itemIndex) >= 0) {
                        this.setItemAtIndexAsInactive(itemIndex, false);
                    } else {
                        this.setItemAtIndexAsActive(itemIndex, false);
                    }
                }
            }

            this.trigger('change:_items:_isActive', this, this.get('_items'));
        }

    });

    return AccordionModel;

});
