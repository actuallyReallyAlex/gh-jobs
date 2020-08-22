/// <reference types="cypress" />

context("Authentication", () => {
  beforeEach(() => {
    // * Login
    cy.visit("http://localhost:3000");
    cy.get("#nav-login").click();
    cy.get("h1").should("have.text", "Login");
    cy.get("#email").type("bobtest@email.com");
    cy.get("#password").type("Red123456!!!");
    cy.get("#log-in").click();
    cy.get("#nav-login").should("not.exist");
    cy.get("#search").should("be.visible");
  });

  it("Should redirect to '/login' when user attempts to edit profile information after becoming unauthenticated", () => {
    // * Remove authentication cookie
    cy.clearCookie("ghjobs");

    // * Click View Profile
    cy.get("#nav-profile").click();

    // * Attempt to Edit Profile Info
    cy.get("#edit-profile").click();
    cy.get("#name").clear();
    cy.get("#name").type("Cool Name");
    cy.get("#email").clear();
    cy.get("#email").type("bobtest2@email.com");
    cy.get("#edit-confirm").click();

    // * Assert Redirect
    cy.get("#notification").should("have.text", "Please authenticate.");
    cy.url().should("eq", "http://localhost:3000/login");
    cy.get("h1").should("have.text", "Login");
  });

  it("Should redirect to '/login' when user attempts to delete their profile after becoming unauthenticated", () => {
    // * Remove authentication cookie
    cy.clearCookie("ghjobs");

    // * Click View Profile
    cy.get("#nav-profile").click();

    // * Attempt to Delete Profile
    cy.get("#settings").click();
    cy.get("#delete-profile").click();
    cy.get("#modal-title").should("have.text", "Delete Profile");
    cy.get("#notification").should(
      "have.text",
      "Are you sure you would like to delete your profile? This can not be reversed."
    );
    cy.get("#delete-profile-confirm").click();

    // * Assert Redirect
    cy.get("#notification").should("have.text", "Please authenticate.");
    cy.url().should("eq", "http://localhost:3000/login");
    cy.get("h1").should("have.text", "Login");
  });

  it("Should redirect to '/login' when user attempts to reset their password after becoming unauthenticated", () => {
    // * Remove authentication cookie
    cy.clearCookie("ghjobs");

    // * Click View Profile
    cy.get("#nav-profile").click();

    // * Attempt to Reset Password
    cy.get("#settings").click();
    cy.get("#reset-password").click();
    cy.get("#modal-title").should("have.text", "Reset Password");
    cy.get("#current-password").type("Red123456!!!");
    cy.get("#new-password").type("Blue123456!!!");
    cy.get("#confirm-new-password").type("Blue123456!!!");
    cy.get("#reset").click();

    // * Assert Redirect
    cy.get("#notification").should("have.text", "Please authenticate.");
    cy.url().should("eq", "http://localhost:3000/login");
    cy.get("h1").should("have.text", "Login");
  });

  it("Should handle log out normally when user attempts to log out after becoming unauthenticated", () => {
    // * Remove authentication cookie
    cy.clearCookie("ghjobs");

    // * Click View Profile
    cy.get("#nav-profile").click();

    // * Attempt to Log Out
    cy.get("#settings").click();
    cy.get("#log-out").click();

    // * Assert Log Out
    cy.get("#nav-login").should("exist");
    cy.get("#search").should("be.visible");
  });

  it("Should handle log out all normally when user attempts to log out all after becoming unauthenticated", () => {
    // * Remove authentication cookie
    cy.clearCookie("ghjobs");

    // * Click View Profile
    cy.get("#nav-profile").click();

    // * Attempt to Log Out All
    cy.get("#settings").click();
    cy.get("#log-out-all").click();

    // * Assert Log Out
    cy.get("#nav-login").should("exist");
    cy.get("#search").should("be.visible");
  });

  it("Should redirect to '/login' when user attempts to show a hidden job on their profile after becoming unauthenticated", () => {
    cy.get("#hide-job-7").click();

    cy.get("#nav-profile").click();
    cy.get("#view-hidden-jobs").click();

    // * Remove authentication cookie
    cy.clearCookie("ghjobs");

    cy.get("#show-job-7").click();

    // * Assert Redirect
    cy.get("#notification").should("have.text", "Please authenticate.");
    cy.url().should("eq", "http://localhost:3000/login");
    cy.get("h1").should("have.text", "Login");

    // * Cleanup
    cy.get("#email").type("bobtest@email.com");
    cy.get("#password").type("Red123456!!!");
    cy.get("#log-in").click();
    cy.get("#nav-profile").click();
    cy.get("#view-hidden-jobs").click();
    cy.get("#show-job-7").click();
  });

  it("Should redirect to '/login' when user attempts to hide a saved job on their profile after becoming unauthenticated", () => {
    cy.get("#save-job-7").click();

    cy.get("#nav-profile").click();
    cy.get("#view-saved-jobs").click();

    // * Remove authentication cookie
    cy.clearCookie("ghjobs");

    cy.get("#remove-job-7").click();

    // * Assert Redirect
    cy.get("#notification").should("have.text", "Please authenticate.");
    cy.url().should("eq", "http://localhost:3000/login");
    cy.get("h1").should("have.text", "Login");

    // * Cleanup
    cy.get("#email").type("bobtest@email.com");
    cy.get("#password").type("Red123456!!!");
    cy.get("#log-in").click();
    cy.get("#nav-profile").click();
    cy.get("#view-saved-jobs").click();
    cy.get("#remove-job-7").click();
  });
});

