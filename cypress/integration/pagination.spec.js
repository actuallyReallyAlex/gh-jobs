/// <reference types="cypress" />

context("Pagination", () => {
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
    cy.wait(1500);
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

  it("Should rerender component when a new amount of jobs is to be displayed", () => {
    cy.fixture("chicagoSearch").then((jobsJson) => {
      cy.server();
      cy.route({
        method: "GET",
        url: "/jobs/search?full_time=false&description=&location=Chicago",
        status: 200,
        response: jobsJson,
        onRequest: (xhr) => {},
        onResponse: (xhr) => {},
      });
    });

    cy.get(".pagination__list").then(($list) => {
      const childList = $list[0].children;

      cy.paginationSelect1(childList);

      cy.get(
        "#app > div.search__container > div.options-panel__container > label:nth-child(3) > span"
      ).click();
      cy.get("#search-submit").click();

      cy.get('[data-cy="job-container"]').then(($jobs) => {
        assert.equal($jobs.length, 3);

        cy.get(".pagination__list").then(($list) => {
          const childList = $list[0].children;

          // * Should contain 3 elements
          assert.equal(childList.length, 3);
          // * 1st Button should be Left Arrow
          assert.equal(childList[0].innerText, "chevron_left");
          // * 1st button should be disabled
          assert.equal(childList[0].children[0].disabled, true);
          // * 2nd Button should be "1"
          assert.equal(childList[1].innerText, "1");
          // * 2nd Button as "1" should be selected by default
          assert.equal(childList[1].className, "pagination__item__selected");
          // * 3rd Button should be Right Arrow
          assert.equal(childList[2].innerText, "chevron_right");
          // * 3rd button should be disabled
          assert.equal(childList[2].children[0].disabled, true);
        });
      });
    });
  });
});

context("Pagination - 1 Page", () => {
  beforeEach(() => {
    cy.fixture("jobs5").then((jobsJson) => {
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
    cy.wait(1500);
  });

  it("Should display pagination correctly, when 5 jobs exist", () => {
    cy.get(".pagination__list").then(($list) => {
      const childList = $list[0].children;

      // * Should contain 3 elements
      assert.equal(childList.length, 3);
      // * 1st Button should be Left Arrow
      assert.equal(childList[0].innerText, "chevron_left");
      // * 1st button should be disabled
      assert.equal(childList[0].children[0].disabled, true);
      // * 2nd Button should be "1"
      assert.equal(childList[1].innerText, "1");
      // * 2nd Button as "1" should be selected by default
      assert.equal(childList[1].className, "pagination__item__selected");
      // * 3rd Button should be Right Arrow
      assert.equal(childList[2].innerText, "chevron_right");
      // * 3rd button should be disabled
      assert.equal(childList[2].children[0].disabled, true);
    });
  });
});

context("Pagination - 2 Pages", () => {
  beforeEach(() => {
    cy.fixture("jobs10").then((jobsJson) => {
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
    cy.wait(1500);
  });

  it("Should display pagination correctly, when 10 jobs exist", () => {
    cy.get(".pagination__list").then(($list) => {
      const childList = $list[0].children;

      // * Should contain 4 elements
      assert.equal(childList.length, 4);
      // * 1st Button should be Left Arrow
      assert.equal(childList[0].innerText, "chevron_left");
      // * 1st button should be disabled
      assert.equal(childList[0].children[0].disabled, true);
      // * 2nd Button should be "1"
      assert.equal(childList[1].innerText, "1");
      // * 2nd Button as "1" should be selected by default
      assert.equal(childList[1].className, "pagination__item__selected");
      // * 3rd Button should be "2"
      assert.equal(childList[2].innerText, "2");
      // * 4th Button should be Right Arrow
      assert.equal(childList[3].innerText, "chevron_right");
    });
  });
});

context("Pagination - 3 Pages", () => {
  beforeEach(() => {
    cy.fixture("jobs15").then((jobsJson) => {
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
    cy.wait(1500);
  });

  it("Should display pagination correctly, when 15 jobs exist", () => {
    cy.get(".pagination__list").then(($list) => {
      const childList = $list[0].children;

      // * Should contain 5 elements
      assert.equal(childList.length, 5);
      // * 1st Button should be Left Arrow
      assert.equal(childList[0].innerText, "chevron_left");
      // * 1st button should be disabled
      assert.equal(childList[0].children[0].disabled, true);
      // * 2nd Button should be "1"
      assert.equal(childList[1].innerText, "1");
      // * 2nd Button as "1" should be selected by default
      assert.equal(childList[1].className, "pagination__item__selected");
      // * 3rd Button should be "2"
      assert.equal(childList[2].innerText, "2");
      // * 4th Button should be "3"
      assert.equal(childList[3].innerText, "3");
      // * 5th Button should be Right Arrow
      assert.equal(childList[4].innerText, "chevron_right");
    });
  });
});

context("Pagination - 4 Pages", () => {
  beforeEach(() => {
    cy.fixture("jobs20").then((jobsJson) => {
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
    cy.wait(1500);
  });

  it("Should display pagination correctly, when 20 jobs exist", () => {
    cy.get(".pagination__list").then(($list) => {
      const childList = $list[0].children;

      // * Should contain 6 elements
      assert.equal(childList.length, 6);
      // * 1st Button should be Left Arrow
      assert.equal(childList[0].innerText, "chevron_left");
      // * 1st button should be disabled
      assert.equal(childList[0].children[0].disabled, true);
      // * 2nd Button should be "1"
      assert.equal(childList[1].innerText, "1");
      // * 2nd Button as "1" should be selected by default
      assert.equal(childList[1].className, "pagination__item__selected");
      // * 3rd Button should be "2"
      assert.equal(childList[2].innerText, "2");
      // * 4th Button should be "3"
      assert.equal(childList[3].innerText, "3");
      // * 5th Button should be "4"
      assert.equal(childList[4].innerText, "4");
      // * 6th Button should be Right Arrow
      assert.equal(childList[5].innerText, "chevron_right");
    });
  });
});
