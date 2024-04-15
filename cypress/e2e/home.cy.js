/* eslint-disable no-undef */

describe("The server", () => {
  it("successfully loads", () => {
    cy.request("http://localhost:4001/indexes/653c0592480f870fb3bb01be/videos");
  });
});

before(() => {
  Cypress.env("REACT_APP_INDEX_ID", "653c0592480f870fb3bb01be");
});

describe("The home page", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("successfully loads the title", () => {
    cy.contains("Generate Social Posts for Your Video");
  });

  it("successfully shows the video upload form", () => {
    cy.get('[data-cy="data-cy-videoFileUploadForm"]');
  });

  it("successfully loads the first video of an index", () => {
    cy.get('[data-cy="data-cy-video"]');
  });

  it("successfully shows the input form", () => {
    cy.get('[data-cy="data-cy-inputForm"]');
  });
});
