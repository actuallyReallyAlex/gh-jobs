/// <reference types="cypress" />

context("Saved Jobs", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
    cy.get("#nav-login").click();
    cy.get("h1").should("have.text", "Login");
    cy.get("#email").type("bobtest@email.com");
    cy.get("#password").type("Red123456!!!");
    cy.get("#log-in").click();

    cy.get("#nav-login").should("not.exist");
    cy.get("#search").should("be.visible");
  });

  it("Should be able to save a job from the 'Search' page", () => {
    cy.get("#save-job-7").its("data").should("be", '{ cy: "deselected" }');
    cy.get("#save-job-7").click();
    cy.get("#remove-job-7").its("data").should("be", "{ cy: 'selected' }");
    cy.get("#notification").should("have.text", "Job saved successfully.");
    cy.get("#notification > button").click();

    // * Cleanup
    cy.get("#remove-job-7").click();
    cy.get("#notification").should("have.text", "Job removed successfully.");
    cy.get("#notification > button").click();
  });

  it("Should be able to save a job from the 'Details' page", () => {
    cy.get("#\\37").click({ force: true });

    cy.get("#save-job-7").its("data").should("be", "{cy: 'deselected'}");
    cy.get("#save-job-7").click();
    cy.get("#remove-job-7").its("data").should("be", "{ cy: 'selected' }");
    cy.get("#notification").should("have.text", "Job saved successfully.");
    cy.get("#notification > button").click();

    // * Cleanup
    cy.get("#remove-job-7").click();
    cy.get("#notification").should("have.text", "Job removed successfully.");
    cy.get("#notification > button").click();
  });

  it("Should be able to view list of saved jobs", () => {
    cy.get("#save-job-7").its("data").should("be", "{ cy: 'deselected' }");
    cy.get("#save-job-7").click();
    cy.get("#remove-job-7").its("data").should("be", '{ cy: "selected" }');
    cy.get("#notification").should("have.text", "Job saved successfully.");
    cy.get("#notification > button").click();

    cy.get("#nav-profile").click();
    cy.get("#view-saved-jobs").click();
    cy.get("#modal-title").should("have.text", "Saved Jobs");
    cy.get("#\\37").should("exist");

    // * Cleanup
    cy.get("#remove-job-7").click();
  });

  it("Should be able to return to the profile display page", () => {
    cy.get("#save-job-7").click();

    cy.get("#nav-profile").click();
    cy.get("#view-saved-jobs").click();
    cy.get("#modal-title").should("have.text", "Saved Jobs");

    cy.get("#modal-close").click();
    cy.get("h2").should("have.text", "Hello, Bob");

    // * Cleanup
    cy.get("#view-saved-jobs").click();
    cy.get("#remove-job-7").click();
  });

  it("Should display currentPage as '1' when viewing savedJobs", () => {
    // * Save 6 jobs
    cy.get("#save-job-7").click();
    cy.get("#save-job-4").click();
    cy.get("#save-job-1").click();
    cy.get("#save-job-8").click();
    cy.get("#save-job-9").click();
    cy.get("[data-cy=pagination-list] > :nth-child(3) > button").click();
    cy.get("#save-job-2").click();

    // * View Saved Jobs
    cy.get("#nav-profile").click();
    cy.get("#view-saved-jobs").click();
    cy.get("[data-cy=pagination-item-selected] > button").should(
      "have.text",
      "1"
    );
    cy.get("[data-cy=pagination-item-deselected] > button").should(
      "have.text",
      "2"
    );

    // * Cleanup
    cy.get("#modal-close").click();
    cy.get("header").click();
    cy.get("#remove-job-7").click();
    cy.get("#remove-job-4").click();
    cy.get("#remove-job-1").click();
    cy.get("#remove-job-8").click();
    cy.get("#remove-job-9").click();
    cy.get("[data-cy=pagination-list] > :nth-child(3) > button").click();
    cy.get("#remove-job-2").click();
  });
});

context("Saved Jobs - No Results", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
    cy.get("#nav-login").click();
    cy.get("h1").should("have.text", "Login");
    cy.get("#email").type("bobtest@email.com");
    cy.get("#password").type("Red123456!!!");
    cy.get("#log-in").click();

    cy.get("#nav-login").should("not.exist");
    cy.get("#search").should("be.visible");
  });

  it("Should not make call to BE if there are no jobs in the list", () => {
    cy.get("#nav-profile").click();
    cy.get("#view-saved-jobs").click();

    assert.equal(cy.state("requests").length, 4);
  });

  it("Should display correct text", () => {
    cy.get("#nav-profile").click();
    cy.get("#view-hidden-jobs").click();

    cy.get("#no-results").should("have.text", "No results.");
  });
});
