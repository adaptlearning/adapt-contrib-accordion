import { describe, whereContent, whereFromPlugin, mutateContent, checkContent, updatePlugin, getCourse, getComponents, testStopWhere, testSuccessWhere } from 'adapt-migrations';
import _ from 'lodash';

describe('adapt-contrib-accordion - v4.0.0 > v5.0.0', async () => {
  let course, courseAccordionGlobals, accordions;
  const originalAriaRegion = 'Accordion. Select each button to expand the content.';
  const newAriaRegion = 'List of expandable sections. Select each button to expand the content.';
  const supportedLayouts = [
    'full-width',
    'half-width',
    'both'
  ];

  whereFromPlugin('adapt-contrib-accordion - from v4.0.0', { name: 'adapt-contrib-accordion', version: '<5.0.0' });

  whereContent('adapt-contrib-accordion - where accordion', async content => {
    accordions = getComponents('accordion');
    return accordions.length;
  });

  mutateContent('adapt-contrib-accordion - modify globals ariaRegion attribute', async (content) => {
    course = getCourse();
    if (!_.has(course, '_globals._components._accordion.ariaRegion')) {
      _.set(course, '_globals._components._accordion.ariaRegion', newAriaRegion);
    };
    courseAccordionGlobals = course._globals._components._accordion;
    if (courseAccordionGlobals.ariaRegion === originalAriaRegion) {
      courseAccordionGlobals.ariaRegion = newAriaRegion;
    }
    return true;
  });

  mutateContent('adapt-contrib-accordion - update accordion._supportedLayout attribute to full-width if current isn\'t a supported value.', async () => {
    accordions.forEach(accordion => {
      if (supportedLayouts.includes(accordion._supportedLayout)) return;
      accordion._supportedLayout = 'full-width';
    });
    return true;
  });

  checkContent('adapt-contrib-accordion - modify globals ariaRegion attribute', async (content) => {
    const isValid = courseAccordionGlobals.ariaRegion !== originalAriaRegion;
    if (!isValid) throw new Error('adapt-contrib-accordion - globals ariaRegion attribute not modified.');
    return true;
  });

  checkContent('adapt-contrib-accordion - check accordion._supportedLayout attribute is now full-width', async () => {
    const isValid = accordions.every(({ _supportedLayout }) => supportedLayouts.includes(_supportedLayout));
    if (!isValid) throw new Error('adapt-contrib-accordion - _supportedLayout attribute has not been modified to a supported value.');
    return true;
  });

  updatePlugin('adapt-contrib-accordion - update to v5.0.0', { name: 'adapt-contrib-accordion', version: '5.0.0', framework: '>=5.0.0' });

  testSuccessWhere('correct version with accordion components and empty course', {
    fromPlugins: [{ name: 'adapt-contrib-accordion', version: '2.1.0' }],
    content: [
      { _id: 'c-100', _component: 'accordion', _supportedLayout: 'incorrect _supportedLayout', _items: [{ title: 'item 1' }] },
      { _id: 'c-105', _component: 'accordion', _supportedLayout: 'full-width', _items: [{ title: 'item 1' }] },
      { _id: 'c-110', _component: 'accordion' },
      { _type: 'course' }
    ]
  });

  testSuccessWhere('correct version with accordion components and empty globals', {
    fromPlugins: [{ name: 'adapt-contrib-accordion', version: '2.1.0' }],
    content: [
      { _id: 'c-100', _component: 'accordion', _items: [{ title: 'item 1' }] },
      { _id: 'c-105', _component: 'accordion', _items: [{ title: 'item 1' }] },
      { _type: 'course', _globals: { _components: { _accordion: {} } } }
    ]
  });

  testSuccessWhere('correct version with accordion components and custom course globals', {
    fromPlugins: [{ name: 'adapt-contrib-accordion', version: '2.1.0' }],
    content: [
      { _id: 'c-100', _component: 'accordion', _items: [{ title: 'item 1' }] },
      { _id: 'c-105', _component: 'accordion', _items: [{ title: 'item 1' }] },
      { _type: 'course', _globals: { _components: { _accordion: { ariaRegion: 'custom aria region' } } } }
    ]
  });

  testStopWhere('no accordion components', {
    fromPlugins: [{ name: 'adapt-contrib-accordion', version: '2.1.0' }],
    content: [{ _component: 'other' }]
  });

  testStopWhere('incorrect version', {
    fromPlugins: [{ name: 'adapt-contrib-accordion', version: '4.0.0' }]
  });
});

describe('adapt-contrib-accordion - v5.0.0 > v5.3.0', async () => {
  let accordions;

  whereFromPlugin('adapt-contrib-accordion - from v5.0.0', { name: 'adapt-contrib-accordion', version: '<5.3.0' });

  whereContent('adapt-contrib-accordion - where accordion', async content => {
    accordions = getComponents('accordion');
    return accordions.length;
  });

  mutateContent('adapt-contrib-accordion - add accordion._shouldExpandFirstItem', async () => {
    accordions.forEach(accordion => {
      accordion._shouldExpandFirstItem = false;
    });
    return true;
  });

  checkContent('adapt-contrib-accordion - check accordion._shouldExpandFirstItem atrribute', async () => {
    const isValid = accordions.every(({ _shouldExpandFirstItem }) => _shouldExpandFirstItem === false);
    if (!isValid) throw new Error('adapt-contrib-accordion - _shouldExpandFirstItem not added to every instance of accordion');
    return true;
  });

  updatePlugin('adapt-contrib-accordion - update to v5.3.0', { name: 'adapt-contrib-accordion', version: '5.3.0', framework: '>=5.8.0' });

  testSuccessWhere('correct version with accordion components and empty course', {
    fromPlugins: [{ name: 'adapt-contrib-accordion', version: '5.0.0' }],
    content: [
      { _id: 'c-100', _component: 'accordion', _items: [{ title: 'item 1' }] },
      { _id: 'c-105', _component: 'accordion', _items: [{ title: 'item 1' }] },
      { _id: 'c-110', _component: 'accordion' }
    ]
  });

  testStopWhere('no accordion components', {
    fromPlugins: [{ name: 'adapt-contrib-accordion', version: '5.0.0' }],
    content: [{ _component: 'other' }]
  });

  testStopWhere('incorrect version', {
    fromPlugins: [{ name: 'adapt-contrib-accordion', version: '5.3.0' }]
  });
});
