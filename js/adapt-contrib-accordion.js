define([
    'core/js/adapt',
    './accordionModel',
    './accordionView'
], function(Adapt, AccordionModel, AccordionView) {

    return Adapt.register('accordion', {
        view: AccordionView,
        model: AccordionModel
    });

});
