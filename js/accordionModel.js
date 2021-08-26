import ItemsComponentModel from 'core/js/models/itemsComponentModel';

export default class AccordionModel extends ItemsComponentModel {

  defaults() {
    return ItemsComponentModel.resultExtend('defaults', {
      _shouldCollapseItems: true,
      _shouldExpandFirstItem: false,
      _toggleSpeed: 200
    });
  }

  checkIfResetOnRevisit() {
    this.resetActiveItems();
    super.checkIfResetOnRevisit();
    this.checkExpandFirstItem();
  }

  toggleItemsState(index) {
    const item = this.getItem(index);
    const previousActiveItem = this.getActiveItem();

    item.toggleActive();
    item.toggleVisited(true);

    if (!previousActiveItem || !this.get('_shouldCollapseItems')) return;
    previousActiveItem.toggleActive(false);
  }

  checkExpandFirstItem() {
    if (!this.get('_shouldExpandFirstItem')) return;
    this.toggleItemsState(0);
  }

}
