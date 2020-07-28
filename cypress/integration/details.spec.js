/// <reference types="cypress" />

context("Details", () => {
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
    cy.get("#f1884b46-ecb4-473c-81f5-08d9bf2ab3bb").click({ force: true });
  });

  it("Should display '<Details />' correctly", () => {
    cy.get("#how-to-label").should("have.text", "How to Apply");
    cy.get("#details-title").should("have.text", "Cloud DevOps Engineer");
    cy.get("#full-time-indicator").should("have.text", "Full Time");
    cy.get("#details-company-name").should("have.text", "Cool Company");
  });

  it("Should be able to return to '<Search />'", () => {
    cy.get("#search").should("not.be.visible");

    cy.get("#back-to-search").click();
    cy.get("#search").should("be.visible");

    cy.get("#f1884b46-ecb4-473c-81f5-08d9bf2ab3bb").click({ force: true });
    cy.get("#search").should("not.be.visible");

    cy.get("header").click();
    cy.get("#search").should("be.visible");
  });
});
