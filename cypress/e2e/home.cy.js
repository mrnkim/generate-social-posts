describe("The server", () => {
  it("successfully loads", () => {
    cy.request("http://localhost:4001/indexes/653c0592480f870fb3bb01be/videos");
  });
});

before(() => {
  Cypress.env("REACT_APP_INDEX_ID", "653c0592480f870fb3bb01be");
});

describe("The home page", () => {
  it("successfully loads the title", () => {
    cy.visit("/");
    cy.contains("Generate Social Posts for Your Video");
  });

  it("successfully loads the first video of an index", () => {
    cy.visit("/");
    cy.get('[data-cy="data-cy-video"]');
  });

  it("successfully loads the first video of an index", () => {
    cy.visit("/");
    cy.get('[data-cy="data-cy-video"]');
  });
});
