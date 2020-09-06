/// <reference types="cypress" />

context("Stale Jobs", () => {
  it("Should purge stale hidden jobs", () => {
    // * Setup
    cy.visit("http://localhost:3000");
    cy.get("#nav-login").click();
    cy.request("http://localhost:3000/createStaleUser/");
    cy.get("#email").type("stale@user.com");
    cy.get("#password").type("Red123456!!!");
    cy.get("#log-in").click();
    cy.get("#nav-profile").click();

    // * Assertion
    cy.get("#view-hidden-jobs").click();
    cy.get("#notification").should(
      "have.text",
      "Removed 3 stale jobs from your hidden jobs list."
    );

    // * Cleanup
    cy.get("#modal-close").click()
    cy.get("#settings").click();
    cy.get("#delete-profile").click();
    cy.get("#delete-profile-confirm").click();
  });

  it("Should purge stale saved jobs", () => {
    // * Setup
    cy.visit("http://localhost:3000");
    cy.get("#nav-login").click();
    cy.request("http://localhost:3000/createStaleUser/");
    cy.get("#email").type("stale@user.com");
    cy.get("#password").type("Red123456!!!");
    cy.get("#log-in").click();
    cy.get("#nav-profile").click();

    // * Assertion
    cy.get("#view-saved-jobs").click();
    cy.get("#notification").should(
      "have.text",
      "Removed 3 stale jobs from your saved jobs list."
    );

    // * Cleanup
    cy.get("#modal-close").click()
    cy.get("#settings").click();
    cy.get("#delete-profile").click();
    cy.get("#delete-profile-confirm").click();
  });
});
