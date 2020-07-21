/// <reference types="cypress" />

context("Profile", () => {
  beforeEach(() => {
    cy.fixture("jobs50").then((jobsJson) => {
      cy.fixture("login").then((loginJson) => {
        cy.server();
        cy.route({
          method: "GET",
          url: "/jobs",
          status: 200,
          response: jobsJson,
          delay: 1000,
        });
        cy.route({
          method: "POST",
          url: "/user/login",
          status: 200,
          response: loginJson,
          delay: 1000,
        });
      });
    });
    cy.visit("http://localhost:3000");
    cy.get("#nav-login").click();
    cy.get("#email").type("bobtest@email.com");
    cy.get("#password").type("Red123456!!!");
    cy.get("#log-in").click();
    cy.wait(1500);

    cy.get("#nav-login").should("not.exist");
    cy.get("#nav-profile").should("be.visible");
    cy.get("#search").should("be.visible");
  });

  it("Should display 'Profile' page", () => {
    cy.get("#nav-profile").click();
    cy.get("h1").should("have.text", "Profile");
  });
});
