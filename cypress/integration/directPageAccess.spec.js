/// <reference types="cypress" />

context("Details", () => {
  beforeEach(() => {
    cy.fixture("jobs50").then((jobsJson) => {
      cy.server();
      cy.route({
        method: "POST",
        url: "/jobs",
        status: 200,
        response: jobsJson,
        delay: 1000,
      });
    });
  });

  it("Should be able to access '/login/ directly", () => {
    cy.visit("http://localhost:3000/login");
    cy.wait(500);

    cy.get("h1").should("have.text", "Login");
  });

  it("Should be able to access '/signup/ directly", () => {
    cy.visit("http://localhost:3000/signup");
    cy.wait(500);

    cy.get("h1").should("have.text", "Create Account");
  });

  it("Should be able to access '/jobs/:id' directly", () => {
    cy.visit("http://localhost:3000/jobs/f1884b46-ecb4-473c-81f5-08d9bf2ab3bb");
    cy.wait(500);

    cy.get("h2").should("have.text", "Cloud DevOps Engineer");
  });
});
