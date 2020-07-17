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
});
