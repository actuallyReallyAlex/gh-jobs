/// <reference types="cypress" />

context("Pagination", () => {
  beforeEach(() => {
    cy.fixture("jobs").then((jobsJson) => {
      cy.server();
      cy.route({
        method: "GET",
        url: "**/positions.json?page=1",
        status: 200,
        response: jobsJson,
        onRequest: (xhr) => {},
        onResponse: (xhr) => {},
      });
      cy.route({
        method: "GET",
        url: "**/positions.json?page=2",
        status: 200,
        response: [],
        onRequest: (xhr) => {},
        onResponse: (xhr) => {},
      });
    });
    cy.visit("http://localhost:8080");
  });

  it("Should render initial <Pagination /> component correctly", () => {
    cy.get(".pagination__list").then(($list) => {
      const childList = $list[0].children;

      cy.paginationSelect1(childList);
    });
  });

  it("Should use right arrow to traverse to end of list", () => {
    cy.get(".pagination__list").then(($list) => {
      const childList = $list[0].children;

      // * 7th Button should be Right Arrow
      assert.equal(childList[6].innerText, "chevron_right");

      const rightArrowButton = childList[6].children[0];

      cy.get(rightArrowButton)
        .click()
        .then(() => {
          // * 1st CLICK (2 is Selected)
          cy.paginationSelect2(childList);

          cy.get(rightArrowButton)
            .click()
            .then(() => {
              // * 2nd CLICK (3 is selected)
              cy.paginationSelect3(childList);

              cy.get(rightArrowButton)
                .click()
                .then(() => {
                  // * 3rd CLICK (4 is selected)
                  cy.paginationSelect4(childList);

                  cy.get(rightArrowButton)
                    .click()
                    .then(() => {
                      // * 4th CLICK (5 is selected)
                      cy.paginationSelect5(childList);

                      cy.get(rightArrowButton)
                        .click()
                        .then(() => {
                          // * 5th CLICK (6 is selected)
                          cy.paginationSelect6(childList);

                          cy.get(rightArrowButton)
                            .click()
                            .then(() => {
                              // * 6th CLICK (7 is selected)
                              cy.paginationSelect7(childList);

                              cy.get(rightArrowButton)
                                .click()
                                .then(() => {
                                  // * 7th CLICK (8 is selected)
                                  cy.paginationSelect8(childList);

                                  cy.get(rightArrowButton)
                                    .click()
                                    .then(() => {
                                      // * 8th CLICK (9 is selected)
                                      cy.paginationSelect9(childList);

                                      cy.get(rightArrowButton)
                                        .click()
                                        .then(() => {
                                          // * 9th CLICK (10 is selected)
                                          cy.paginationSelect10(childList);
                                        });
                                    });
                                });
                            });
                        });
                    });
                });
            });
        });
    });
  });

  it("Should use left arrow to traverse back to the beginning of the list", () => {
    cy.get(".pagination__list").then(($list) => {
      const childList = $list[0].children;
      const rightArrowButton = childList[6].children[0];
      const leftArrowButton = childList[0].children[0];

      // * Get to page 10
      cy.get(rightArrowButton).click();
      cy.get(rightArrowButton).click();
      cy.get(rightArrowButton).click();
      cy.get(rightArrowButton).click();
      cy.get(rightArrowButton).click();
      cy.get(rightArrowButton).click();
      cy.get(rightArrowButton).click();
      cy.get(rightArrowButton).click();
      cy.get(rightArrowButton).click();

      cy.get(leftArrowButton)
        .click()
        .then(() => {
          // * 1st CLICK (9 is selected)
          cy.paginationSelect9(childList);

          cy.get(leftArrowButton)
            .click()
            .then(() => {
              // * 2nd CLICK (8 is selected)

              cy.paginationSelect8(childList);

              cy.get(leftArrowButton)
                .click()
                .then(() => {
                  // * 3rd CLICK (7 is selected)

                  cy.paginationSelect7(childList);

                  cy.get(leftArrowButton)
                    .click()
                    .then(() => {
                      // * 4th CLICK (6 is selected)

                      cy.paginationSelect6(childList);

                      cy.get(leftArrowButton)
                        .click()
                        .then(() => {
                          // * 5th CLICK (5 is selected)

                          cy.paginationSelect5(childList);

                          cy.get(leftArrowButton)
                            .click()
                            .then(() => {
                              // * 6th CLICK (4 is selected)

                              cy.paginationSelect4(childList);

                              cy.get(leftArrowButton)
                                .click()
                                .then(() => {
                                  // * 7th CLICK (3 is selected)

                                  cy.paginationSelect3(childList);

                                  cy.get(leftArrowButton)
                                    .click()
                                    .then(() => {
                                      // * 8th CLICK (2 is selected)

                                      cy.paginationSelect2(childList);

                                      cy.get(leftArrowButton)
                                        .click()
                                        .then(() => {
                                          // * 9th CLICK (1 is selected)

                                          cy.paginationSelect1(childList);
                                        });
                                    });
                                });
                            });
                        });
                    });
                });
            });
        });
    });
  });

  it("Should be able to hop to ends of pagination", () => {
    cy.get(".pagination__list").then(($list) => {
      const childList = $list[0].children;
      const page1Button = childList[1].children[0];
      const page10Button = childList[5].children[0];

      cy.get(page10Button)
        .click()
        .then(() => {
          cy.paginationSelect10(childList);

          cy.get(page1Button)
            .click()
            .then(() => {
              cy.paginationSelect1(childList);
            });
        });
    });
  });
});
