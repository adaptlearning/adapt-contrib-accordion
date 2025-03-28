import { describe, whereContent, whereFromPlugin, mutateContent, checkContent, updatePlugin, getComponents, testStopWhere, testSuccessWhere } from 'adapt-migrations';
import _ from 'lodash';

describe('adapt-contrib-accordion - v2.0.3 > v2.0.4', async () => {
  let accordions;

  whereFromPlugin('adapt-contrib-accordion - from v2.0.3', { name: 'adapt-contrib-accordion', version: '>=2.0.0 <2.0.4' });

  whereContent('adapt-contrib-accordion - where accordion', async content => {
    accordions = getComponents('accordion');
    return accordions.length;
  });

  mutateContent('adapt-contrib-accordion - add accordion._items._classes attribute', async () => {
    accordions.forEach(accordion => {
      accordion._items?.forEach(item => {
        item._classes = '';
      });
    });
    return true;
  });

  checkContent('adapt-contrib-accordion - check accordion._items._classes attribute', async () => {
    const isValid = accordions.every(accordion =>
      accordion._items?.every(item =>
        _.has(item, '_classes')
      )
    );
    if (!isValid) throw new Error('adapt-contrib-accordion - _classes not added to every instance of accordion._items');
    return true;
  });

  updatePlugin('adapt-contrib-accordion - update to v2.0.4', { name: 'adapt-contrib-accordion', version: '2.0.4', framework: '>=2.0.0' });

  testSuccessWhere('correct version with accordion components', {
    fromPlugins: [{ name: 'adapt-contrib-accordion', version: '2.0.3' }],
    content: [
      { _id: 'c-100', _component: 'accordion', _items: [{ title: 'item 1' }] },
      { _id: 'c-105', _component: 'accordion', _items: [{ title: 'item 1' }] }
    ]
  });

  testStopWhere('no accordion components', {
    fromPlugins: [{ name: 'adapt-contrib-accordion', version: '2.0.3' }],
    content: [{ _component: 'other' }]
  });

  testStopWhere('incorrect version', {
    fromPlugins: [{ name: 'adapt-contrib-accordion', version: '2.0.4' }]
  });
});

describe('adapt-contrib-accordion - v2.0.4 > v2.0.5', async () => {
  let accordions;

  whereFromPlugin('adapt-contrib-accordion - from v2.0.4', { name: 'adapt-contrib-accordion', version: '<2.0.5' });

  whereContent('adapt-contrib-accordion - where accordion', async content => {
    accordions = getComponents('accordion');
    return accordions.length;
  });

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

  testSuccessWhere('correct version with accordion components', {
    fromPlugins: [{ name: 'adapt-contrib-accordion', version: '2.0.4' }],
    content: [
      { _id: 'c-100', _component: 'accordion', _items: [{ title: 'item 1' }] },
      { _id: 'c-105', _component: 'accordion' },
      { _id: 'c-110', _component: 'accordion' }
    ]
  });

  testStopWhere('no accordion components', {
    fromPlugins: [{ name: 'adapt-contrib-accordion', version: '2.0.4' }],
    content: [{ _component: 'other' }]
  });

  testStopWhere('incorrect version', {
    fromPlugins: [{ name: 'adapt-contrib-accordion', version: '2.0.5' }]
  });
});

describe('adapt-contrib-accordion - v2.0.5 > v2.1.0', async () => {
  let accordions;

  whereFromPlugin('adapt-contrib-accordion - from v2.0.5', { name: 'adapt-contrib-accordion', version: '<2.1.0' });

  whereContent('adapt-contrib-accordion - where accordion', async content => {
    accordions = getComponents('accordion');
    return accordions.length;
  });

  mutateContent('adapt-contrib-accordion - add accordion._items._graphic.attribution', async () => {
    accordions.forEach(accordion => {
      accordion._items?.forEach(item => {
        _.set(item, '_graphic.attribution', '');
      });
    });
    return true;
  });

  checkContent('adapt-contrib-accordion - check accordion._items._graphic.attribution atrribute', async () => {
    const isValid = accordions.every(accordion =>
      accordion._items?.every(item =>
        _.has(item, '_graphic.attribution')
      )
    );
    if (!isValid) throw new Error('adapt-contrib-accordion - _graphic.attribution not added to every instance of accordion._items');
    return true;
  });

  updatePlugin('adapt-contrib-accordion - update to v2.1.0', { name: 'adapt-contrib-accordion', version: '2.1.0', framework: '>=2.0.0' });

  testSuccessWhere('correct version with accordion components with/without _graphic', {
    fromPlugins: [{ name: 'adapt-contrib-accordion', version: '2.0.5' }],
    content: [
      { _id: 'c-100', _component: 'accordion', _items: [{ title: 'item 1', _graphic: {} }] },
      { _id: 'c-105', _component: 'accordion', _items: [{ title: 'item 1' }] },
      { _id: 'c-110', _component: 'accordion' }
    ]
  });

  testStopWhere('no accordion components', {
    fromPlugins: [{ name: 'adapt-contrib-accordion', version: '2.0.5' }],
    content: [{ _component: 'other' }]
  });

  testStopWhere('incorrect version', {
    fromPlugins: [{ name: 'adapt-contrib-accordion', version: '2.1.0' }]
  });
});
