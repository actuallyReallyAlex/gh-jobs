/// <reference types="cypress" />

context("Visual Regression - Search", () => {
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
  });

  it("Should match 'Search' page", () => {
    cy.visit("http://localhost:3000");
    cy.wait(1000).then(() => {
      cy.document().toMatchImageSnapshot({
        name: "search",
        threshold: 0.10,
      });
    });
  });
});

context("Visual Regression - Details", () => {
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
  });

  it("Should match 'Details' page", () => {
    cy.visit("http://localhost:3000");
    cy.wait(1000);
    cy.get("#f1884b46-ecb4-473c-81f5-08d9bf2ab3bb")
      .click({ force: true })
      .then(() => {
        cy.document().toMatchImageSnapshot({
          name: "details",
          threshold: 0.10,
        });
      });
  });
});

context("Visual Regression - Login", () => {
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
  });

  it("Should match 'Login' page", () => {
    cy.visit("http://localhost:3000");
    cy.wait(1000);
    cy.get("#nav-login")
      .click()
      .then(() => {
        cy.document().toMatchImageSnapshot({
          name: "login",
          threshold: 0.10,
        });
      });
  });
});

context("Visual Regression - Signup", () => {
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
  });

  it("Should match 'Signup' page", () => {
    cy.visit("http://localhost:3000");
    cy.wait(1000);
    cy.get("#nav-login").click();
    cy.get("#create-an-account")
      .click()
      .then(() => {
        cy.document().toMatchImageSnapshot({
          name: "signup",
          threshold: 0.10,
        });
      });
  });
});

context("Visual Regression - Profile", () => {
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
  });

  it("Should match 'Profile' page", () => {
    cy.visit("http://localhost:3000");
    cy.wait(1000);
    cy.get("#nav-login").click();
    cy.get("#email").type("bobtest@email.com");
    cy.get("#password").type("Red123456!!!");
    cy.get("#log-in").click();
    cy.wait(1000);
    cy.get("#nav-profile")
      .click()
      .then(() => {
        cy.document().toMatchImageSnapshot({
          name: "profile",
          threshold: 0.10,
        });
      });
  });
});
