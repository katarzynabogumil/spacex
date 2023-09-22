const ID = '5eb87cf8ffd86e000604b348';

describe('Launch Dashboard', () => {
  it('page loads', () => {
    cy.visit('/launch/' + ID);
  });

  it('launch details render', () => {
    cy.visit('/launch/' + ID);
    cy.get(`[data-testid="launch-details"]`).should('be.visible');
  });
});

export { };