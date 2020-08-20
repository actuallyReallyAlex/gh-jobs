/// <reference types="cypress" />

context("Authentication", () => {
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

    // * Login
    cy.visit("http://localhost:3000");
    cy.wait(1000);
    cy.get("#nav-login").click();
    cy.get("h1").should("have.text", "Login");
    cy.get("#email").type("bobtest@email.com");
    cy.get("#password").type("Red123456!!!");
    cy.get("#log-in").click();
    cy.wait(1000);
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

    cy.wait(500);

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

    cy.wait(500);

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

    cy.wait(500);

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

    cy.wait(500);

    // * Assert Log Out
    cy.get("#nav-login").should("exist");
    cy.get("#search").should("be.visible");
  });

  it.skip("Should handle log out all normally when user attempts to log out all after becoming unauthenticated", () => {
    // * Remove authentication cookie
    cy.clearCookie("ghjobs");

    // * Click View Profile
    cy.get("#nav-profile").click();

    // * Attempt to Log Out All
    cy.get("#settings").click();
    cy.get("#log-out-all").click();

    cy.wait(500);

    // * Assert Log Out
    cy.get("#nav-login").should("exist");
    cy.get("#search").should("be.visible");
  });

  // ! Can't implement this until you create a Test Database with Test Jobs
  it.skip("Should redirect to '/login' when user attempts to show a hidden job on their profile after becoming unauthenticated", () => {});

  // ! Can't implement this until you create a Test Database with Test Jobs
  it.skip("Should redirect to '/login' when user attempts to hide a saved job on their profile after becoming unauthenticated", () => {});
});

context.skip("Authentication - Search Page", () => {
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

    // * Login
    cy.visit("http://localhost:3000");
    cy.wait(1000);
    cy.get("#nav-login").click();
    cy.get("h1").should("have.text", "Login");
    cy.get("#email").type("bobtest@email.com");
    cy.get("#password").type("Red123456!!!");
    cy.get("#log-in").click();
    cy.wait(1000);
    cy.get("#nav-login").should("not.exist");
    cy.get("#search").should("be.visible");
  });

  it("Should redirect to '/login' when user attempts to save a job after becoming unauthenticated", () => {
    // * Remove authentication cookie
    cy.clearCookie("ghjobs");

    // * Click Save Job
    cy.get("#save-job-f1884b46-ecb4-473c-81f5-08d9bf2ab3bb").click();

    // * Assert Redirect
    cy.get("#notification").should("have.text", "Please authenticate.");
    cy.url().should("eq", "http://localhost:3000/login");
    cy.get("h1").should("have.text", "Login");
  });

  it("Should redirect to '/login' when user attempts to hide a job after becoming unauthenticated", () => {
    // * Remove authentication cookie
    cy.clearCookie("ghjobs");

    // * Click Save Job
    cy.get("#hide-job-f1884b46-ecb4-473c-81f5-08d9bf2ab3bb").click();

    // * Assert Redirect
    cy.get("#notification").should("have.text", "Please authenticate.");
    cy.url().should("eq", "http://localhost:3000/login");
    cy.get("h1").should("have.text", "Login");
  });
});

context.skip("Authentication - Details Page", () => {
  beforeEach(() => {
    cy.fixture("jobs50").then((jobsJson) => {
      cy.fixture("jobDetails").then((jobDetailsJson) => {
        cy.server();
        cy.route({
          method: "POST",
          url: "/jobs",
          status: 200,
          response: jobsJson,
          delay: 1000,
        });
        cy.route({
          method: "GET",
          url: "/jobs/f1884b46-ecb4-473c-81f5-08d9bf2ab3bb",
          status: 200,
          response: jobDetailsJson,
          delay: 1000,
        });
      });
    });

    // * Login
    cy.visit("http://localhost:3000");
    cy.wait(1000);
    cy.get("#nav-login").click();
    cy.get("h1").should("have.text", "Login");
    cy.get("#email").type("bobtest@email.com");
    cy.get("#password").type("Red123456!!!");
    cy.get("#log-in").click();
    cy.wait(1000);
    cy.get("#nav-login").should("not.exist");
    cy.get("#search").should("be.visible");
  });

  it("Should redirect to '/login' when user attempts to save a job after becoming unauthenticated", () => {
    cy.get("#f1884b46-ecb4-473c-81f5-08d9bf2ab3bb").click({ force: true });

    // * Remove authentication cookie
    cy.clearCookie("ghjobs");

    // * Click Save Job
    cy.get("#save-job-f1884b46-ecb4-473c-81f5-08d9bf2ab3bb").click();

    // * Assert Redirect
    cy.get("#notification").should("have.text", "Please authenticate.");
    cy.url().should("eq", "http://localhost:3000/login");
    cy.get("h1").should("have.text", "Login");
  });

  it("Should redirect to '/login' when user attempts to hide a job after becoming unauthenticated", () => {
    cy.get("#f1884b46-ecb4-473c-81f5-08d9bf2ab3bb").click({ force: true });

    // * Remove authentication cookie
    cy.clearCookie("ghjobs");

    // * Click Save Job
    cy.get("#hide-job-f1884b46-ecb4-473c-81f5-08d9bf2ab3bb").click();

    // * Assert Redirect
    cy.get("#notification").should("have.text", "Please authenticate.");
    cy.url().should("eq", "http://localhost:3000/login");
    cy.get("h1").should("have.text", "Login");
  });
});
