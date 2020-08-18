import ItemsComponentModel from 'core/js/models/itemsComponentModel';

export default class AccordionModel extends ItemsComponentModel {

  defaults() {
    return ItemsComponentModel.resultExtend('defaults', {
      _shouldCollapseItems: true,
      _toggleSpeed: 200
    });
  }

  toggleItemsState(index) {
    const item = this.getItem(index);
    const previousActiveItem = this.getActiveItem();

    item.toggleActive();
    item.toggleVisited(true);

    if (!previousActiveItem || !this.get('_shouldCollapseItems')) return;
    previousActiveItem.toggleActive(false);
  }

}
