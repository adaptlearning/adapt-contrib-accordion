describe('Accordion', function () {
  function loopThroughAccordion(accordionComponent) {
    const items = accordionComponent._items
    cy.get('.accordion-item').should('have.length', items.length)
    items.forEach((item, index) =>  {
      const bodyWithoutHtml = item.body.replace(/<[^>]*>/g, '')
      cy.get('.accordion-item').eq(index).within(() => {
        cy.get('.accordion-item__btn.is-visited').should('not.exist')
        cy.get('.accordion-item__body-inner').should('not.be.visible')
        cy.get('.accordion-item__title').should('contain', item.title).click()
        cy.get('.accordion-item__btn.is-visited').should('exist')
        cy.get('.accordion-item__body-inner')
          .should('be.visible')
          .should('contain', bodyWithoutHtml)
        cy.get('.accordion-item__title').click()
        cy.get('.accordion-item__body-inner').should('not.be.visible')
      })
    }
  }

  beforeEach(function () {
    cy.getData()
  });

  it('should display the accordion component', function () {
    const accordionComponents = this.data.components.filter((component) => component._component === 'accordion')
    accordionComponents.forEach((accordionComponent) => {
      cy.visit(`/#/preview/${accordionComponent._id}`);
      const bodyWithoutHtml = accordionComponent.body.replace(/<[^>]*>/g, '')
      
      cy.testContainsOrNotExists('.accordion__title', accordionComponent.displayTitle)
      cy.testContainsOrNotExists('.accordion__body', bodyWithoutHtml)
      cy.testContainsOrNotExists('.accordion__instruction', accordionComponent.instruction)
      
      loopThroughAccordion(accordionComponent)

      cy.wait(1000)
    })
  });
});
