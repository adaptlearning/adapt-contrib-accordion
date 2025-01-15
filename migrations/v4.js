import { describe, whereContent, whereFromPlugin, mutateContent, checkContent, updatePlugin } from 'adapt-migrations';

describe('adapt-contrib-accordion - v2.1.0 > v4.0.0', async () => {
  let accordions;

  whereFromPlugin('adapt-contrib-accordion - from v2.1.0', { name: 'adapt-contrib-accordion', version: '<=4.0.0' });

  whereContent('adapt-contrib-accordion - where accordion', async content => {
    accordions = content.filter(({ _component }) => _component === 'accordion');
    if (accordions) return true;
  });

  mutateContent('adapt-contrib-accordion - add accordion._setCompletionOn', async () => {
    accordions.forEach(accordion => {
      accordion._setCompletionOn = 'allItems';
    });
    return true;
  });

  checkContent('adapt-contrib-accordion - check accordion._setCompletionOn atrribute', async () => {
    const isValid = accordions.every(({ _setCompletionOn }) => _setCompletionOn !== undefined);
    if (!isValid) throw new Error('adapt-contrib-accordion - _setCompletionOn not added to every instance of accordion');
    return true;
  });

  updatePlugin('adapt-contrib-accordion - update to v2.0.0', { name: 'adapt-contrib-accordion', version: '2.0.0', framework: '2.0.0' });
});
