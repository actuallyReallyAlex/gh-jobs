/// <reference types="cypress" />

context("Search", () => {
  beforeEach(() => {
    cy.fixture("jobs50").then((jobsJson) => {
      cy.fixture("jobsSearch1").then((searchJson) => {
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
          url:
            "/jobs/search?userId=&full_time=false&contract=false&description=developer",
          status: 200,
          response: searchJson,
          delay: 1000,
        });
      });
    });
    cy.visit("http://localhost:3000");
  });

  it("Should search correctly", () => {
    cy.get('[data-cy="job-container"]').then(($jobs) => {
      assert.equal($jobs.length, 5);
    });
    cy.get("#search").type("developer");
    cy.get("#search-submit").click();
    cy.wait(1000);
    cy.get('[data-cy="job-container"]').then(($jobs) => {
      assert.equal($jobs.length, 5);
    });
  });

  it("Should retain search value on reload", () => {
    cy.get("#search").type("developer");
    cy.get("#search-submit").click();
    cy.wait(1000);
    cy.reload();
    cy.get("#search").should("have.value", "developer");
  });

  it("Should be able to submit form with enter key", () => {
    cy.get('[data-cy="orbit-container"]').should("not.be.visible");
    cy.get("#search").type("developer");
    cy.get("#search").type("{enter}");
    cy.get('[data-cy="orbit-container"]').should("be.visible");
  });

  // ! Unable to do with current implementation
  // * If you don't stub it, the real db may not contain that job listing anymore
  // * If you do stub it, you can't conditionally send a smaller list of jobs each time it hits /user/hiddenJobDetails
  it.skip("Should not display hidden jobs in currentJobs on search", () => {
    // * Hide a job
    cy.get("#hide-job-f1884b46-ecb4-473c-81f5-08d9bf2ab3bb").click();
    // * Log User out
    cy.get("#nav-profile").click();
    cy.get("#settings").click();
    cy.get("#log-out").click();

    cy.get("#f1884b46-ecb4-473c-81f5-08d9bf2ab3bb").should("exist");

    // * Log In
    cy.get("#nav-login").click();
    cy.get("#email").type("bobtest@email.com");
    cy.get("#password").type("Red123456!!!");
    cy.get("#log-in").click();
    cy.wait(500);

    cy.get("#f1884b46-ecb4-473c-81f5-08d9bf2ab3bb").should("not.exist");

    // * Do search
  });

  it("Should reset search values on reload", () => {
    cy.get("#search").type("Search value");
    cy.get("#location-search").type("Location search value");

    cy.reload();

    cy.get("#search").should("have.value", "");
    cy.get("#location-search").should("have.value", "");
  });
});

context("Search - No Results", () => {
  beforeEach(() => {
    cy.server();
    cy.route({
      method: "POST",
      url: "/jobs",
      status: 200,
      response: [],
      delay: 1000,
    });
    cy.route({
      method: "GET",
      url:
        "/jobs/search?userId=&full_time=false&contract=false&description=developer",
      status: 200,
      response: [],
      delay: 1000,
    });
    cy.visit("http://localhost:3000");
  });

  it("Should display note when there are no results", () => {
    cy.get("#search").type("developer");
    cy.get("#search-submit").click();
    cy.wait(1000);
    cy.get("#no-results").should(
      "have.text",
      "No results. Please modify your search and try again."
    );
  });
});

context("Search - Loading Indicator", () => {
  beforeEach(() => {
    cy.fixture("jobs50").then((jobsJson) => {
      cy.server();
      cy.route({
        method: "POST",
        url: "/jobs",
        status: 200,
        response: jobsJson,
        delay: 3000,
      });
    });
  });

  it("Should display LoadingIndicator correctly on jobs loading", () => {
    cy.visit("http://localhost:3000");
    cy.get("#no-results").should("be.visible");
    cy.get("[data-cy=orbit-container] > :nth-child(3)").should("be.visible");

    cy.wait(3100);

    cy.get("#no-results").should("not.be.visible");
    cy.get("[data-cy=orbit-container] > :nth-child(3)").should(
      "not.be.visible"
    );
  });
});
