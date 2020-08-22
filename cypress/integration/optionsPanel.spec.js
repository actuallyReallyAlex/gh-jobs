/// <reference types="cypress" />

context("Options Panel", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
  });

  it("Should retain FullTime state", () => {
    cy.get('input[name="full-time-checkbox"]').should("not.be.checked");
    cy.get(":nth-child(1) > [data-cy=checkmark]").click();
    cy.get("#search").type("developer");
    cy.get("#search-submit").click();
    cy.wait(1000);
    cy.reload();
    cy.get('input[name="full-time-checkbox"]').should("be.checked");
  });

  it("Should retain location search value", () => {
    cy.get("#location-search").should("have.value", "");
    cy.get("#location-search").type("Los Angeles");
    cy.get("#search-submit").click();
    cy.get("#location-search").should("have.value", "Los Angeles");
  });

  it("Should retain options values", () => {
    cy.get("#location-1").should("not.be.checked");
    cy.get(":nth-child(4) > [data-cy=checkmark]").click();
    cy.get("#location-1").should("be.checked");
    cy.get("#search-submit").click();
    cy.get("#location-1").should("be.checked");
  });

  it("Should filter with fullTime correctly", () => {
    cy.get("#search").type("developer");
    cy.get("#search-submit").click();

    cy.get("#notification").should("have.text", "Search returned 30 results.");

    cy.get(":nth-child(1) > [data-cy=checkmark]").click();
    cy.get("#search-submit").click();

    cy.get("#notification").should("have.text", "Search returned 17 results.");
  });

  it("Should filter with contract correctly", () => {
    cy.get("#search").type("developer");
    cy.get("#search-submit").click();

    cy.get("#notification").should("have.text", "Search returned 30 results.");

    cy.get(":nth-child(2) > [data-cy=checkmark]").click();
    cy.get("#search-submit").click();

    cy.get("#notification").should("have.text", "Search returned 13 results.");
  });

  it("Should be able to search within the OptionsPanel", () => {
    cy.get("#location-search").type("Los Angeles");
    cy.get("#options-panel-search").click();

    cy.get("#notification").should("have.text", "Search returned 5 results.");
  });
});
