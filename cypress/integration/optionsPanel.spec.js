/// <reference types="cypress" />

context("Options Panel", () => {
  beforeEach(() => {
    cy.fixture("jobs50").then((jobsJson) => {
      cy.fixture("jobsSearch1").then((jobsSearch1Json) => {
        cy.server();
        cy.route({
          method: "GET",
          url: "/jobs",
          status: 200,
          response: jobsJson,
        });
        cy.route({
          method: "GET",
          url: "/jobs/search?full_time=true&description=developer",
          status: 200,
          delay: 1000,
          response: jobsSearch1Json,
        });
        cy.route({
          method: "GET",
          url: "/jobs/search?full_time=false&description=&location=Los Angeles",
          status: 200,
          delay: 1000,
          response: jobsSearch1Json,
        });
        cy.route({
          method: "GET",
          url: "/jobs/search?full_time=false&description=&location=Chicago",
          status: 200,
          delay: 1000,
          response: jobsSearch1Json,
        });
        cy.route({
          method: "GET",
          url: "/jobs/search?full_time=false&description=developer",
          status: 200,
          delay: 1000,
          response: jobsSearch1Json,
        });
      });
    });
    cy.visit("http://localhost:3000");
  });

  it("Should retain FullTime state", () => {
    cy.get(
      "#app > div.search__container > div.options-panel__container > label:nth-child(1) > input[type=checkbox]"
    ).should("not.be.checked");
    cy.get(
      "#app > div.search__container > div.options-panel__container > label:nth-child(1) > span"
    ).click();
    cy.get("#search").type("developer");
    cy.get("#search-submit").click();
    cy.wait(1000);
    cy.reload();
    cy.get(
      "#app > div.search__container > div.options-panel__container > label:nth-child(1) > input[type=checkbox]"
    ).should("be.checked");
  });

  it("Should retain location search value", () => {
    cy.get("#location-search").should("have.value", "");
    cy.get("#location-search").type("Los Angeles");
    cy.get("#search-submit").click();
    cy.wait(1000);
    cy.get("#location-search").should("have.value", "Los Angeles");
  });

  it("Should retain options values", () => {
    cy.get("#location-1").should("not.be.checked");
    cy.get(
      "#app > div.search__container > div.options-panel__container > label:nth-child(3) > span"
    ).click();
    cy.get("#location-1").should("be.checked");
    cy.get("#search-submit").click();
    cy.wait(1000);
    cy.get("#location-1").should("be.checked");
  });

  it("Should filter with fullTime correctly", () => {
    cy.get("#search").type("developer");
    cy.get("#search-submit").click();

    cy.wait(1500);
    cy.get(".jobcard__container").then(($jobs) => {
      assert.equal($jobs.length, 5);
    });

    cy.get(
      "#app > div.search__container > div.options-panel__container > label:nth-child(1) > span"
    ).click();
    cy.get("#search-submit").click();

    cy.wait(1500);
    cy.get(".jobcard__container").then(($jobs) => {
      assert.equal($jobs.length, 2);
    });
  });
});