context("Authentication - Search Page", () => {
  beforeEach(() => {
    // * Login
    cy.visit("http://localhost:3000");
    cy.get("#nav-login").click();
    cy.get("h1").should("have.text", "Login");
    cy.get("#email").type("bobtest@email.com");
    cy.get("#password").type("Red123456!!!");
    cy.get("#log-in").click();
    cy.get("#nav-login").should("not.exist");
    cy.get("#search").should("be.visible");
  });

  it("Should redirect to '/login' when user attempts to save a job after becoming unauthenticated", () => {
    // * Remove authentication cookie
    cy.clearCookie("ghjobs");

    // * Click Save Job
    cy.get("#save-job-7").click();

    // * Assert Redirect
    cy.get("#notification").should("have.text", "Please authenticate.");
    cy.url().should("eq", "http://localhost:3000/login");
    cy.get("h1").should("have.text", "Login");
  });

  it("Should redirect to '/login' when user attempts to hide a job after becoming unauthenticated", () => {
    // * Remove authentication cookie
    cy.clearCookie("ghjobs");

    // * Click Save Job
    cy.get("#hide-job-7").click();

    // * Assert Redirect
    cy.get("#notification").should("have.text", "Please authenticate.");
    cy.url().should("eq", "http://localhost:3000/login");
    cy.get("h1").should("have.text", "Login");
  });
});

context("Authentication - Details Page", () => {
  beforeEach(() => {
    // * Login
    cy.visit("http://localhost:3000");
    cy.get("#nav-login").click();
    cy.get("h1").should("have.text", "Login");
    cy.get("#email").type("bobtest@email.com");
    cy.get("#password").type("Red123456!!!");
    cy.get("#log-in").click();
    cy.get("#nav-login").should("not.exist");
    cy.get("#search").should("be.visible");
  });

  it("Should redirect to '/login' when user attempts to save a job after becoming unauthenticated", () => {
    cy.get("#\\37").click({ force: true });

    // * Remove authentication cookie
    cy.clearCookie("ghjobs");

    // * Click Save Job
    cy.get("#save-job-7").click();

    // * Assert Redirect
    cy.get("#notification").should("have.text", "Please authenticate.");
    cy.url().should("eq", "http://localhost:3000/login");
    cy.get("h1").should("have.text", "Login");
  });

  it("Should redirect to '/login' when user attempts to hide a job after becoming unauthenticated", () => {
    cy.get("#\\37").click({ force: true });

    // * Remove authentication cookie
    cy.clearCookie("ghjobs");

    // * Click Save Job
    cy.get("#hide-job-7").click();

    // * Assert Redirect
    cy.get("#notification").should("have.text", "Please authenticate.");
    cy.url().should("eq", "http://localhost:3000/login");
    cy.get("h1").should("have.text", "Login");
  });
});
