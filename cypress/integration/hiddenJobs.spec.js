/// <reference types="cypress" />

context("Hidden Jobs", () => {
  beforeEach(() => {
    cy.fixture("jobs50").then((jobsJson) => {
      cy.fixture("hiddenDetails").then((hiddenDetailsJson) => {
        cy.server();
        cy.route({
          method: "GET",
          url: "/jobs",
          status: 200,
          response: jobsJson,
          delay: 1000,
        });
        cy.route({
          method: "GET",
          url: "/user/hiddenJobsDetails",
          status: 200,
          response: hiddenDetailsJson,
          delay: 1000,
        });
      });
    });
    cy.visit("http://localhost:3000");
    cy.wait(500);
    cy.get("#nav-login").click();
    cy.get("h1").should("have.text", "Login");
    cy.get("#email").type("bobtest@email.com");
    cy.get("#password").type("Red123456!!!");
    cy.get("#log-in").click();
    cy.wait(500);

    cy.get("#nav-login").should("not.exist");
    cy.get("#search").should("be.visible");
  });

  it("Should be able to hide a job from the 'Search' page", () => {
    cy.get("#hide-job-f1884b46-ecb4-473c-81f5-08d9bf2ab3bb")
      .its("data")
      .should("be", '{ cy: "deselected" }');
    cy.get("#hide-job-f1884b46-ecb4-473c-81f5-08d9bf2ab3bb").click();
    cy.get("#notification").should("have.text", "Job hidden successfully.");
    cy.get("#notification > button").click();

    // * Cleanup
    cy.get("#nav-profile").click();
    cy.get("#view-hidden-jobs").click();
    cy.get("#show-job-f1884b46-ecb4-473c-81f5-08d9bf2ab3bb").click();
    cy.get("#notification").should("have.text", "Job shown successfully.");
    cy.get("#notification > button").click();
  });

  it("Should be able to hide a job from the 'Details' page", () => {
    cy.get("#f1884b46-ecb4-473c-81f5-08d9bf2ab3bb").click({ force: true });

    cy.get("#hide-job-f1884b46-ecb4-473c-81f5-08d9bf2ab3bb")
      .its("data")
      .should("be", "{cy: 'deselected'}");
    cy.get("#hide-job-f1884b46-ecb4-473c-81f5-08d9bf2ab3bb").click();
    cy.get("#show-job-f1884b46-ecb4-473c-81f5-08d9bf2ab3bb")
      .its("data")
      .should("be", "{ cy: 'selected' }");
    cy.get("#notification").should("have.text", "Job hidden successfully.");
    cy.get("#notification > button").click();

    // * Cleanup
    cy.get("#show-job-f1884b46-ecb4-473c-81f5-08d9bf2ab3bb").click();
    cy.get("#notification").should("have.text", "Job shown successfully.");
    cy.get("#notification > button").click();
  });

  it("Should be able to view list of hidden jobs", () => {
    cy.get("#hide-job-f1884b46-ecb4-473c-81f5-08d9bf2ab3bb")
      .its("data")
      .should("be", "{ cy: 'deselected' }");
    cy.get("#hide-job-f1884b46-ecb4-473c-81f5-08d9bf2ab3bb").click();
    cy.get("#notification").should("have.text", "Job hidden successfully.");
    cy.get("#notification > button").click();

    cy.get("#nav-profile").click();
    cy.get("#view-hidden-jobs").click();
    cy.get("#modal-title").should("have.text", "Hidden Jobs");
    cy.get("#f1884b46-ecb4-473c-81f5-08d9bf2ab3bb").should("exist");

    // * Cleanup
    cy.get("#show-job-f1884b46-ecb4-473c-81f5-08d9bf2ab3bb").click();
  });

  it("Should be able to return to the profile page", () => {
    cy.get("#hide-job-f1884b46-ecb4-473c-81f5-08d9bf2ab3bb").click();

    cy.get("#nav-profile").click();
    cy.get("#view-hidden-jobs").click();
    cy.get("#modal-title").should("have.text", "Hidden Jobs");

    cy.get("#modal-close").click();
    cy.get("h2").should("have.text", "Hello, Bob");

    // * Cleanup
    cy.get("#view-hidden-jobs").click();
    cy.get("#show-job-f1884b46-ecb4-473c-81f5-08d9bf2ab3bb").click();
  });

  // ! Unable to do with current implementation
  // * If you don't stub it, the real db may not contain that job listing anymore
  // * If you do stub it, you can't conditionally send a smaller list of jobs each time it hits /user/hiddenJobDetails
  it.skip("Should display currentPage as '1' when viewing hiddenJobs", () => {
    // * Hide 6 jobs
    cy.get("#hide-job-f1884b46-ecb4-473c-81f5-08d9bf2ab3bb").click();
    cy.get("#hide-job-72de09f2-5bc6-489f-be90-3d38e505e20a").click();
    cy.get("#hide-job-cc20d9f2-0102-4785-8253-66093d3ca5c0").click();
    cy.get("#hide-job-65ed6c1f-e74e-47ed-a85f-126ef1071a47").click();
    cy.get("#hide-job-285aa472-990f-418d-b376-e03c27f48d17").click();
    cy.get("#hide-job-11cbce13-e6cd-4c79-b904-d292b569b22f").click();

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
    cy.get("#show-job-f1884b46-ecb4-473c-81f5-08d9bf2ab3bb").click();
    cy.get("#show-job-72de09f2-5bc6-489f-be90-3d38e505e20a").click();
    cy.get("#show-job-cc20d9f2-0102-4785-8253-66093d3ca5c0").click();
    cy.get("#show-job-65ed6c1f-e74e-47ed-a85f-126ef1071a47").click();
    cy.get("#show-job-285aa472-990f-418d-b376-e03c27f48d17").click();
    cy.get("#show-job-11cbce13-e6cd-4c79-b904-d292b569b22f").click();
  });

  it("Should hide the job from the list of current jobs when user hides job", () => {
    cy.get("#hide-job-f1884b46-ecb4-473c-81f5-08d9bf2ab3bb")
      .its("data")
      .should("be", '{ cy: "deselected" }');
    cy.get("#hide-job-f1884b46-ecb4-473c-81f5-08d9bf2ab3bb").click();
    cy.get("#show-job-f1884b46-ecb4-473c-81f5-08d9bf2ab3bb").should(
      "not.exist"
    );
    cy.get("#notification").should("have.text", "Job hidden successfully.");
    cy.get("#notification > button").click();

    // * Cleanup
    cy.get("#nav-profile").click();
    cy.get("#view-hidden-jobs").click();
    cy.get("#show-job-f1884b46-ecb4-473c-81f5-08d9bf2ab3bb").click();
    cy.get("#notification").should("have.text", "Job shown successfully.");
    cy.get("#notification > button").click();
  });

  // ! Unable to do with current implementation
  // * If you don't stub it, the real db may not contain that job listing anymore
  // * If you do stub it, you can't conditionally send a smaller list of jobs each time it hits /user/hiddenJobDetails
  it.skip("Should display pagination correctly", () => {
    // * Hide 6 jobs
    cy.get("#hide-job-f1884b46-ecb4-473c-81f5-08d9bf2ab3bb").click();
    cy.get("#hide-job-72de09f2-5bc6-489f-be90-3d38e505e20a").click();
    cy.get("#hide-job-cc20d9f2-0102-4785-8253-66093d3ca5c0").click();
    cy.get("#hide-job-65ed6c1f-e74e-47ed-a85f-126ef1071a47").click();
    cy.get("#hide-job-285aa472-990f-418d-b376-e03c27f48d17").click();
    cy.get("#hide-job-11cbce13-e6cd-4c79-b904-d292b569b22f").click();

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
    cy.get("#show-job-f1884b46-ecb4-473c-81f5-08d9bf2ab3bb").click();

    cy.get("[data-cy=pagination-list]").then(($paginationList) => {
      assert.equal($paginationList.children().length, 3);
    });

    // * Cleanup
    cy.get("#show-job-72de09f2-5bc6-489f-be90-3d38e505e20a").click();
    cy.get("#show-job-cc20d9f2-0102-4785-8253-66093d3ca5c0").click();
    cy.get("#show-job-65ed6c1f-e74e-47ed-a85f-126ef1071a47").click();
    cy.get("#show-job-285aa472-990f-418d-b376-e03c27f48d17").click();
    cy.get("#show-job-11cbce13-e6cd-4c79-b904-d292b569b22f").click();
  });

  it("Should not display hidden jobs when page reloads", () => {
    // * Hide 3 jobs
    cy.get("#hide-job-f1884b46-ecb4-473c-81f5-08d9bf2ab3bb").click();
    cy.get("#hide-job-72de09f2-5bc6-489f-be90-3d38e505e20a").click();
    cy.get("#hide-job-cc20d9f2-0102-4785-8253-66093d3ca5c0").click();

    cy.reload();

    // * Hidden Jobs should not display
    cy.get("#show-job-f1884b46-ecb4-473c-81f5-08d9bf2ab3bb").should(
      "not.exist"
    );
    cy.get("#show-job-72de09f2-5bc6-489f-be90-3d38e505e20a").should(
      "not.exist"
    );
    cy.get("#show-job-cc20d9f2-0102-4785-8253-66093d3ca5c0").should(
      "not.exist"
    );

    // * Cleanup
    cy.get("#nav-profile").click();
    cy.get("#view-hidden-jobs").click();
    cy.get("#show-job-f1884b46-ecb4-473c-81f5-08d9bf2ab3bb").click();
    cy.get("#show-job-72de09f2-5bc6-489f-be90-3d38e505e20a").click();
    cy.get("#show-job-cc20d9f2-0102-4785-8253-66093d3ca5c0").click();
  });
});

context("Hidden Jobs - No Results", () => {
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
    cy.wait(500);
    cy.get("#nav-login").click();
    cy.get("h1").should("have.text", "Login");
    cy.get("#email").type("bobtest@email.com");
    cy.get("#password").type("Red123456!!!");
    cy.get("#log-in").click();
    cy.wait(500);

    cy.get("#nav-login").should("not.exist");
    cy.get("#search").should("be.visible");
  });

  it("Should not make call to BE if there are no jobs in the list", () => {
    cy.get("#nav-profile").click();
    cy.get("#view-hidden-jobs").click();

    assert.equal(cy.state("requests").length, 3);
  });

  it("Should display correct text", () => {
    cy.get("#nav-profile").click();
    cy.get("#view-hidden-jobs").click();

    cy.get("#no-results").should("have.text", "No results.");
  });
});
