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
    cy.get("#notification-text").should(
      "have.text",
      "Profile information updated successfully."
    );

    // * Reset to normal data (Cleanup)
    cy.get("#edit").click();
    cy.get("#notification-text").should("not.exist");
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
    cy.get("#notification-text").should("not.exist");
    cy.get("#name").should("have.value", "Bob Test");
    cy.get("#email").should("have.value", "bobtest@email.com");
  });

  it("Should not allow to submit edit profile form if information is not changed", () => {
    cy.get("#edit").click();
    cy.get("h1").should("have.text", "Edit Profile");
    cy.get("#edit-confirm").should("be.disabled");
  });

  it("Should not allow to submit edit profile form if information is blank", () => {
    cy.get("#edit").click();
    cy.get("h1").should("have.text", "Edit Profile");
    cy.get("#edit-name").clear();
    cy.get("#edit-email").clear();
    cy.get("#edit-confirm").should("be.disabled");
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
    cy.get("#notification-text").should("have.text", "Invalid email.");

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
    cy.get("#notification-text").should(
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
    cy.get("#notification-text").should(
      "have.text",
      "Password reset successfully."
    );
  });

  it("Should not allow to submit reset password form if information is not changed", () => {
    cy.get("#reset-password").click();
    cy.get("h1").should("have.text", "Reset Password");
    cy.get("#reset").should("be.disabled");
  });

  it("Should not allow to submit reset password form if information is blank", () => {
    cy.get("#reset-password").click();
    cy.get("h1").should("have.text", "Reset Password");
    cy.get("#current-password").clear();
    cy.get("#new-password").clear();
    cy.get("#confirm-new-password").clear();
    cy.get("#reset").should("be.disabled");
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
    cy.get("#notification-text").should("have.text", "Invalid credentials.");
  });

  it("Should not be able to reset password if passwords do not match", () => {
    cy.get("#reset-password").click();
    cy.get("h1").should("have.text", "Reset Password");
    cy.get("#current-password").type("Red123456!!!");
    cy.get("#new-password").type("Blue123456!!!");
    cy.get("#confirm-new-password").type("Yellow123456!!!");
    cy.get("#reset").click();

    cy.wait(1500);

    cy.get("h1").should("have.text", "Reset Password");
    cy.get("#notification-text").should("have.text", "Passwords do not match.");
  });

  it("Should be able to log out on this device", () => {
    cy.get("#log-out").click();
    cy.get("#nav-login").should("exist");
    cy.get("#search").should("be.visible");
  });

  it("Should be able to log out on all devices", () => {
    cy.get("#log-out-all").click();
    cy.get("#nav-login").should("exist");
    cy.get("#search").should("be.visible");
  });
});
