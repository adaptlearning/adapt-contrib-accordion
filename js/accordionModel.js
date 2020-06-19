define([
  'core/js/models/itemsComponentModel'
], function(ItemsComponentModel) {

  class AccordionModel extends ItemsComponentModel {

    defaults() {
      return _.extend({}, _.result(ItemsComponentModel.prototype, 'defaults'), {
        _shouldCollapseItems: true,
        _toggleSpeed: 200
      });
    }

    toggleItemsState(index) {
      const item = this.getItem(index);
      const previousActiveItem = this.getActiveItem();

      item.toggleActive();
      item.toggleVisited(true);

      if (previousActiveItem && this.get('_shouldCollapseItems')) {
        previousActiveItem.toggleActive(false);
      }
    }

  }

  return AccordionModel;

});
