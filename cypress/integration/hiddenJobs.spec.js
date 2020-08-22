/// <reference types="cypress" />

context("Hidden Jobs", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
    cy.get("#nav-login").click();
    cy.get("h1").should("have.text", "Login");
    cy.get("#email").type("bobtest@email.com");
    cy.get("#password").type("Red123456!!!");
    cy.get("#log-in").click();

    cy.get("#nav-login").should("not.exist");
    cy.get("#search").should("be.visible");
  });

  it("Should be able to hide a job from the 'Search' page", () => {
    cy.get("#hide-job-7").its("data").should("be", '{ cy: "deselected" }');
    cy.get("#hide-job-7").click();
    cy.get("#notification").should("have.text", "Job hidden successfully.");
    cy.get("#notification > button").click();

    // * Cleanup
    cy.get("#nav-profile").click();
    cy.get("#view-hidden-jobs").click();
    cy.get("#show-job-7").click();
    cy.get("#notification").should("have.text", "Job shown successfully.");
    cy.get("#notification > button").click();
  });

  it("Should be able to hide a job from the 'Details' page", () => {
    cy.get("#\\37").click({ force: true });

    cy.get("#hide-job-7").its("data").should("be", "{cy: 'deselected'}");
    cy.get("#hide-job-7").click();
    cy.get("#show-job-7").its("data").should("be", "{ cy: 'selected' }");
    cy.get("#notification").should("have.text", "Job hidden successfully.");
    cy.get("#notification > button").click();

    // * Cleanup
    cy.get("#show-job-7").click();
    cy.get("#notification").should("have.text", "Job shown successfully.");
    cy.get("#notification > button").click();
  });

  it("Should be able to view list of hidden jobs", () => {
    cy.get("#hide-job-7").its("data").should("be", "{ cy: 'deselected' }");
    cy.get("#hide-job-7").click();
    cy.get("#notification").should("have.text", "Job hidden successfully.");
    cy.get("#notification > button").click();

    cy.get("#nav-profile").click();
    cy.get("#view-hidden-jobs").click();
    cy.get("#modal-title").should("have.text", "Hidden Jobs");
    cy.get("#\\37").should("exist");

    // * Cleanup
    cy.get("#show-job-7").click();
  });

  it("Should be able to return to the profile page", () => {
    cy.get("#hide-job-7").click();

    cy.get("#nav-profile").click();
    cy.get("#view-hidden-jobs").click();
    cy.get("#modal-title").should("have.text", "Hidden Jobs");

    cy.get("#modal-close").click();
    cy.get("h2").should("have.text", "Hello, Bob");

    // * Cleanup
    cy.get("#view-hidden-jobs").click();
    cy.get("#show-job-7").click();
  });

  it("Should display currentPage as '1' when viewing hiddenJobs", () => {
    // * Hide 6 jobs
    cy.get("#hide-job-7").click();
    cy.get("#hide-job-4").click();
    cy.get("#hide-job-1").click();
    cy.get("#hide-job-8").click();
    cy.get("#hide-job-9").click();
    cy.get("#hide-job-2").click();

    // * View Hidden Jobs
    cy.get("#nav-profile").click();
    cy.get("#view-hidden-jobs").click();
    cy.get("[data-cy=pagination-item-selected] > button").should(
      "have.text",
      "1"
    );
    cy.get("[data-cy=pagination-item-deselected] > button").should(
      "have.text",
      "2"
    );

    // * Cleanup
    cy.get("#show-job-7").click();
    cy.get("#show-job-4").click();
    cy.get("#show-job-1").click();
    cy.get("#show-job-8").click();
    cy.get("#show-job-9").click();
    cy.get("#show-job-2").click();
  });

  it("Should hide the job from the list of current jobs when user hides job", () => {
    cy.get("#hide-job-7").its("data").should("be", '{ cy: "deselected" }');
    cy.get("#hide-job-7").click();
    cy.get("#show-job-7").should("not.exist");
    cy.get("#notification").should("have.text", "Job hidden successfully.");
    cy.get("#notification > button").click();

    // * Cleanup
    cy.get("#nav-profile").click();
    cy.get("#view-hidden-jobs").click();
    cy.get("#show-job-7").click();
    cy.get("#notification").should("have.text", "Job shown successfully.");
    cy.get("#notification > button").click();
  });

  it("Should display pagination correctly", () => {
    // * Hide 6 jobs
    cy.get("#hide-job-7").click();
    cy.get("#hide-job-4").click();
    cy.get("#hide-job-1").click();
    cy.get("#hide-job-8").click();
    cy.get("#hide-job-9").click();
    cy.get("#hide-job-2").click();

    // * View Hidden Jobs
    cy.get("#nav-profile").click();
    cy.get("#view-hidden-jobs").click();
    cy.get("[data-cy=pagination-item-selected] > button").should(
      "have.text",
      "1"
    );
    cy.get("[data-cy=pagination-item-deselected] > button").should(
      "have.text",
      "2"
    );

    // * Assert pagination buttons
    cy.get("[data-cy=pagination-list]").then(($paginationList) => {
      assert.equal($paginationList.children().length, 4);
    });

    // * Remove 1 job (now should be 1 page instead of 2 pages)
    cy.get("#show-job-7").click();

    cy.get("[data-cy=pagination-list]").then(($paginationList) => {
      assert.equal($paginationList.children().length, 3);
    });

    // * Cleanup
    cy.get("#show-job-4").click();
    cy.get("#show-job-1").click();
    cy.get("#show-job-8").click();
    cy.get("#show-job-9").click();
    cy.get("#show-job-2").click();
  });

  it("Should not display hidden jobs when page reloads", () => {
    // * Hide 3 jobs
    cy.get("#hide-job-7").click();
    cy.get("#hide-job-4").click();
    cy.get("#hide-job-1").click();

    cy.reload();

    // * Hidden Jobs should not display
    cy.get("#show-job-7").should("not.exist");
    cy.get("#show-job-4").should("not.exist");
    cy.get("#show-job-1").should("not.exist");

    // * Cleanup
    cy.get("#nav-profile").click();
    cy.get("#view-hidden-jobs").click();
    cy.get("#show-job-7").click();
    cy.get("#show-job-4").click();
    cy.get("#show-job-1").click();
  });

  it("Should not display hidden jobs in currentJobs", () => {
    // * Hide a job
    cy.get("#hide-job-7").click();
    // * Log User out
    cy.get("#nav-profile").click();
    cy.get("#settings").click();
    cy.get("#log-out").click();

    cy.get("#\\37").should("exist");

    // * Log In
    cy.get("#nav-login").click();
    cy.get("#email").type("bobtest@email.com");
    cy.get("#password").type("Red123456!!!");
    cy.get("#log-in").click();

    cy.get("#\\37").should("not.exist");

    // * Cleanup
    cy.get("#nav-profile").click();
    cy.get("#view-hidden-jobs").click();
    cy.get("#show-job-7").click();
  });

  it("Should reset currentPage if hiding the last job on the last page", () => {
    // * Go to last page
    cy.get(":nth-child(6) > button").click();

    // * Assert current page is "10"
    cy.get("[data-cy=pagination-item-selected]").should("have.text", "10");

    // * Hide 5 jobs
    cy.get("#hide-job-45").click();
    cy.get("#hide-job-46").click();
    cy.get("#hide-job-47").click();
    cy.get("#hide-job-48").click();
    cy.get("#hide-job-49").click();

    // * Assert current page is now "9"
    cy.get("[data-cy=pagination-item-selected]").should("have.text", "9");

    // * Cleanup
    cy.get("#nav-profile").click();
    cy.get("#view-hidden-jobs").click();
    cy.get("#show-job-45").click();
    cy.get("#show-job-46").click();
    cy.get("#show-job-47").click();
    cy.get("#show-job-48").click();
    cy.get("#show-job-49").click();
  });
});

context("Hidden Jobs - No Results", () => {
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
    cy.visit("http://localhost:3000");
    cy.get("#nav-login").click();
    cy.get("h1").should("have.text", "Login");
    cy.get("#email").type("bobtest@email.com");
    cy.get("#password").type("Red123456!!!");
    cy.get("#log-in").click();

    cy.get("#nav-login").should("not.exist");
    cy.get("#search").should("be.visible");
  });

  it("Should not make call to BE if there are no jobs in the list", () => {
    cy.get("#nav-profile").click();
    cy.get("#view-hidden-jobs").click();

    assert.equal(cy.state("requests").length, 4);
  });

  it("Should display correct text", () => {
    cy.get("#nav-profile").click();
    cy.get("#view-hidden-jobs").click();

    cy.get("#no-results").should("have.text", "No results.");
  });
});
