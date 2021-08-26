import Adapt from 'core/js/adapt';
import AccordionModel from './AccordionModel';
import AccordionView from './AccordionView';

export default Adapt.register('accordion', {
  model: AccordionModel,
  view: AccordionView
});
