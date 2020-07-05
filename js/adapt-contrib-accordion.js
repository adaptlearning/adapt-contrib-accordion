import Adapt from 'core/js/adapt';
import AccordionModel from './accordionModel';
import AccordionView from './accordionView';

export default Adapt.register('accordion', {
  model: AccordionModel,
  view: AccordionView
});
