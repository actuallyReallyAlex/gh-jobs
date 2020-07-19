/// <reference types="cypress" />

context("Search", () => {
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
  });

  it("Should display '<Details />' correctly", () => {
    cy.get(
      "#app > div.search__container > div.jobs__container > div:nth-child(1) > div.jobcard__container__left > div.jobcard__container__middle > a > p"
    ).click();

    cy.get(
      "#app > div.details__container > div.details__side__container > div > span"
    ).should("have.text", "How to Apply");
    cy.get(
      "#app > div.details__container > div.details__main__container > div.details__container__title > div.details__container__title__inner > h2"
    ).should("have.text", "Cloud DevOps Engineer");
    cy.get(
      "#app > div.details__container > div.details__main__container > div.details__container__title > div.details__container__title__inner > p"
    ).should("have.text", "Full Time");
    cy.get(
      "#app > div.details__container > div.details__main__container > div.details__container__company > div.details__company__right > a"
    ).should("have.text", "Cool Company");
  });
});
