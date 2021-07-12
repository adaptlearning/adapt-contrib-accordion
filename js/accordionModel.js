import ItemsComponentModel from 'core/js/models/itemsComponentModel';

class AccordionModel extends ItemsComponentModel {

  defaults() {
    return ItemsComponentModel.resultExtend('defaults', {
      _shouldCollapseItems: true,
      _shouldExpandFirstItem: false,
      _toggleSpeed: 200
    }, this);
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

  checkExpandFirstItem() {
    if (!this.get('_shouldExpandFirstItem')) return;
    this.setActiveItem(0);
  }

}

export default AccordionModel;
