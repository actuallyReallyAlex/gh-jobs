/// <reference types="cypress" />

context("Options Panel", () => {
  beforeEach(() => {
    cy.fixture("jobs50").then((jobsJson) => {
      cy.fixture("jobsSearch1").then((jobsSearch1Json) => {
        cy.fixture("jobsSearch2").then((jobsSearch2Json) => {
          cy.fixture("jobsSearch3").then((jobsSearch3Json) => {
            cy.server();
            cy.route({
              method: "POST",
              url: "/jobs",
              status: 200,
              response: jobsJson,
            });
            cy.route({
              method: "GET",
              url:
                "/jobs/search?full_time=true&contract=false&description=developer",
              status: 200,
              delay: 1000,
              response: jobsSearch2Json,
            });
            cy.route({
              method: "GET",
              url:
                "/jobs/search?full_time=false&contract=false&description=&location1=Los Angeles",
              status: 200,
              delay: 1000,
              response: jobsSearch1Json,
            });
            cy.route({
              method: "GET",
              url:
                "/jobs/search?full_time=false&contract=false&description=&location1=Chicago",
              status: 200,
              delay: 1000,
              response: jobsSearch1Json,
            });
            cy.route({
              method: "GET",
              url:
                "/jobs/search?full_time=false&contract=false&description=developer",
              status: 200,
              delay: 1000,
              response: jobsSearch1Json,
            });
            cy.route({
              method: "GET",
              url:
                "/jobs/search?full_time=false&contract=false&description=&location1=Los Angeles",
              status: 200,
              delay: 1000,
              response: jobsSearch1Json,
            });
            cy.route({
              method: "GET",
              url:
                "/jobs/search?full_time=false&contract=true&description=developer",
              status: 200,
              delay: 1000,
              response: jobsSearch3Json,
            });
          });
        });
      });
    });
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
    cy.wait(1000);
    cy.get("#location-search").should("have.value", "Los Angeles");
  });

  it("Should retain options values", () => {
    cy.get("#location-1").should("not.be.checked");
    cy.get(":nth-child(4) > [data-cy=checkmark]").click();
    cy.get("#location-1").should("be.checked");
    cy.get("#search-submit").click();
    cy.wait(1000);
    cy.get("#location-1").should("be.checked");
  });

  it("Should filter with fullTime correctly", () => {
    cy.get("#search").type("developer");
    cy.get("#search-submit").click();

    cy.wait(1000);
    cy.get('[data-cy="job-container"]').then(($jobs) => {
      assert.equal($jobs.length, 5);
    });

    cy.get(":nth-child(1) > [data-cy=checkmark]").click();
    cy.get("#search-submit").click();

    cy.wait(1000);
    cy.get('[data-cy="job-container"]').then(($jobs) => {
      assert.equal($jobs.length, 4);
    });
  });

  it("Should filter with contract correctly", () => {
    cy.get("#search").type("developer");
    cy.get("#search-submit").click();

    cy.wait(1000);
    cy.get('[data-cy="job-container"]').then(($jobs) => {
      assert.equal($jobs.length, 5);
    });

    cy.get(":nth-child(2) > [data-cy=checkmark]").click();
    cy.get("#search-submit").click();

    cy.wait(1000);
    cy.get('[data-cy="job-container"]').then(($jobs) => {
      assert.equal($jobs.length, 3);
    });
  });

  it("Should be able to search within the OptionsPanel", () => {
    cy.get("#location-search").type("Los Angeles");
    cy.get("#options-panel-search").click();
    cy.wait(1000);

    cy.get("#notification").should("have.text", "Search returned 7 results.");
  });
});
