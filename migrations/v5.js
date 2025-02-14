import { describe, whereContent, whereFromPlugin, mutateContent, checkContent, updatePlugin } from 'adapt-migrations';
import _ from 'lodash';

let course, courseAccordionGlobals, accordions;

describe('adapt-contrib-accordion - v4.0.0 > v5.0.0', async () => {

  whereFromPlugin('adapt-contrib-accordion - from v4.0.0', { name: 'adapt-contrib-accordion', version: '<5.0.0' });

  whereContent('adapt-contrib-accordion - where accordion', async content => {
    accordions = content.filter(({ _component }) => _component === 'accordion');
    return accordions.length;
  });

  mutateContent('adapt-contrib-accordion - modify globals ariaRegion attribute', async (content) => {
    course = content.find(({ _type }) => _type === 'course');
    if (!_.has(course, '_globals._components._accordion')) _.set(course, '_globals._components._accordion', {});
    courseAccordionGlobals = course._globals._components._accordion;

    if (courseAccordionGlobals) {
      if (courseAccordionGlobals.ariaRegion === 'Accordion. Select each button to expand the content.') {
        courseAccordionGlobals.ariaRegion = 'List of expandable sections. Select each button to expand the content.';
      }
    }
    return true;
  });

  checkContent('adapt-contrib-accordion - modify globals ariaRegion attribute', async (content) => {
    const isValid = courseAccordionGlobals.ariaRegion === 'List of expandable sections. Select each button to expand the content.';
    if (!isValid) throw new Error('adapt-contrib-accordion - globals ariaRegion attribute not modified.');
    return true;
  });

  mutateContent('adapt-contrib-accordion - update accordion._supportedLayout attribute to full-width if current isn\'t a supported value.', async () => {
    accordions.forEach(accordion => {
      if (accordion._supportedLayout !== 'full-width' || accordion._supportedLayout !== 'half-width' || accordion._supportedLayout !== 'both') {
        accordion._supportedLayout = 'full-width';
      }
    });
    return true;
  });

  checkContent('adapt-contrib-accordion - check accordion._supportedLayout attribute is now full-width', async () => {
    const isValid = accordions.every(({ _supportedLayout }) => _supportedLayout === 'full-width' || _supportedLayout === 'half-width' || _supportedLayout === 'both');
    if (!isValid) throw new Error('adapt-contrib-accordion - _supportedLayout attribute has not been modified to a supported value.');
    return true;
  });

  updatePlugin('adapt-contrib-accordion - update to v5.0.0', { name: 'adapt-contrib-accordion', version: '5.0.0', framework: '>=5.0.0' });
});

describe('adapt-contrib-accordion - v5.0.0 > v5.3.0', async () => {
  let accordions;

  whereFromPlugin('adapt-contrib-accordion - from v5.0.0', { name: 'adapt-contrib-accordion', version: '<5.3.0' });

  whereContent('adapt-contrib-accordion - where accordion', async content => {
    accordions = content.filter(({ _component }) => _component === 'accordion');
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
});
