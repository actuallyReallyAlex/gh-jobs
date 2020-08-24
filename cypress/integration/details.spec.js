/// <reference types="cypress" />

context("Details", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
    cy.get("#\\37").click({ force: true });
  });

  it("Should display '<Details />' correctly", () => {
    cy.get("#how-to-label").should("have.text", "How to Apply");
    cy.get("#details-title").should("have.text", "Software Engineer");
    cy.get("#full-time-indicator").should("not.exist");
    cy.get("#details-company-name").should(
      "have.text",
      "D'Amore, Jones and Stroman"
    );
  });

  it("Should be able to return to '<Search />'", () => {
    cy.get("#search").should("not.be.visible");

    cy.get("#back-to-search").click();
    cy.get("#search").should("be.visible");

    cy.get("#\\37").click({ force: true });
    cy.get("#search").should("not.be.visible");

    cy.get("header").click();
    cy.get("#search").should("be.visible");
  });
});
