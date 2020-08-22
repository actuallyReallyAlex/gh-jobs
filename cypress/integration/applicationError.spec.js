/// <reference types="cypress" />

context("Application Error", () => {
  Cypress.on("uncaught:exception", (err, runnable) => {
    // returning false here prevents Cypress from
    // failing the test
    return false;
  });
  beforeEach(() => {
    cy.server();
    cy.route({
      method: "GET",
      url:
        "/jobs/search?userId=&full_time=false&contract=false&description=react",
      status: 200,
      response: {},
      delay: 1000,
    });
    cy.route({
      method: "GET",
      url: "/jobs/7",
      status: 200,
      response: {},
      delay: 1000,
    });
    cy.visit("http://localhost:3000");
  });

  it("Should display ErrorFallback correctly when an error occurs", () => {
    // * Create an error with stubbed response
    cy.get("#search").type("react");
    cy.get("#search-submit").click();

    cy.get("h1").should("have.text", "Technical Difficulties");
    cy.get("p").should(
      "have.text",
      "Oops! Something went wrong. The error has been reported. Please try again."
    );
    cy.get("#try-again").should("have.text", "Try again");
  });

  it("Should reset application state when the button is clicked", () => {
    // * Create an error with stubbed response
    cy.get("#search").type("react");
    cy.get("#search-submit").click();

    cy.get("#try-again").click();
    cy.get("#search").should("be.visible");
  });

  it("Should push app to '/' when 'Try again' button is clicked", () => {
    cy.get("#\\37").click({ force: true });

    cy.get("#try-again").click();
    cy.get("#search").should("be.visible");
  });
});
