import { describe, whereContent, whereFromPlugin, mutateContent, checkContent, updatePlugin } from 'adapt-migrations';

describe('adapt-contrib-accordion - v2.0.0 > v2.0.4', async () => {
  let accordions;

  whereFromPlugin('adapt-contrib-accordion - from v2.0.0', { name: 'adapt-contrib-accordion', version: '<=2.0.4' });

  whereContent('adapt-contrib-accordion - where accordion', async content => {
    accordions = content.filter(({ _component }) => _component === 'accordion');
    if (accordions.length > 0) return true;
  });

  /**
   * * Add field to each item in a JSON array and set blank.
   */
  mutateContent('adapt-contrib-accordion - add accordion._items._classes attribute', async () => {
    accordions.forEach(accordion => {
      accordion._items.forEach(item => {
        item._classes = '';
      });
    });
    return true;
  });

  checkContent('adapt-contrib-accordion - check accordion._items._classes attribute', async () => {
    const isValid = accordions.every(accordion =>
      accordion._items.every(item =>
        item && item._classes !== undefined
      )
    );
    if (!isValid) throw new Error('adapt-contrib-accordion - _classes not added to every instance of accordion._items');
    return true;
  });

  updatePlugin('adapt-contrib-accordion - update to v2.0.4', { name: 'adapt-contrib-accordion', version: '2.0.4', framework: '>=2.0.0' });
});

describe('adapt-contrib-accordion - v2.0.4 > v2.0.5', async () => {
  let accordions;

  whereFromPlugin('adapt-contrib-accordion - from v2.0.4', { name: 'adapt-contrib-accordion', version: '<2.0.5' });

  whereContent('adapt-contrib-accordion - where accordion', async content => {
    accordions = content.filter(({ _component }) => _component === 'accordion');
    if (accordions.length > 0) return true;
  });

  /**
   * * Add JSON field to component and set attribute.
   */
  mutateContent('adapt-contrib-accordion - add accordion._shouldCollapseItems attribute', async () => {
    accordions.forEach(accordion => {
      accordion._shouldCollapseItems = true;
    });
    return true;
  });

  checkContent('adapt-contrib-accordion - check accordion._shouldCollapseItems attribute', async () => {
    const isValid = accordions.every(({ _shouldCollapseItems }) => _shouldCollapseItems === true);
    if (!isValid) throw new Error('adapt-contrib-accordion - _shouldCollapseItems not added to every instance of accordion and set to true.');
    return true;
  });

  updatePlugin('adapt-contrib-accordion - update to v2.0.5', { name: 'adapt-contrib-accordion', version: '2.0.5', framework: '>=2.0.0' });
});

describe('adapt-contrib-accordion - v2.0.5 > v2.1.0', async () => {
  let accordions;

  whereFromPlugin('adapt-contrib-accordion - from v2.0.5', { name: 'adapt-contrib-accordion', version: '<2.1.0' });

  whereContent('adapt-contrib-accordion - where accordion', async content => {
    accordions = content.filter(({ _component }) => _component === 'accordion');
    if (accordions.length > 0) return true;
  });

  /**
   * * Add field to each item in a JSON array and set blank.
   */
  mutateContent('adapt-contrib-accordion - add accordion._items._graphic.attribution', async () => {
    accordions.forEach(accordion => {
      accordion._items.forEach(item => {
        item._graphic.attribution = '';
      });
    });
    return true;
  });

  checkContent('adapt-contrib-accordion - check accordion._items._graphic.attribution atrribute', async () => {
    const isValid = accordions.every(accordion =>
      accordion._items.every(item =>
        item._graphic && item._graphic.attribution !== undefined
      )
    );
    if (!isValid) throw new Error('adapt-contrib-accordion - _graphic.attribution not added to every instance of accordion._items');
    return true;
  });

  updatePlugin('adapt-contrib-accordion - update to v2.1.0', { name: 'adapt-contrib-accordion', version: '2.1.0', framework: '>=2.0.0' });
});
