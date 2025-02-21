import { describe, whereContent, whereFromPlugin, mutateContent, checkContent, updatePlugin } from 'adapt-migrations';
import _ from 'lodash';

let course, courseAccordionGlobals, accordions;

describe('adapt-contrib-accordion - v2.1.0 > v4.0.0', async () => {

  const oldAriaRegion = 'This component requires you to answer the question by selecting the relevant value. After selecting a value select the submit button below.';

  whereFromPlugin('adapt-contrib-accordion - from v2.1.0', { name: 'adapt-contrib-accordion', version: '<4.0.0' });

  whereContent('adapt-contrib-accordion - where accordion', async content => {
    accordions = content.filter(({ _component }) => _component === 'accordion');
    return accordions.length;
  });

  mutateContent('adapt-contrib-accordion - modify globals ariaRegion attribute', async (content) => {
    course = content.find(({ _type }) => _type === 'course');
    if (!_.has(course, '_globals._components._accordion')) _.set(course, '_globals._components._accordion', {});
    courseAccordionGlobals = course._globals._components._accordion;

    if (courseAccordionGlobals) {
      if (courseAccordionGlobals.ariaRegion === oldAriaRegion) {
        courseAccordionGlobals.ariaRegion = 'Accordion. Select each button to expand the content.';
      }
    }
    return true;
  });

  checkContent('adapt-contrib-accordion - modify globals ariaRegion attribute', async (content) => {
    const isValid = courseAccordionGlobals.ariaRegion !== oldAriaRegion;
    if (!isValid) throw new Error('Accordion globals ariaRegion attribute not modified.');
    return true;
  });

  mutateContent('adapt-contrib-accordion - add accordion._setCompletionOn and set attribute', async () => {
    accordions.forEach(accordion => {
      accordion._setCompletionOn = 'allItems';
    });
  });

  checkContent('adapt-contrib-accordion - check accordion._setCompletionOn attribute', async () => {
    const isValid = accordions.every(({ _setCompletionOn }) => _setCompletionOn === 'allItems');
    if (!isValid) throw new Error('adapt-contrib-accordion - _setCompletionOn not added to every instance of accordion and set to "allItems"');
    return true;
  });

  updatePlugin('adapt-contrib-accordion - update to v4.0.0', { name: 'adapt-contrib-accordion', version: '4.0.0', framework: '>=3.3.0' });
});
