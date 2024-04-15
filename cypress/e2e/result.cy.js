/* eslint-disable no-undef */

describe("Result", () => {
  it("shows an error message when an input form is submitted empty", () => {
    cy.visit("/");
    cy.get('[data-cy="data-cy-inputForm-button"]').click({ force: true });
    cy.contains(
      "Please provide the context for the text you'd like to generate"
    );
  });

  it("successfully shows the results with user prompts", () => {
    cy.intercept("POST", "/videos/*/generate", {
      statusCode: 200,
      body: { data: "Your generated post goes here" },
    }).as("generate");

    cy.visit("/");
    cy.get('[data-cy="data-cy-inputForm-textarea"]').type(
      "write a very short instagram post with emojis"
    );
    cy.get('[data-cy="data-cy-inputForm-button"]').click({ force: true });
    cy.wait("@generate");

    cy.contains("Generated Post");
    cy.get('[data-cy="data-cy-resultData"]').should(
      "contain.text",
      "Your generated post goes here"
    );
  });
});
