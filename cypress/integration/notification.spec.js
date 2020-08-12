/// <reference types="cypress" />

context("Notification", () => {
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
  });

  it("Should reset the notification on initial load", () => {
    cy.get("#nav-login").click();
    cy.get("h1").should("have.text", "Login");
    cy.get("#email").type("bobtest@email.com");
    cy.get("#password").type("Red123456!!!");
    cy.get("#log-in").click();
    cy.wait(500);
    cy.get("#nav-login").should("not.exist");
    cy.get("#search").should("be.visible");
    cy.get("#nav-profile").click();
    cy.get("#edit-profile").click();
    cy.get("#name").clear();
    cy.get("#name").type("Cool Bob");
    cy.get("#edit-confirm").click();

    cy.wait(500);

    cy.get("#notification").should(
      "have.text",
      "Profile information updated successfully."
    );

    cy.reload();
    cy.get("#nav-profile").click();
    cy.get("#notification").should("not.exist");

    // * Reset to normal data (Cleanup)
    cy.get("#edit-profile").click();
    cy.get("#notification").should("not.exist");
    cy.get("#name").clear();
    cy.get("#name").type("Bob Test");
    cy.get("#edit-confirm").click();
    cy.wait(500);
    cy.get("#name").should("have.value", "Bob Test");
    cy.get("#email").should("have.value", "bobtest@email.com");
  });

  it("Should disappear after 5 seconds", () => {
    cy.get("#nav-login").click();
    cy.get("h1").should("have.text", "Login");
    cy.get("#email").type("bobtest@email.com");
    cy.get("#password").type("Red123456!!!");
    cy.get("#log-in").click();
    cy.wait(500);
    cy.get("#nav-login").should("not.exist");
    cy.get("#search").should("be.visible");
    cy.get("#nav-profile").click();
    cy.get("#edit-profile").click();
    cy.get("#name").clear();
    cy.get("#name").type("Cool Bob");
    cy.get("#edit-confirm").click();

    cy.wait(500);

    cy.get("#notification").should(
      "have.text",
      "Profile information updated successfully."
    );
    cy.wait(5000);
    cy.get("#notification").should("not.exist");

    // * Reset to normal data (Cleanup)
    cy.get("#edit-profile").click();
    cy.get("#name").clear();
    cy.get("#name").type("Bob Test");
    cy.get("#edit-confirm").click();
    cy.wait(500);
    cy.get("#name").should("have.value", "Bob Test");
    cy.get("#email").should("have.value", "bobtest@email.com");
  });
});
