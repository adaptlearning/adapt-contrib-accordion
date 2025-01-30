import { describe, whereContent, whereFromPlugin, mutateContent, checkContent, updatePlugin } from 'adapt-migrations';

describe('adapt-contrib-accordion - v5.3.0 > v7.3.0', async () => {
  let accordions;

  whereFromPlugin('adapt-contrib-accordion - from v5.3.0', { name: 'adapt-contrib-accordion', version: '<=7.3.0' });

  whereContent('adapt-contrib-accordion - where accordion', async content => {
    accordions = content.filter(({ _component }) => _component === 'accordion');
    if (accordions) return true;
  });

  /**
   * * Add JSON field to component and set attribute.
   */
  mutateContent('adapt-contrib-accordion - add accordion._items._imageAlignment', async () => {
    accordions.forEach(accordion => {
      accordion._items.forEach(item => {
        item._imageAlignment = 'full';
      });
    });
    return true;
  });

  checkContent('adapt-contrib-accordion - check accordion._items._imageAlignment atrribute', async () => {
    const isValid = accordions.every(accordion =>
      accordion._items.every(item =>
        item && item._imageAlignment === 'full'
      )
    );
    if (!isValid) throw new Error('adapt-contrib-accordion - _imageAlignment not added to every instance of accordion._items');
    return true;
  });

  updatePlugin('adapt-contrib-accordion - update to v7.3.0', { name: 'adapt-contrib-accordion', version: '7.3.0', framework: '>=5' });
});

describe('adapt-contrib-accordion - v7.3.0 > v7.4.0', async () => {
  let accordions;

  whereFromPlugin('adapt-contrib-accordion - from v7.3.0', { name: 'adapt-contrib-accordion', version: '<=7.4.0' });

  whereContent('adapt-contrib-accordion - where accordion', async content => {
    accordions = content.filter(({ _component }) => _component === 'accordion');
    if (accordions) return true;
  });

  /**
   * * Modify an attribute value.
   */
  mutateContent('adapt-contrib-accordion  - update default mobileInstruction text', async () => {
    accordions.forEach(accordion => {
      if (accordion.mobileInstruction === 'Select the headings below to reveal the text.' || '') {
        accordion.mobileInstruction = 'Select the headings to find out more.';
      }
    });
    return true;
  });

  checkContent('adapt-contrib-accordion - check mobileInstruction attribute', async () => {
    const isInvalid = accordions.some(({ mobileInstruction }) => mobileInstruction === 'Select the headings to find out more.');
    if (isInvalid) throw new Error('adapt-contrib-accordion - mobileInstruction attribute not modified');
    return true;
  });

  updatePlugin('adapt-contrib-accordion - update to v7.4.0', { name: 'adapt-contrib-accordion', version: '7.4.0', framework: '>=5' });
});

describe('adapt-contrib-accordion - v7.4.0 > v7.7.0', async () => {
  let accordions;

  whereFromPlugin('adapt-contrib-accordion - from v7.4.0', { name: 'adapt-contrib-accordion', version: '<=7.7.0' });

  whereContent('adapt-contrib-accordion - where accordion', async content => {
    accordions = content.filter(({ _component }) => _component === 'accordion');
    if (accordions) return true;
  });

  /**
   * * Add field to each item in a JSON array and set blank.
   */
  mutateContent('adapt-contrib-accordion - add accordion._items._titleIcon', async () => {
    accordions.forEach(accordion => {
      accordion._items.forEach(item => {
        item._titleIcon = '';
      });
    });
    return true;
  });

  checkContent('adapt-contrib-accordion - check accordion._items._titleIcon attribute', async () => {
    const isValid = accordions.every(accordion =>
      accordion._items.every(item =>
        item && item._titleIcon !== undefined
      )
    );
    if (!isValid) throw new Error('adapt-contrib-accordion - _titleIcon not added to every instance of accordion._items');
    return true;
  });

  /**
   * * Add JSON field to component and set attribute.
   */
  mutateContent('adapt-contrib-accordion - add accordion._isCenterAligned', async () => {
    accordions.forEach(accordion => {
      accordion._isCenterAligned = false;
    });
    return true;
  });

  checkContent('adapt-contrib-accordion - check accordion._isCenterAligned attribute', async () => {
    const isValid = accordions.every(({ _isCenterAligned }) => _isCenterAligned === false);
    if (!isValid) throw new Error('adapt-contrib-accordion - _isCenterAligned not added to every instance of accordion');
    return true;
  });

  updatePlugin('adapt-contrib-accordion - update to v7.7.0', { name: 'adapt-contrib-accordion', version: '7.7.0', framework: '>=5.20.1' });
});
