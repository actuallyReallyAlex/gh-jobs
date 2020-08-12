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
    cy.wait(500);
    cy.get("#nav-login").click();
    cy.get("h1").should("have.text", "Login");
    cy.get("#email").type("bobtest@email.com");
    cy.get("#password").type("Red123456!!!");
    cy.get("#log-in").click();
    cy.wait(500);

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
    cy.get("#notification").should("have.text", "Job saved successfully.");
    cy.get("#notification > button").click();

    // * Cleanup
    cy.get("#remove-job-f1884b46-ecb4-473c-81f5-08d9bf2ab3bb").click();
    cy.get("#notification").should("have.text", "Job removed successfully.");
    cy.get("#notification > button").click();
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
    cy.get("#notification").should("have.text", "Job saved successfully.");
    cy.get("#notification > button").click();

    // * Cleanup
    cy.get("#remove-job-f1884b46-ecb4-473c-81f5-08d9bf2ab3bb").click();
    cy.get("#notification").should("have.text", "Job removed successfully.");
    cy.get("#notification > button").click();
  });

  it("Should be able to view list of saved jobs", () => {
    cy.get("#save-job-f1884b46-ecb4-473c-81f5-08d9bf2ab3bb")
      .its("data")
      .should("be", "{ cy: 'deselected' }");
    cy.get("#save-job-f1884b46-ecb4-473c-81f5-08d9bf2ab3bb").click();
    cy.get("#remove-job-f1884b46-ecb4-473c-81f5-08d9bf2ab3bb")
      .its("data")
      .should("be", '{ cy: "selected" }');
    cy.get("#notification").should("have.text", "Job saved successfully.");
    cy.get("#notification > button").click();

    cy.get("#nav-profile").click();
    cy.get("#view-saved-jobs").click();
    cy.get("#modal-title").should("have.text", "Saved Jobs");
    cy.get("#f1884b46-ecb4-473c-81f5-08d9bf2ab3bb").should("exist");

    // * Cleanup
    cy.get("#remove-job-f1884b46-ecb4-473c-81f5-08d9bf2ab3bb").click();
  });

  it("Should be able to return to the profile display page", () => {
    cy.get("#save-job-f1884b46-ecb4-473c-81f5-08d9bf2ab3bb").click();

    cy.get("#nav-profile").click();
    cy.get("#view-saved-jobs").click();
    cy.get("#modal-title").should("have.text", "Saved Jobs");

    cy.get("#modal-close").click();
    cy.get("h2").should("have.text", "Hello, Bob");

    // * Cleanup
    cy.get("#view-saved-jobs").click();
    cy.get("#remove-job-f1884b46-ecb4-473c-81f5-08d9bf2ab3bb").click();
  });

  it("Should display currentPage as '1' when viewing savedJobs", () => {
    // * Save 6 jobs
    cy.get("#save-job-f1884b46-ecb4-473c-81f5-08d9bf2ab3bb").click();
    cy.get("#save-job-72de09f2-5bc6-489f-be90-3d38e505e20a").click();
    cy.get("#save-job-cc20d9f2-0102-4785-8253-66093d3ca5c0").click();
    cy.get("#save-job-65ed6c1f-e74e-47ed-a85f-126ef1071a47").click();
    cy.get("#save-job-285aa472-990f-418d-b376-e03c27f48d17").click();
    cy.get("[data-cy=pagination-list] > :nth-child(3) > button").click();
    cy.get("#save-job-11cbce13-e6cd-4c79-b904-d292b569b22f").click();

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
    cy.get("#remove-job-f1884b46-ecb4-473c-81f5-08d9bf2ab3bb").click();
    cy.get("#remove-job-72de09f2-5bc6-489f-be90-3d38e505e20a").click();
    cy.get("#remove-job-cc20d9f2-0102-4785-8253-66093d3ca5c0").click();
    cy.get("#remove-job-65ed6c1f-e74e-47ed-a85f-126ef1071a47").click();
    cy.get("#remove-job-285aa472-990f-418d-b376-e03c27f48d17").click();
    cy.get("[data-cy=pagination-list] > :nth-child(3) > button").click();
    cy.get("#remove-job-11cbce13-e6cd-4c79-b904-d292b569b22f").click();
  });
});
