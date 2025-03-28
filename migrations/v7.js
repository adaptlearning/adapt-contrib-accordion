import { describe, whereContent, whereFromPlugin, mutateContent, checkContent, updatePlugin, getComponents, testStopWhere, testSuccessWhere } from 'adapt-migrations';
import _ from 'lodash';

describe('adapt-contrib-accordion - v5.3.0 > v7.3.0', async () => {
  let accordions;

  whereFromPlugin('adapt-contrib-accordion - from v5.3.0', { name: 'adapt-contrib-accordion', version: '<7.3.0' });

  whereContent('adapt-contrib-accordion - where accordion', async content => {
    accordions = getComponents('accordion');
    return accordions.length;
  });

  mutateContent('adapt-contrib-accordion - add accordion._items._imageAlignment', async () => {
    accordions.forEach(accordion => {
      accordion._items?.forEach(item => {
        item._imageAlignment = 'full';
      });
    });
    return true;
  });

  checkContent('adapt-contrib-accordion - check accordion._items._imageAlignment atrribute', async () => {
    const isValid = accordions.every(accordion =>
      accordion._items?.every(item => item?._imageAlignment === 'full')
    );
    if (!isValid) throw new Error('adapt-contrib-accordion - _imageAlignment not added to every instance of accordion._items');
    return true;
  });

  updatePlugin('adapt-contrib-accordion - update to v7.3.0', { name: 'adapt-contrib-accordion', version: '7.3.0', framework: '>=5.20.1' });

  testSuccessWhere('correct version with accordion components', {
    fromPlugins: [{ name: 'adapt-contrib-accordion', version: '5.3.0' }],
    content: [
      { _id: 'c-100', _component: 'accordion', _items: [{ title: 'item 1' }] },
      { _id: 'c-105', _component: 'accordion', _items: [{ title: 'item 1' }] },
      { _id: 'c-110', _component: 'accordion' }
    ]
  });

  testStopWhere('no accordion components', {
    fromPlugins: [{ name: 'adapt-contrib-accordion', version: '5.3.0' }],
    content: [{ _component: 'other' }]
  });

  testStopWhere('incorrect version', {
    fromPlugins: [{ name: 'adapt-contrib-accordion', version: '7.0.0' }]
  });
});

describe('adapt-contrib-accordion - v7.3.0 > v7.4.0', async () => {
  let accordions;
  const originalMobileInstruction = 'Select the headings below to reveal the text.';

  whereFromPlugin('adapt-contrib-accordion - from v7.3.0', { name: 'adapt-contrib-accordion', version: '<7.4.0' });

  whereContent('adapt-contrib-accordion - where accordion', async content => {
    accordions = getComponents('accordion');
    return accordions.length;
  });

  mutateContent('adapt-contrib-accordion  - update default mobileInstruction text', async () => {
    accordions.forEach(accordion => {
      if (!_.has(accordion, 'mobileInstruction')) _.set(accordion, 'mobileInstruction', originalMobileInstruction);
      if (![originalMobileInstruction, ''].includes(accordion.mobileInstruction)) return;
      accordion.mobileInstruction = 'Select the headings to find out more.';
    });
    return true;
  });

  checkContent('adapt-contrib-accordion - check mobileInstruction attribute', async () => {
    const isInvalid = accordions.find(({ mobileInstruction }) => mobileInstruction === originalMobileInstruction);
    if (isInvalid) throw new Error('adapt-contrib-accordion - mobileInstruction attribute not modified');
    return true;
  });

  updatePlugin('adapt-contrib-accordion - update to v7.4.0', { name: 'adapt-contrib-accordion', version: '7.4.0', framework: '>5.20.1' });

  testSuccessWhere('correct version with accordion components with default/custom/no mobileInstruction', {
    fromPlugins: [{ name: 'adapt-contrib-accordion', version: '7.3.0' }],
    content: [
      { _id: 'c-100', _component: 'accordion', mobileInstruction: originalMobileInstruction },
      { _id: 'c-105', _component: 'accordion', mobileInstruction: 'Custom mobileInstruction' },
      { _id: 'c-110', _component: 'accordion' }
    ]
  });

  testStopWhere('no accordion components', {
    fromPlugins: [{ name: 'adapt-contrib-accordion', version: '7.3.0' }],
    content: [{ _component: 'other' }]
  });

  testStopWhere('incorrect version', {
    fromPlugins: [{ name: 'adapt-contrib-accordion', version: '7.4.0' }]
  });
});

describe('adapt-contrib-accordion - v7.4.0 > v7.7.0', async () => {
  let accordions;

  whereFromPlugin('adapt-contrib-accordion - from v7.4.0', { name: 'adapt-contrib-accordion', version: '<7.7.0' });

  whereContent('adapt-contrib-accordion - where accordion', async content => {
    accordions = getComponents('accordion');
    return accordions.length;
  });

  mutateContent('adapt-contrib-accordion - add accordion._items._titleIcon', async () => {
    accordions.forEach(accordion => {
      accordion._items?.forEach(item => {
        item._titleIcon = '';
      });
    });
    return true;
  });

  mutateContent('adapt-contrib-accordion - add accordion._isCenterAligned', async () => {
    accordions.forEach(accordion => {
      accordion._isCenterAligned = false;
    });
    return true;
  });

  checkContent('adapt-contrib-accordion - check accordion._items._titleIcon attribute', async () => {
    const isValid = accordions.every(accordion =>
      accordion._items?.every(item => _.has(item, '_titleIcon'))
    );
    if (!isValid) throw new Error('adapt-contrib-accordion - _titleIcon not added to every instance of accordion._items');
    return true;
  });

  checkContent('adapt-contrib-accordion - check accordion._isCenterAligned attribute', async () => {
    const isValid = accordions.every(({ _isCenterAligned }) => _isCenterAligned === false);
    if (!isValid) throw new Error('adapt-contrib-accordion - _isCenterAligned not added to every instance of accordion');
    return true;
  });

  updatePlugin('adapt-contrib-accordion - update to v7.7.0', { name: 'adapt-contrib-accordion', version: '7.7.0', framework: '>=5.20.1' });

  testSuccessWhere('correct version with accordion components with various number of _items', {
    fromPlugins: [{ name: 'adapt-contrib-accordion', version: '7.4.0' }],
    content: [
      { _id: 'c-100', _component: 'accordion', _items: [{ title: 'item 1' }, { title: 'item 2' }] },
      { _id: 'c-105', _component: 'accordion', _items: [{ title: 'item 1' }] },
      { _id: 'c-110', _component: 'accordion' }
    ]
  });

  testStopWhere('no accordion components', {
    fromPlugins: [{ name: 'adapt-contrib-accordion', version: '7.4.0' }],
    content: [{ _component: 'other' }]
  });

  testStopWhere('incorrect version', {
    fromPlugins: [{ name: 'adapt-contrib-accordion', version: '7.7.0' }]
  });
});
