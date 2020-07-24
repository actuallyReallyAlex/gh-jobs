/// <reference types="cypress" />

context("Saved Jobs", () => {
  beforeEach(() => {
    cy.fixture("jobs50").then((jobsJson) => {
      cy.server();
      cy.route({
        method: "GET",
        url: "/jobs",
        status: 200,
        response: jobsJson,
        delay: 1000,
      });
    });
    cy.visit("http://localhost:3000");
    cy.wait(1000);
    cy.get("#nav-login").click();
    cy.get("h1").should("have.text", "Login");
    cy.get("#email").type("bobtest@email.com");
    cy.get("#password").type("Red123456!!!");
    cy.get("#log-in").click();
    cy.wait(1500);

    cy.get("#nav-login").should("not.exist");
    cy.get("#search").should("be.visible");
  });

  it("Should be able to save a job from the 'Search' page", () => {
    cy.get("#save-job-f1884b46-ecb4-473c-81f5-08d9bf2ab3bb")
      .its("data")
      .should("be", '{ cy: "deselected" }');
    cy.get("#save-job-f1884b46-ecb4-473c-81f5-08d9bf2ab3bb").click();
    cy.get("#remove-job-f1884b46-ecb4-473c-81f5-08d9bf2ab3bb")
      .its("data")
      .should("be", "{ cy: 'selected' }");
    cy.get("#notification-text").should("have.text", "Job saved successfully.");

    // * Cleanup
    cy.get("#remove-job-f1884b46-ecb4-473c-81f5-08d9bf2ab3bb").click();
    cy.get("#notification-text").should(
      "have.text",
      "Job removed successfully."
    );
  });

  it("Should be able to save a job from the 'Details' page", () => {
    cy.get("#f1884b46-ecb4-473c-81f5-08d9bf2ab3bb").click({ force: true });

    cy.get("#save-job-f1884b46-ecb4-473c-81f5-08d9bf2ab3bb")
      .its("data")
      .should("be", "{cy: 'deselected'}");
    cy.get("#save-job-f1884b46-ecb4-473c-81f5-08d9bf2ab3bb").click();
    cy.get("#remove-job-f1884b46-ecb4-473c-81f5-08d9bf2ab3bb")
      .its("data")
      .should("be", "{ cy: 'selected' }");
    cy.get("#notification-text").should("have.text", "Job saved successfully.");

    // * Cleanup
    cy.get("#remove-job-f1884b46-ecb4-473c-81f5-08d9bf2ab3bb").click();
    cy.get("#notification-text").should(
      "have.text",
      "Job removed successfully."
    );
  });

  it("Should be able to view list of saved jobs", () => {
    cy.get("#save-job-f1884b46-ecb4-473c-81f5-08d9bf2ab3bb")
      .its("data")
      .should("be", "{ cy: 'deselected' }");
    cy.get("#save-job-f1884b46-ecb4-473c-81f5-08d9bf2ab3bb").click();
    cy.get("#remove-job-f1884b46-ecb4-473c-81f5-08d9bf2ab3bb")
      .its("data")
      .should("be", '{ cy: "selected" }');
    cy.get("#notification-text").should("have.text", "Job saved successfully.");

    cy.get("#nav-profile").click();
    cy.get("#view-saved-jobs").click();
    cy.get("h1").should("have.text", "Saved Jobs");
    cy.get("#f1884b46-ecb4-473c-81f5-08d9bf2ab3bb").should("exist");

    // * Cleanup
    cy.get("#remove-job-f1884b46-ecb4-473c-81f5-08d9bf2ab3bb").click();
  });
});
