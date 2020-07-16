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

          // * Should contain 7 elements
          assert.equal(childList.length, 7);
          // * 1st Button should be Left Arrow
          assert.equal(childList[0].innerText, "chevron_left");
          // * 1st button should be disabled
          assert.equal(childList[0].children[0].disabled, false);
          // * 2nd Button should be "1"
          assert.equal(childList[1].innerText, "1");
          // * 2nd Button as "1" should be deselected
          assert.equal(childList[1].className, "pagination__item");
          // * 3rd Button should be 'More'
          assert.equal(childList[2].innerText, "more_horiz");
          // * 4th Button should be "8"
          assert.equal(childList[3].innerText, "8");
          // * 5th Button should be "9"
          assert.equal(childList[4].innerText, "9");
          // * 5th button should be selected
          assert.equal(childList[4].className, "pagination__item__selected");
          // * 6th Button should be "10"
          assert.equal(childList[5].innerText, "10");
          // * 7th Button should be Right Arrow
          assert.equal(childList[6].innerText, "chevron_right");
        });
    });
  });
});
