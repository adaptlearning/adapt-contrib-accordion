import { describe, whereContent, whereFromPlugin, mutateContent, checkContent, updatePlugin, getCourse, getComponents, testStopWhere, testSuccessWhere } from 'adapt-migrations';
import _ from 'lodash';

describe('adapt-contrib-accordion - v2.1.0 > v4.0.0', async () => {
  let course, courseAccordionGlobals, accordions;
  const oldAriaRegion = 'This component requires you to answer the question by selecting the relevant value. After selecting a value select the submit button below.';
  const newAriaRegion = 'Accordion. Select each button to expand the content.';

  whereFromPlugin('adapt-contrib-accordion - from v2.1.0', { name: 'adapt-contrib-accordion', version: '<4.0.0' });

  whereContent('adapt-contrib-accordion - where accordion', async content => {
    accordions = getComponents('accordion');
    return accordions.length;
  });

  mutateContent('adapt-contrib-accordion - modify globals ariaRegion attribute', async (content) => {
    course = getCourse();
    if (!_.has(course, '_globals._components._accordion.ariaRegion')) {
      _.set(course, '_globals._components._accordion.ariaRegion', newAriaRegion);
    }
    courseAccordionGlobals = course._globals._components._accordion;
    if (courseAccordionGlobals.ariaRegion === oldAriaRegion) {
      courseAccordionGlobals.ariaRegion = newAriaRegion;
    }
    return true;
  });

  mutateContent('adapt-contrib-accordion - add accordion._setCompletionOn and set attribute', async () => {
    accordions.forEach(accordion => {
      accordion._setCompletionOn = 'allItems';
    });
    return true;
  });

  checkContent('adapt-contrib-accordion - modify globals ariaRegion attribute', async (content) => {
    const isValid = courseAccordionGlobals.ariaRegion !== oldAriaRegion;
    if (!isValid) throw new Error('Accordion globals ariaRegion attribute not modified.');
    return true;
  });

  checkContent('adapt-contrib-accordion - check accordion._setCompletionOn attribute', async () => {
    const isValid = accordions.every(({ _setCompletionOn }) => _setCompletionOn === 'allItems');
    if (!isValid) throw new Error('adapt-contrib-accordion - _setCompletionOn not added to every instance of accordion and set to "allItems"');
    return true;
  });

  updatePlugin('adapt-contrib-accordion - update to v4.0.0', { name: 'adapt-contrib-accordion', version: '4.0.0', framework: '>=3.3.0' });

  testSuccessWhere('correct version with accordion components and empty course', {
    fromPlugins: [{ name: 'adapt-contrib-accordion', version: '2.1.0' }],
    content: [
      { _id: 'c-100', _component: 'accordion', _items: [{ title: 'item 1' }] },
      { _id: 'c-105', _component: 'accordion', _items: [{ title: 'item 1' }] },
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
