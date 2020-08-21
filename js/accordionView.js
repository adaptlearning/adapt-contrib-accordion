import ComponentView from 'core/js/views/componentView';

class AccordionView extends ComponentView {

  preRender() {
    this.checkIfResetOnRevisit();
    this.model.resetActiveItems();
    this.listenTo(this.model.getChildren(), {
      'change:_isActive': this.onItemsActiveChange,
      'change:_isVisited': this.onItemsVisitedChange,
      'all': this.changed
    });
  }

  postRender() {
    this.setReadyStatus();
    if (this.model.get('_setCompletionOn') !== 'inview') return;
    this.setupInviewCompletion();
  }

  checkIfResetOnRevisit() {
    const isResetOnRevisit = this.model.get('_isResetOnRevisit');
    // If reset is enabled set defaults
    if (!isResetOnRevisit) return;
    this.model.reset(isResetOnRevisit);
  }

  onClick(event) {
    this.model.toggleItemsState($(event.currentTarget).parent().data('index'));
  }

  onItemsActiveChange(item, isActive) {
    this.toggleItem(item, isActive);
  }

  toggleItem(item, shouldExpand) {
    const $item = this.getItemElement(item);
    const $body = $item.children('.accordion__item-content').stop(true, true);
    if (!shouldExpand) {
      $body.slideUp(this.model.get('_toggleSpeed'));
      return;
    }
    $body.slideDown(this.model.get('_toggleSpeed'));
  }

  getItemElement(item) {
    const index = item.get('_index');
    return this.$('.accordion__item').filter(`[data-index="${index}"]`);
  }

}

AccordionView.template = 'accordion.jsx';

export default AccordionView;
