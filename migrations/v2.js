import { describe, whereContent, whereFromPlugin, mutateContent, checkContent, updatePlugin } from 'adapt-migrations';

describe('adapt-contrib-accordion - v1.0.0 > v2.0.0', async () => {
  let course, courseAccordionGlobals, accordions;

  whereFromPlugin('adapt-contrib-accordion - from v1', { name: 'adapt-contrib-accordion', version: '<=2.0.0' });

  whereContent('adapt-contrib-accordion - where accordion', async content => {
    accordions = content.filter(({ _component }) => _component === 'accordion');
    if (accordions.length) return true
  });

  /**
   * * Add JSON field to component and set attribute.
   */
  mutateContent('adapt-contrib-accordion - add accordion._supportedLayout', async () => {
    accordions.forEach(accordion => {
      accordion._supportedLayout = 'half-width';
    });
    return true;
  });

  checkContent('adapt-contrib-accordion - check accordion._supportedLayout attribute', async () => {
    const isValid = accordions.every(({ _supportedLayout }) => _supportedLayout !== undefined);
    if (!isValid) throw new Error('adapt-contrib-accordion - _supportedLayout not added to every instance of accordion');
    return true;
  });

  /**
   * * Add JSON field to component and set blank.
   */
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

  /**
   * * Add field to each item in a JSON array and set blank.
   */
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

  /**
   * * Add field to each item in a JSON array and set blank.
   */
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

  /**
    * * Add a new field to course globals.
    */
  mutateContent('adapt-contrib-accordion - add globals ariaRegion attribute', async (content) => {
    course = content.find(({ _type }) => _type === 'course');
    courseAccordionGlobals = course._globals._components._accordion ?? {};
    courseAccordionGlobals.ariaRegion = 'This component is an accordion comprised of collapsible content panels containing display text. Select the item titles to toggle the visibility of these content panels.';
    return true;
  });

  checkContent('adapt-contrib-accordion - check globals ariaRegion attribute', async () => {
    const isValid = courseAccordionGlobals.ariaRegion === 'This component is an accordion comprised of collapsible content panels containing display text. Select the item titles to toggle the visibility of these content panels.';
    if (!isValid) throw new Error('Accordion globals ariaRegion attribute not added.');
    return true;
  });

  updatePlugin('adapt-contrib-accordion - update to v2.0.0', { name: 'adapt-contrib-accordion', version: '2.0.0', framework: '>=2' });
});

describe('adapt-contrib-accordion - v2.0.0 > v2.0.4', async () => {
  let accordions;

  whereFromPlugin('adapt-contrib-accordion - from v2.0.0', { name: 'adapt-contrib-accordion', version: '<=2.0.4' });

  whereContent('adapt-contrib-accordion - where accordion', async content => {
    accordions = content.filter(({ _component }) => _component === 'accordion');
    if (accordions) return true;
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

  updatePlugin('adapt-contrib-accordion - update to v2.0.4', { name: 'adapt-contrib-accordion', version: '2.0.4', framework: '>=2' });
});

describe('adapt-contrib-accordion - v2.0.4 > v2.0.5', async () => {
  let accordions;

  whereFromPlugin('adapt-contrib-accordion - from v2.0.4', { name: 'adapt-contrib-accordion', version: '<2.0.5' });

  whereContent('adapt-contrib-accordion - where accordion', async content => {
    accordions = content.filter(({ _component }) => _component === 'accordion');
    if (accordions) return true;
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

  updatePlugin('adapt-contrib-accordion - update to v2.0.5', { name: 'adapt-contrib-accordion', version: '2.0.5', framework: '>=2' });
});

describe('adapt-contrib-accordion - v2.0.5 > v2.1.0', async () => {
  let accordions;

  whereFromPlugin('adapt-contrib-accordion - from v2.0.5', { name: 'adapt-contrib-accordion', version: '<2.1.0' });

  whereContent('adapt-contrib-accordion - where accordion', async content => {
    accordions = content.filter(({ _component }) => _component === 'accordion');
    if (accordions.length) return true
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

  updatePlugin('adapt-contrib-accordion - update to v2.1.0', { name: 'adapt-contrib-accordion', version: '2.1.0', framework: '>=2' });
});
