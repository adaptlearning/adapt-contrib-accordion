import { describe, whereContent, whereFromPlugin, mutateContent, checkContent, updatePlugin } from 'adapt-migrations';

/**
 * Should we be adding changes to course aria attributes? - https://github.com/adaptlearning/adapt-contrib-accordion/commit/6dca48baf740d7117ab987378ce4270c8580395b
 */
describe('adapt-contrib-accordion - v1.0.0 > v2.0.0', async () => {
  let accordions;

  whereFromPlugin('adapt-contrib-accordion - from v1', { name: 'adapt-contrib-accordion', version: '<=2.0.0' });

  whereContent('adapt-contrib-accordion - where accordion', async content => {
    accordions = content.filter(({ _component }) => _component === 'accordion');
    if (accordions) return true;
  });

  mutateContent('adapt-contrib-accordion - add accordion._supportedLayout', async () => {
    accordions.forEach(accordion => {
      accordion._supportedLayout = 'half-width';
    });
    return true;
  });

  checkContent('adapt-contrib-accordion - check accordion._supportedLayout atrribute', async () => {
    const isValid = accordions.every(({ _supportedLayout }) => _supportedLayout !== undefined);
    if (!isValid) throw new Error('adapt-contrib-accordion - _supportedLayout not added to every instance of accordion');
    return true;
  });

  // Is another whereContent needed if it is the same as the first call?
  whereContent('adapt-contrib-accordion - where accordion', async content => {
    accordions = content.filter(({ _component }) => _component === 'accordion');
    if (accordions) return true;
  });

  mutateContent('adapt-contrib-accordion - add accordion.instruction', async () => {
    accordions.forEach(accordion => {
      accordion.instruction = '';
    });
    return true;
  });

  checkContent('adapt-contrib-accordion - check accordion.instruction atrribute', async () => {
    const isValid = accordions.every(({ instruction }) => instruction !== undefined);
    if (!isValid) throw new Error('adapt-contrib-accordion - instruction not added to every instance of accordion');
    return true;
  });

  // Is another whereContent needed if it is the same as the first call?
  whereContent('adapt-contrib-accordion - where accordion', async content => {
    accordions = content.filter(({ _component }) => _component === 'accordion');
    if (accordions) return true;
  });

  mutateContent('adapt-contrib-accordion - add accordion._items._graphic.alt attribute', async () => {
    accordions.forEach(accordion => {
      accordion._items.forEach(item => {
        item._graphic.alt = '';
      });
    });
    return true;
  });

  checkContent('adapt-contrib-accordion - check add accordion._items._graphic.alt atrribute', async () => {
    const isValid = accordions.every(accordion =>
      accordion._items.every(item =>
        item._graphic && item._graphic.alt !== undefined
      )
    );
    if (!isValid) throw new Error('adapt-contrib-accordion - _graphic.alt not added to every instance of accordion._items');
    return true;
  });

  // Is another whereContent needed if it is the same as the first call?
  whereContent('adapt-contrib-accordion - where accordion', async content => {
    accordions = content.filter(({ _component }) => _component === 'accordion');
    if (accordions) return true;
  });

  mutateContent('adapt-contrib-accordion - add accordion._items._graphic.src attribute', async () => {
    accordions.forEach(accordion => {
      accordion._items.forEach(item => {
        item._graphic.src = '';
      });
    });
    return true;
  });

  checkContent('adapt-contrib-accordion - check add accordion._items._graphic.src atrribute', async () => {
    const isValid = accordions.every(accordion =>
      accordion._items.every(item =>
        item._graphic && item._graphic.src !== undefined
      )
    );
    if (!isValid) throw new Error('adapt-contrib-accordion - _graphic.src not added to every instance of accordion._items');
    return true;
  });

  updatePlugin('adapt-contrib-accordion - update to v2.0.0', { name: 'adapt-contrib-accordion', version: '2.0.0', framework: '2.0.0' });
});

describe('adapt-contrib-accordion - v2.0.0 > v2.0.4', async () => {
  let accordions;

  whereFromPlugin('adapt-contrib-accordion - from v2.0.0', { name: 'adapt-contrib-accordion', version: '<=2.0.4' });

  whereContent('adapt-contrib-accordion - where accordion', async content => {
    accordions = content.filter(({ _component }) => _component === 'accordion');
    if (accordions) return true;
  });

  mutateContent('adapt-contrib-accordion - add accordion._classes', async () => {
    accordions.forEach(accordion => {
      accordion._classes = '';
    });
    return true;
  });

  checkContent('adapt-contrib-accordion - check accordion._classes atrribute', async () => {
    const isValid = accordions.every(({ _classes }) => _classes !== undefined);
    if (!isValid) throw new Error('adapt-contrib-accordion - _classes not added to every instance of accordion');
    return true;
  });

  updatePlugin('adapt-contrib-accordion - update to v2.0.4', { name: 'adapt-contrib-accordion', version: '2.0.4', framework: '>=2' });
});

describe('adapt-contrib-accordion - v2.0.4 > v2.0.5', async () => {
  let accordions;

  whereFromPlugin('adapt-contrib-accordion - from v2.0.4', { name: 'adapt-contrib-accordion', version: '<=2.0.5' });

  whereContent('adapt-contrib-accordion - where accordion', async content => {
    accordions = content.filter(({ _component }) => _component === 'accordion');
    if (accordions) return true;
  });

  mutateContent('adapt-contrib-accordion - add accordion._shouldCollapseItems', async () => {
    accordions.forEach(accordion => {
      accordion._shouldCollapseItems = false;
    });
    return true;
  });

  checkContent('adapt-contrib-accordion - check accordion._shouldCollapseItems atrribute', async () => {
    const isValid = accordions.every(({ _classes }) => _classes !== undefined);
    if (!isValid) throw new Error('adapt-contrib-accordion - _shouldCollapseItems not added to every instance of accordion');
    return true;
  });

  updatePlugin('adapt-contrib-accordion - update to v2.0.5', { name: 'adapt-contrib-accordion', version: '2.0.5', framework: '>=2' });
});
