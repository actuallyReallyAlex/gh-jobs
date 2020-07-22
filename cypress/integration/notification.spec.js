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
    cy.wait(1000);
  });

  it("Should reset the notification on initial load", () => {
    cy.get("#nav-login").click();
    cy.get("h1").should("have.text", "Login");
    cy.get("#email").type("bobtest@email.com");
    cy.get("#password").type("Red123456!!!");
    cy.get("#log-in").click();
    cy.wait(1500);
    cy.get("#nav-login").should("not.exist");
    cy.get("#search").should("be.visible");
    cy.get("#nav-profile").click();
    cy.get("#edit").click();
    cy.get("h1").should("have.text", "Edit Profile");
    cy.get("#edit-name").clear();
    cy.get("#edit-name").type("Cool Bob");
    cy.get("#edit-confirm").click();

    cy.wait(1500);

    cy.get("h1").should("have.text", "Profile");
    cy.get("#notification-text").should(
      "have.text",
      "Profile information updated successfully."
    );

    cy.reload();
    cy.get("#nav-profile").click();
    cy.get("#notification-text").should("not.exist");

    // * Reset to normal data (Cleanup)
    cy.get("#edit").click();
    cy.get("#notification-text").should("not.exist");
    cy.get("#edit-name").clear();
    cy.get("#edit-name").type("Bob Test");
    cy.get("#edit-confirm").click();
    cy.wait(1500);
    cy.get("h1").should("have.text", "Profile");
    cy.get("#name").should("have.value", "Bob Test");
    cy.get("#email").should("have.value", "bobtest@email.com");
  });
});
