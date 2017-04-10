define([
    'core/js/models/itemsModel'
], function(ItemsModel) {

    var AccordionModel = ItemsModel.extend({

        defaults: function() {
            return _.extend({}, _.result(ItemsModel.prototype, "defaults"), {
                _shouldCollapseItems: true,
                _toggleSpeed: 200
            });
        },

        toggleActiveItems: function(itemIndex) {
            var activeItemsIndexes = this.getActiveItemsIndexes();

            if (activeItemsIndexes.length === 0) {
                this.setItemAtIndexAsActive(itemIndex);
            } else {
                if (this.get('_shouldCollapseItems')) {
                    if (activeItemsIndexes[0] === itemIndex) {
                        this.setItemAtIndexAsInactive(itemIndex);
                    } else {
                        this.setItemAtIndexAsInactive(activeItemsIndexes[0], false);
                        this.setItemAtIndexAsActive(itemIndex);
                    }
                } else {
                    if (_.indexOf(activeItemsIndexes, itemIndex) >= 0) {
                        this.setItemAtIndexAsInactive(itemIndex);
                    } else {
                        this.setItemAtIndexAsActive(itemIndex);
                    }
                }
            }
        }

    });

    return AccordionModel;

});
