/* eslint-disable no-undef */

describe("Upload", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("verifies the upload button is initially disabled", () => {
    cy.get('[data-cy="data-cy-upload-button"]').should("be.disabled");
  });

  it("loads the video file upload form", () => {
    cy.get('[data-cy="data-cy-form-input"]').should("be.visible");
  });

  it("selects a video file and enables Upload button", () => {
    const fileName = "One Pot Chicken and Rice.mp4";
    cy.fixture(fileName, "base64").then((fileContent) => {
      cy.get('[data-cy="data-cy-form-input"]').then((input) => {
        const blob = Cypress.Blob.base64StringToBlob(fileContent, "video/mp4");
        const file = new File([blob], fileName, {
          type: "video/mp4",
        });
        const dataTransfer = new DataTransfer();
        dataTransfer.items.add(file);
        input[0].files = dataTransfer.files;
        cy.wrap(input).trigger("change"); // Trigger change event to reflect file selection
      });
    });
    cy.get('[data-cy="data-cy-upload-button"]').should("be.enabled");
  });

  it("selects a non-video file and disables Upload button", () => {
    const fileName = "example.json";

    cy.fixture(fileName, "binary").then((fileContent) => {
      const blob = new Blob([fileContent], { type: "application/json" });

      const file = new File([blob], fileName, {
        type: "application/json",
      });

      cy.get('[data-cy="data-cy-form-input"]').then((input) => {
        const dataTransfer = new DataTransfer();
        dataTransfer.items.add(file);
        const event = new MouseEvent("change", {
          bubbles: true,
          cancelable: true,
          view: window,
        });
        Object.defineProperty(input[0], "files", {
          value: dataTransfer.files,
        });
        input[0].dispatchEvent(event);
      });

      cy.get('[data-cy="data-cy-upload-button"]').should("be.disabled");
    });
  });
});
