describe('Accordion', function () {
  const stripHtml = cy.helpers.stripHtml;

  function loopThroughAccordion(accordionComponent) {
    const items = accordionComponent._items;
    cy.get('.accordion-item').should('have.length', items.length);
    // Check each accordion item
    items.forEach((item, index) =>  {
      // Check within the correct item so it doesn't detect visibility from other items
      cy.get('.accordion-item').eq(index).within(() => {
        cy.get('.accordion-item__btn.is-visited').should('not.exist');
        cy.get('.accordion-item__body-inner').should('not.be.visible');
        cy.get('.accordion-item__title').should('contain', item.title);
        cy.get('.accordion-item__title').as('btn').click();
        cy.get('.accordion-item__btn.is-visited').should('exist');
        cy.get('.accordion-item__body-inner')
          .should('be.visible')
          .should('contain', stripHtml(item.body));
        cy.get('.accordion-item__title').click();
        cy.get('.accordion-item__body-inner').should('not.be.visible');
      });
    });
  };

  beforeEach(function () {
    cy.getData();
  });

  it('should display the accordion component', function () {
    const accordionComponents = this.data.components.filter(component => component._component === 'accordion');
    accordionComponents.forEach(accordionComponent => {
      cy.visit(`/#/preview/${accordionComponent._id}`);
      cy.testContainsOrNotExists('.accordion__body', stripHtml(accordionComponent.body));
      cy.testContainsOrNotExists('.accordion__title', stripHtml(accordionComponent.displayTitle));
      cy.testContainsOrNotExists('.accordion__instruction', stripHtml(accordionComponent.instruction));
 
      // Test accordion items
      loopThroughAccordion(accordionComponent);

      // Allow the component to load and run external custom tests
      cy.wait(1000);
    })
  });
});
