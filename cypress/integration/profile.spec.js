/// <reference types="cypress" />

context("Profile", () => {
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
    cy.get("#nav-login").click();
    cy.get("#email").type("bobtest@email.com");
    cy.get("#password").type("Red123456!!!");
    cy.get("#log-in").click();
    cy.wait(1500);

    cy.get("#nav-login").should("not.exist");
    cy.get("#nav-profile").should("be.visible");
    cy.get("#search").should("be.visible");
    cy.get("#nav-profile").click();
  });

  it("Should display 'Profile' page", () => {
    cy.get("h1").should("have.text", "Profile");
    cy.get("#name").should("have.value", "Bob Test");
    cy.get("#email").should("have.value", "bobtest@email.com");
  });

  it("Should be able to edit the user profile", () => {
    cy.get("#edit").click();
    cy.get("h1").should("have.text", "Edit Profile");
    cy.get("#edit-name").clear();
    cy.get("#edit-name").type("Cool Name");
    cy.get("#edit-email").clear();
    cy.get("#edit-email").type("bobtest2@email.com");
    cy.get("#edit-confirm").click();

    cy.wait(1500);

    cy.get("h1").should("have.text", "Profile");
    cy.get("#form-error-text").should(
      "have.text",
      "Profile information updated successfully."
    );

    // * Reset to normal data (Cleanup)
    cy.get("#edit").click();
    cy.get("#form-error-text").should("not.exist");
    cy.get("#edit-name").clear();
    cy.get("#edit-name").type("Bob Test");
    cy.get("#edit-email").clear();
    cy.get("#edit-email").type("bobtest@email.com");
    cy.get("#edit-confirm").click();
    cy.wait(1500);
    cy.get("h1").should("have.text", "Profile");
    cy.get("#name").should("have.value", "Bob Test");
    cy.get("#email").should("have.value", "bobtest@email.com");
  });

  it("Should be able to cancel editing the user profile", () => {
    cy.get("#edit").click();
    cy.get("h1").should("have.text", "Edit Profile");
    cy.get("#edit-name").clear();
    cy.get("#edit-name").type("Cool Name");
    cy.get("#edit-email").clear();
    cy.get("#edit-email").type("bobtest2@email.com");

    // * Cancel
    cy.get("#cancel").click();

    cy.get("h1").should("have.text", "Profile");
    cy.get("#form-error-text").should("not.exist");
    cy.get("#name").should("have.value", "Bob Test");
    cy.get("#email").should("have.value", "bobtest@email.com");
  });

  it("Should not allow to set newEmail to an invalid email", () => {
    cy.get("#edit").click();
    cy.get("h1").should("have.text", "Edit Profile");
    cy.get("#edit-name").clear();
    cy.get("#edit-name").type("Cool Name");
    cy.get("#edit-email").type("bobtest2@email.com");
    cy.get("#edit-confirm").click();

    cy.wait(1500);

    cy.get("h1").should("have.text", "Edit Profile");
    cy.get("#form-error-text").should("have.text", "Invalid email.");

    cy.get("#cancel").click();
  });

  it("Should be able to reset the password", () => {
    cy.get("#reset-password").click();
    cy.get("h1").should("have.text", "Reset Password");
    cy.get("#current-password").type("Red123456!!!");
    cy.get("#new-password").type("Blue123456!!!");
    cy.get("#confirm-new-password").type("Blue123456!!!");
    cy.get("#reset").click();

    cy.wait(1500);

    cy.get("h1").should("have.text", "Profile");
    cy.get("#form-error-text").should(
      "have.text",
      "Password reset successfully."
    );

    // * Reset to normal data (Cleanup)
    cy.get("#reset-password").click();
    cy.get("h1").should("have.text", "Reset Password");
    cy.get("#current-password").type("Blue123456!!!");
    cy.get("#new-password").type("Red123456!!!");
    cy.get("#confirm-new-password").type("Red123456!!!");
    cy.get("#reset").click();
    cy.get("h1").should("have.text", "Profile");
    cy.get("#form-error-text").should(
      "have.text",
      "Password reset successfully."
    );
  });

  it("Should not be able to reset password when using invalid credentials", () => {
    cy.get("#reset-password").click();
    cy.get("h1").should("have.text", "Reset Password");
    cy.get("#current-password").type("Blue123456!!!");
    cy.get("#new-password").type("Red123456!!!");
    cy.get("#confirm-new-password").type("Red123456!!!");
    cy.get("#reset").click();

    cy.wait(1500);

    cy.get("h1").should("have.text", "Reset Password");
    cy.get("#form-error-text").should("have.text", "Invalid credentials.");
  });
});
