/// <reference types="cypress" />

context("Pagination", () => {
  beforeEach(() => {
    cy.fixture("jobs").then((jobsJson) => {
      cy.server();
      cy.route({
        method: "GET",
        url: "**/positions.json?page=1",
        status: 200,
        response: jobsJson,
        onRequest: (xhr) => {},
        onResponse: (xhr) => {},
      });
      cy.route({
        method: "GET",
        url: "**/positions.json?page=2",
        status: 200,
        response: [],
        onRequest: (xhr) => {},
        onResponse: (xhr) => {},
      });
    });
    cy.visit("http://localhost:8080");
  });

  it("Should paginate correctly", () => {
    cy.get(".pagination__list").then(($list) => {
      console.log($list[0].children);
    });
  });
});
