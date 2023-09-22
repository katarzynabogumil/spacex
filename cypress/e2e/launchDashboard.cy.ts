describe('Launch Dashboard', () => {
  it('page loads', () => {
    cy.visit('/');
  });

  it('search and filter bars render', () => {
    cy.visit('/');
    cy.get(`[data-testid="search-bar"]`).should('be.visible');
    cy.get(`[data-testid="filter-bar"]`).should('be.visible');
  });

  it('launch dashboard renders', () => {
    cy.visit('/');
    cy.get(`[data-testid="launch-dashboard"]`).should('be.visible');
    cy.get(`[data-testid="launch-list-container"]`).children().should('have.length.above', 1);;
  });

  it('selecting filter option changes displayed launches', () => {
    let length: number;
    let lengthFiltered: number;

    cy.visit('/');
    cy.get(`[data-testid="launch-list-container"]`).children()
      .then(($value) => {
        length = $value.length;
      })

    cy.get(`[data-testid="filter-bar"]`).select('upcoming').then(() => {
      cy.get(`[data-testid="launch-list-container"]`).children()
        .then(($value) => {
          lengthFiltered = $value.length;
          expect(lengthFiltered).to.be.lessThan(length);
        });
    });

    cy.get(`[data-testid="filter-bar"]`).select('successful').then(() => {
      cy.get(`[data-testid="launch-list-container"]`).children()
        .then(($value) => {
          lengthFiltered = $value.length;
          expect(lengthFiltered).to.be.lessThan(length);
        });
    });

    cy.get(`[data-testid="filter-bar"]`).select('failed').then(() => {
      cy.get(`[data-testid="launch-list-container"]`).children()
        .then(($value) => {
          lengthFiltered = $value.length;
          expect(lengthFiltered).to.be.lessThan(length);
        });
    });
  });

  it.only('typing searchphrase changes displayed launches', () => {
    let length: number;
    let lengthFiltered: number;

    cy.visit('/');
    cy.get(`[data-testid="launch-list-container"]`).children()
      .then(($value) => {
        length = $value.length;
      })

    cy.get(`[data-testid="search-bar"]`).type('abcde').then(() => {
      cy.get(`[data-testid="launch-list-container"]`).children()
        .then(($value) => {
          lengthFiltered = $value.length;
          expect(lengthFiltered).to.be.lessThan(length);
        });
    });
  });

  it.only('typing searchphrase changes the order of displayed launches', () => {
    const name = 'FalconSat'
    cy.visit('/');
    cy.wait(1000);

    cy.get(`[data-testid="search-bar"]`).type(name).then(() => {
      cy.get(`[data-testid="launch-list-container"]`).children().first()
        .should('contain', name)
    });
  });
});

export { };