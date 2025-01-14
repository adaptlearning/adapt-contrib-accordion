import { describe, whereContent, whereFromPlugin, mutateContent, checkContent, updatePlugin } from 'adapt-migrations';

describe('adapt-contrib-accordion - v1.0.0 > v1.1.0', async () => {
  let accordions;

  whereFromPlugin('adapt-contrib-accordion - from v1', { name: 'adapt-contrib-accordion', version: '<=1.1' });

  whereContent('adapt-contrib-accordion - where accordion', async content => {
    accordions = content.filter(({ _component }) => _component === 'accordion');
    if (accordions) return true;
  });

  mutateContent('adapt-contrib-accordion - update accordion.items attribute with accordion._items', async () => {
    accordions.forEach(accordion => {
      if (accordion.items) {
        accordion.items = accordion._items;
      }
    });
    return true;
  });

  checkContent('adapt-contrib-accordion - check accordion._items atrribute', async () => {
    const isValid = accordions.every(({ items, _items }) => items === _items);
    if (!isValid) throw new Error('adapt-contrib-accordion - accordion.items not updated to accordion._items');
    return true;
  });

  updatePlugin('adapt-contrib-accordion - update to v1.1.0', { name: 'adapt-contrib-accordion', version: '1.1.0', framework: '1.1.0' });
});
