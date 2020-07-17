/// <reference types="cypress" />

context("Search", () => {
  beforeEach(() => {
    cy.fixture("jobs50").then((jobsJson) => {
      cy.server();
      cy.route({
        method: "GET",
        url: "/jobs",
        status: 200,
        response: jobsJson,
        onRequest: (xhr) => {},
        onResponse: (xhr) => {},
      });
    });
    cy.visit("http://localhost:3000");
  });

  it("Should search correctly", () => {
    cy.get(".jobcard__container").then(($jobs) => {
      assert.equal($jobs.length, 5);
    });
    cy.get("#search").type("developer");
    cy.get(".search__button").click();
    cy.wait(1000);
    cy.get(".jobcard__container").then(($jobs) => {
      assert.equal($jobs.length, 5);
    });
  });

  it("Should retain search value on reload", () => {
    cy.get("#search").type("developer");
    cy.get(".search__button").click();
    cy.wait(1000);
    cy.reload();
    cy.get("#search").should("have.value", "developer");
  });

  it("Should be able to submit form with enter key", () => {
    cy.get(".orbit-spinner").should("not.be.visible");
    cy.get("#search").type("developer");
    cy.get("#search").type("{enter}");
    cy.get(".orbit-spinner").should("be.visible");
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
      onRequest: (xhr) => {},
      onResponse: (xhr) => {},
    });
    cy.visit("http://localhost:3000");
  });

  it("Should display note when there are no results", () => {
    cy.get("#search").type("developer");
    cy.get(".search__button").click();
    cy.wait(1000);
    cy.get("#no-results").should(
      "have.text",
      "No results. Please modify your search and try again."
    );
  });
});
