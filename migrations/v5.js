import { describe, whereContent, whereFromPlugin, mutateContent, checkContent, updatePlugin } from 'adapt-migrations';

describe('adapt-contrib-accordion - v4.0.0 > v5.0.0', async () => {
  let accordions;

  whereFromPlugin('adapt-contrib-accordion - from v4.0.0', { name: 'adapt-contrib-accordion', version: '<=5.0.0' });

  whereContent('adapt-contrib-accordion - where accordion', async content => {
    accordions = content.filter(({ _component }) => _component === 'accordion');
    if (accordions) return true;
  });

  mutateContent('adapt-contrib-accordion - update accordion._supportedLayout attribute to full-width', async () => {
    accordions.forEach(accordion => {
      /**
      * ? Would this potentially break the layout of any course being migrated?
      */
      accordion._supportedLayout = 'full-width';
    });
    return true;
  });

  checkContent('adapt-contrib-accordion - check accordion._supportedLayout atrribute is now full-width', async () => {
    const isValid = accordions.every(({ _supportedLayout }) => _supportedLayout === 'full-width');
    if (!isValid) throw new Error('adapt-contrib-accordion - _supportedLayout is not set to "full-width" for every instance');
    return true;
  });

  updatePlugin('adapt-contrib-accordion - update to v5.0.0', { name: 'adapt-contrib-accordion', version: '5.0.0', framework: '>=5' });
});

describe('adapt-contrib-accordion - v5.0.0 > v5.3.0', async () => {
  let accordions;

  whereFromPlugin('adapt-contrib-accordion - from v5.0.0', { name: 'adapt-contrib-accordion', version: '<=5.3.0' });

  whereContent('adapt-contrib-accordion - where accordion', async content => {
    accordions = content.filter(({ _component }) => _component === 'accordion');
    if (accordions) return true;
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

  updatePlugin('adapt-contrib-accordion - update to v2.0.4', { name: 'adapt-contrib-accordion', version: '2.0.4', framework: '>=5' });
});
