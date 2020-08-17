/// <reference types="cypress" />

context("Application Error", () => {
  Cypress.on("uncaught:exception", (err, runnable) => {
    // returning false here prevents Cypress from
    // failing the test
    return false;
  });
  beforeEach(() => {
    cy.fixture("jobs50").then((jobsJson) => {
      cy.server();
      cy.route({
        method: "POST",
        url: "/jobs",
        status: 200,
        response: jobsJson,
        delay: 1000,
      });
      cy.route({
        method: "GET",
        url: "/jobs/search?userId=&full_time=false&contract=false&description=react",
        status: 200,
        response: {},
        delay: 1000,
      });
      cy.route({
        method: "GET",
        url: "/jobs/f1884b46-ecb4-473c-81f5-08d9bf2ab3bb",
        status: 200,
        response: {},
        delay: 1000,
      });
    });
    cy.visit("http://localhost:3000");
    cy.wait(500);
  });

  it("Should display ErrorFallback correctly when an error occurs", () => {
    // * Create an error with stubbed response
    cy.get("#search").type("react");
    cy.get("#search-submit").click();
    cy.wait(1000);

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
    cy.wait(1000);

    cy.get("#try-again").click();
    cy.wait(500);
    cy.get("#search").should("be.visible");
  });

  it("Should push app to '/' when 'Try again' button is clicked", () => {
    cy.get("#f1884b46-ecb4-473c-81f5-08d9bf2ab3bb").click({ force: true });
    cy.wait(1000);

    cy.get("#try-again").click();
    cy.wait(500);
    cy.get("#search").should("be.visible");
  });
});
