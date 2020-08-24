/// <reference types="cypress" />

context("Search", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
  });

  it("Should search correctly", () => {
    cy.get("#search").type("developer");
    cy.get("#search-submit").click();
    cy.get("#notification").should("have.text", "Search returned 30 results.");
  });

  it("Should retain search value on reload", () => {
    cy.get("#search").type("developer");
    cy.get("#search-submit").click();
    cy.wait(1000);
    cy.reload();
    cy.get("#search").should("have.value", "developer");
  });

  it("Should be able to submit form with enter key", () => {
    cy.server();
    cy.route({
      method: "GET",
      url:
        "/jobs/search?userId=&full_time=false&contract=false&description=developer",
      status: 200,
      response: [],
      delay: 1000,
    });
    cy.get('[data-cy="orbit-container"]').should("not.be.visible");
    cy.get("#search").type("developer");
    cy.get("#search").type("{enter}");
    cy.get('[data-cy="orbit-container"]').should("be.visible");
  });

  it("Should not display hidden jobs in currentJobs on search", () => {
    // * Log In
    cy.get("#nav-login").click();
    cy.get("#email").type("bobtest@email.com");
    cy.get("#password").type("Red123456!!!");
    cy.get("#log-in").click();
    cy.wait(500);

    // * Hide a job
    cy.get("#hide-job-7").click();
    // * Log User out
    cy.get("#nav-profile").click();
    cy.get("#settings").click();
    cy.get("#log-out").click();

    cy.get("#\\37").should("exist");

    // * Log In
    cy.get("#nav-login").click();
    cy.get("#email").type("bobtest@email.com");
    cy.get("#password").type("Red123456!!!");
    cy.get("#log-in").click();
    cy.wait(500);

    cy.get("#\\37").should("not.exist");

    // * Do search
    cy.get("#search-submit").click();

    // * Assert job does not exist
    cy.get("#\\37").should("not.exist");

    // * Cleanup
    cy.get("#nav-profile").click();
    cy.get("#view-hidden-jobs").click();
    cy.get("#show-job-7").click();
  });

  it("Should reset search values on reload", () => {
    cy.get("#search").type("Search value");
    cy.get("#location-search").type("Location search value");

    cy.reload();

    cy.get("#search").should("have.value", "");
    cy.get("#location-search").should("have.value", "");
  });
});

context("Search - No Results", () => {
  beforeEach(() => {
    cy.server();
    cy.route({
      method: "POST",
      url: "/jobs",
      status: 200,
      response: [],
      delay: 1000,
    });
    cy.route({
      method: "GET",
      url:
        "/jobs/search?userId=&full_time=false&contract=false&description=developer",
      status: 200,
      response: [],
      delay: 1000,
    });
    cy.visit("http://localhost:3000");
  });

  it("Should display note when there are no results", () => {
    cy.get("#search").type("developer");
    cy.get("#search-submit").click();
    cy.wait(1000);
    cy.get("#no-results").should(
      "have.text",
      "No results. Please modify your search and try again."
    );
  });
});

context("Search - Loading Indicator", () => {
  beforeEach(() => {
    cy.fixture("jobs50").then((jobsJson) => {
      cy.server();
      cy.route({
        method: "POST",
        url: "/jobs",
        status: 200,
        response: jobsJson,
        delay: 3000,
      });
    });
  });

  it("Should display LoadingIndicator correctly on jobs loading", () => {
    cy.visit("http://localhost:3000");
    cy.get("#no-results").should("be.visible");
    cy.get("[data-cy=orbit-container] > :nth-child(3)").should("be.visible");

    cy.wait(3100);

    cy.get("#no-results").should("not.be.visible");
    cy.get("[data-cy=orbit-container] > :nth-child(3)").should(
      "not.be.visible"
    );
  });
});
