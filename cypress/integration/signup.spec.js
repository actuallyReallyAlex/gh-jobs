/// <reference types="cypress" />

context("Signup - Success", () => {
  beforeEach(() => {
    cy.fixture("jobs50").then((jobsJson) => {
      cy.fixture("signup").then((signupJson) => {
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
          url: "/user",
          status: 200,
          response: signupJson,
          delay: 1000,
        });
      });
    });
    cy.visit("http://localhost:3000");
    cy.wait(1000);
    cy.get("#nav-login").click();
    cy.get("h1").should("have.text", "Login");
    cy.get("#create-an-account").click();
    cy.get("h1").should("have.text", "Create Account");
    cy.get("#nav-login").should("be.visible");
  });

  it("Should be able to sign up a new account", () => {
    cy.get("#name").type("Bob Test");
    cy.get("#email").type("bobtest@email.com");
    cy.get("#password").type("Red123456!!!");
    cy.get("#confirm-password").type("Red123456!!!");
    cy.get("#signup").click();
    cy.wait(1500);
    cy.get("#nav-login").should("not.exist");
    // TODO - Make user go back to `Search`
  });

  it("Should be able to get to Login from Signup page", () => {
    cy.get("#nav-login").click();
    cy.get("h1").should("have.text", "Login");
  });
});

context("Signup - Error", () => {
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
    cy.get("#nav-login").click();
    cy.get("h1").should("have.text", "Login");
    cy.get("#create-an-account").click();
    cy.get("h1").should("have.text", "Create Account");
    cy.get("#nav-login").should("be.visible");
  });

  // TODO - Fix this. Should not be able to do this.
  it.skip("Should not allow to signup with existing account", () => {
    cy.get("#name").type("Bob Test");
    cy.get("#email").type("bobtest@email.com");
    cy.get("#password").type("Red123456!!!");
    cy.get("#confirm-password").type("Red123456!!!");
    cy.get("#signup").click();
    cy.wait(1500);
    cy.pause();
  });

  it("Should not allow submission of an empty form", () => {
    cy.get("#signup").click();
    cy.get("#nav-login").should("be.visible");

    cy.get("#name").type("Bob Test");
    cy.get("#signup").click();
    cy.get("#nav-login").should("be.visible");

    cy.get("#email").type("bobtest@email.com");
    cy.get("#signup").click();
    cy.get("#nav-login").should("be.visible");

    cy.get("#password").type("Red123456!!!");
    cy.get("#signup").click();
    cy.get("#nav-login").should("be.visible");
  });

  it("Should not allow an invalid email", () => {
    cy.get("#name").type("Bob Test");
    cy.get("#email").type("email.@example.com");
    cy.get("#password").type("Red123456!");
    cy.get("#confirm-password").type("Red123456!");
    cy.get("#signup").click();

    cy.get("#form-error-text").should("have.text", "Email is invalid.");
  });

  it("Should not allow password to be less than 7 characters long", () => {
    cy.get("#name").type("Bob Test");
    cy.get("#email").type("bobtest2@email.com");
    cy.get("#password").type("Red1!");
    cy.get("#confirm-password").type("Red1!");
    cy.get("#signup").click();

    cy.get("#form-error-text").should(
      "have.text",
      "Password must be a minimum of 7 characters."
    );
  });

  it("Should not allow password to contain the string 'password'", () => {
    cy.get("#name").type("Bob Test");
    cy.get("#email").type("bobtest2@email.com");
    cy.get("#password").type("Redpassword123!");
    cy.get("#confirm-password").type("Redpassword123!");
    cy.get("#signup").click();

    cy.get("#form-error-text").should(
      "have.text",
      `Password can't contain the string "password".`
    );
  });

  it("Should not allow password to not contain at least 1 uppercase letter", () => {
    cy.get("#name").type("Bob Test");
    cy.get("#email").type("bobtest2@email.com");
    cy.get("#password").type("red123456!");
    cy.get("#confirm-password").type("red123456!");
    cy.get("#signup").click();

    cy.get("#form-error-text").should(
      "have.text",
      `Password should contain at least 1 uppercase letter.`
    );
  });

  it("Should not allow password to not contain at least 1 lowercase letter", () => {
    cy.get("#name").type("Bob Test");
    cy.get("#email").type("bobtest2@email.com");
    cy.get("#password").type("RED123456!");
    cy.get("#confirm-password").type("RED123456!");
    cy.get("#signup").click();

    cy.get("#form-error-text").should(
      "have.text",
      `Password should contain at least 1 lowercase letter.`
    );
  });

  it("Should not allow password to not contain at least 1 number", () => {
    cy.get("#name").type("Bob Test");
    cy.get("#email").type("bobtest2@email.com");
    cy.get("#password").type("RedRedRed!");
    cy.get("#confirm-password").type("RedRedRed!");
    cy.get("#signup").click();

    cy.get("#form-error-text").should(
      "have.text",
      "Password should contain at least 1 number."
    );
  });

  it("Should not allow password to not contain at least 1 special character", () => {
    cy.get("#name").type("Bob Test");
    cy.get("#email").type("bobtest2@email.com");
    cy.get("#password").type("Red123456");
    cy.get("#confirm-password").type("Red123456");
    cy.get("#signup").click();

    cy.get("#form-error-text").should(
      "have.text",
      "Password should contain at least 1 special character."
    );
  });
});
