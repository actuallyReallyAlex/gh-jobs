/// <reference types="cypress" />

context("Search", () => {
  beforeEach(() => {
    cy.fixture("jobs50").then((jobsJson) => {
      cy.fixture("jobsSearch1").then((searchJson) => {
        cy.server();
        cy.route({
          method: "GET",
          url: "/jobs",
          status: 200,
          response: jobsJson,
          delay: 1000,
        });
        cy.route({
          method: "GET",
          url: "/jobs/search?full_time=false&contract=false&description=developer",
          status: 200,
          response: searchJson,
          delay: 1000,
        });
      });
    });
    cy.visit("http://localhost:3000");
  });

  it("Should search correctly", () => {
    cy.get('[data-cy="job-container"]').then(($jobs) => {
      assert.equal($jobs.length, 5);
    });
    cy.get("#search").type("developer");
    cy.get("#search-submit").click();
    cy.wait(1000);
    cy.get('[data-cy="job-container"]').then(($jobs) => {
      assert.equal($jobs.length, 5);
    });
  });

  it("Should retain search value on reload", () => {
    cy.get("#search").type("developer");
    cy.get("#search-submit").click();
    cy.wait(1000);
    cy.reload();
    cy.get("#search").should("have.value", "developer");
  });

  it("Should be able to submit form with enter key", () => {
    cy.get('[data-cy="orbit-container"]').should("not.be.visible");
    cy.get("#search").type("developer");
    cy.get("#search").type("{enter}");
    cy.get('[data-cy="orbit-container"]').should("be.visible");
  });
});

context("Search - No Results", () => {
  beforeEach(() => {
    cy.server();
    cy.route({
      method: "GET",
      url: "/jobs",
      status: 200,
      response: [],
      delay: 1000,
    });
    cy.route({
      method: "GET",
      url: "/jobs/search?full_time=false&contract=false&description=developer",
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
        method: "GET",
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
