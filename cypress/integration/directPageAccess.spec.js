/// <reference types="cypress" />

context("Direct Page Access", () => {
  it("Should be able to access '/login/ directly", () => {
    cy.visit("http://localhost:3000/login");
    cy.get("h1").should("have.text", "Login");
  });

  it("Should be able to access '/signup/ directly", () => {
    cy.visit("http://localhost:3000/signup");
    cy.get("h1").should("have.text", "Create Account");
  });

  it("Should be able to access '/jobDetails/:id' directly", () => {
    cy.visit("http://localhost:3000/jobDetails/7");
    cy.get("h2").should("have.text", "Software Engineer");
  });
});
