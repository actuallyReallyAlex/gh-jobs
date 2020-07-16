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

      console.log(childList);

      // * Should contain 7 elements
      assert.equal(childList.length, 7);

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

      // * 5th Button should be More Icon
      assert.equal(childList[4].innerText, "more_horiz");

      // * 6th Button should be "10"
      assert.equal(childList[5].innerText, "10");

      // * 7th Button should be Right Arrow
      assert.equal(childList[6].innerText, "chevron_right");
    });
  });

  it("Should use right arrow to traverse to end of list", () => {
    cy.get(".pagination__list").then(($list) => {
      const childList = $list[0].children;
      console.log(childList);

      // * 7th Button should be Right Arrow
      assert.equal(childList[6].innerText, "chevron_right");

      const rightArrowButton = childList[6].children[0];

      cy.get(rightArrowButton)
        .click()
        .then(() => {
          // * 1st CLICK (2 is Selected)

          // * Should contain 7 elements
          assert.equal(childList.length, 7);
          // * 1st Button should be Left Arrow
          assert.equal(childList[0].innerText, "chevron_left");
          // * 1st button should be enabled
          assert.equal(childList[0].children[0].disabled, false);
          // * 2nd Button should be "1"
          assert.equal(childList[1].innerText, "1");
          // * 2nd Button as "1" should be deselected
          assert.equal(childList[1].className, "pagination__item");
          // * 3rd Button should be "2"
          assert.equal(childList[2].innerText, "2");
          // * 3rd Button should be selected
          assert.equal(childList[2].className, "pagination__item__selected");
          // * 4th Button should be "3"
          assert.equal(childList[3].innerText, "3");
          // * 5th Button should be More Icon
          assert.equal(childList[4].innerText, "more_horiz");
          // * 6th Button should be "10"
          assert.equal(childList[5].innerText, "10");
          // * 7th Button should be Right Arrow
          assert.equal(childList[6].innerText, "chevron_right");

          cy.get(rightArrowButton)
            .click()
            .then(() => {
              // * 2nd CLICK (3 is selected)

              // * Should contain 8 elements
              assert.equal(childList.length, 8);
              // * 1st Button should be Left Arrow
              assert.equal(childList[0].innerText, "chevron_left");
              // * 1st button should be disabled
              assert.equal(childList[0].children[0].disabled, false);
              // * 2nd Button should be "1"
              assert.equal(childList[1].innerText, "1");
              // * 2nd Button as "1" should be deselected
              assert.equal(childList[1].className, "pagination__item");
              // * 3rd Button should be "2"
              assert.equal(childList[2].innerText, "2");
              // * 3rd Button should be deselected
              assert.equal(childList[2].className, "pagination__item");
              // * 4th Button should be "3"
              assert.equal(childList[3].innerText, "3");
              // * 4th button should be selected
              assert.equal(
                childList[3].className,
                "pagination__item__selected"
              );
              // * 5th Button should be "4"
              assert.equal(childList[4].innerText, "4");
              // * 6th Button should be More Icon
              assert.equal(childList[5].innerText, "more_horiz");
              // * 7th Button should be "10"
              assert.equal(childList[6].innerText, "10");
              // * 8th Button should be Right Arrow
              assert.equal(childList[7].innerText, "chevron_right");

              cy.get(rightArrowButton)
                .click()
                .then(() => {
                  // * 3rd CLICK (4 is selected)

                  // * Should contain 9 elements
                  assert.equal(childList.length, 9);
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
                  // * 4th Button should be "3"
                  assert.equal(childList[3].innerText, "3");
                  // * 5th Button should be "4"
                  assert.equal(childList[4].innerText, "4");
                  // * 5th button should be selected
                  assert.equal(
                    childList[4].className,
                    "pagination__item__selected"
                  );
                  // * 6th Button should be "5"
                  assert.equal(childList[5].innerText, "5");
                  // * 7th Button should be More Icon
                  assert.equal(childList[6].innerText, "more_horiz");
                  // * 8th Button should be "10"
                  assert.equal(childList[7].innerText, "10");
                  // * 9th Button should be Right Arrow
                  assert.equal(childList[8].innerText, "chevron_right");

                  cy.get(rightArrowButton)
                    .click()
                    .then(() => {
                      // * 4th CLICK (5 is selected)

                      // * Should contain 9 elements
                      assert.equal(childList.length, 9);
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
                      // * 4th Button should be "4"
                      assert.equal(childList[3].innerText, "4");
                      // * 5th Button should be "5"
                      assert.equal(childList[4].innerText, "5");
                      // * 5th button should be selected
                      assert.equal(
                        childList[4].className,
                        "pagination__item__selected"
                      );
                      // * 6th Button should be "6"
                      assert.equal(childList[5].innerText, "6");
                      // * 7th Button should be More Icon
                      assert.equal(childList[6].innerText, "more_horiz");
                      // * 8th Button should be "10"
                      assert.equal(childList[7].innerText, "10");
                      // * 9th Button should be Right Arrow
                      assert.equal(childList[8].innerText, "chevron_right");

                      cy.get(rightArrowButton)
                        .click()
                        .then(() => {
                          // * 5th CLICK (6 is selected)

                          // * Should contain 9 elements
                          assert.equal(childList.length, 9);
                          // * 1st Button should be Left Arrow
                          assert.equal(childList[0].innerText, "chevron_left");
                          // * 1st button should be disabled
                          assert.equal(
                            childList[0].children[0].disabled,
                            false
                          );
                          // * 2nd Button should be "1"
                          assert.equal(childList[1].innerText, "1");
                          // * 2nd Button as "1" should be deselected
                          assert.equal(
                            childList[1].className,
                            "pagination__item"
                          );
                          // * 3rd Button should be 'More'
                          assert.equal(childList[2].innerText, "more_horiz");
                          // * 4th Button should be "5"
                          assert.equal(childList[3].innerText, "5");
                          // * 5th Button should be "6"
                          assert.equal(childList[4].innerText, "6");
                          // * 5th button should be selected
                          assert.equal(
                            childList[4].className,
                            "pagination__item__selected"
                          );
                          // * 6th Button should be "7"
                          assert.equal(childList[5].innerText, "7");
                          // * 7th Button should be More Icon
                          assert.equal(childList[6].innerText, "more_horiz");
                          // * 8th Button should be "10"
                          assert.equal(childList[7].innerText, "10");
                          // * 9th Button should be Right Arrow
                          assert.equal(childList[8].innerText, "chevron_right");

                          cy.get(rightArrowButton)
                            .click()
                            .then(() => {
                              // * 6th CLICK (7 is selected)

                              // * Should contain 9 elements
                              assert.equal(childList.length, 9);
                              // * 1st Button should be Left Arrow
                              assert.equal(
                                childList[0].innerText,
                                "chevron_left"
                              );
                              // * 1st button should be disabled
                              assert.equal(
                                childList[0].children[0].disabled,
                                false
                              );
                              // * 2nd Button should be "1"
                              assert.equal(childList[1].innerText, "1");
                              // * 2nd Button as "1" should be deselected
                              assert.equal(
                                childList[1].className,
                                "pagination__item"
                              );
                              // * 3rd Button should be 'More'
                              assert.equal(
                                childList[2].innerText,
                                "more_horiz"
                              );
                              // * 4th Button should be "6"
                              assert.equal(childList[3].innerText, "6");
                              // * 5th Button should be "7"
                              assert.equal(childList[4].innerText, "7");
                              // * 5th button should be selected
                              assert.equal(
                                childList[4].className,
                                "pagination__item__selected"
                              );
                              // * 6th Button should be "8"
                              assert.equal(childList[5].innerText, "8");
                              // * 7th Button should be More Icon
                              assert.equal(
                                childList[6].innerText,
                                "more_horiz"
                              );
                              // * 8th Button should be "10"
                              assert.equal(childList[7].innerText, "10");
                              // * 9th Button should be Right Arrow
                              assert.equal(
                                childList[8].innerText,
                                "chevron_right"
                              );

                              cy.get(rightArrowButton)
                                .click()
                                .then(() => {
                                  // * 7th CLICK (8 is selected)

                                  // * Should contain 8 elements
                                  assert.equal(childList.length, 8);
                                  // * 1st Button should be Left Arrow
                                  assert.equal(
                                    childList[0].innerText,
                                    "chevron_left"
                                  );
                                  // * 1st button should be disabled
                                  assert.equal(
                                    childList[0].children[0].disabled,
                                    false
                                  );
                                  // * 2nd Button should be "1"
                                  assert.equal(childList[1].innerText, "1");
                                  // * 2nd Button as "1" should be deselected
                                  assert.equal(
                                    childList[1].className,
                                    "pagination__item"
                                  );
                                  // * 3rd Button should be 'More'
                                  assert.equal(
                                    childList[2].innerText,
                                    "more_horiz"
                                  );
                                  // * 4th Button should be "7"
                                  assert.equal(childList[3].innerText, "7");
                                  // * 5th Button should be "8"
                                  assert.equal(childList[4].innerText, "8");
                                  // * 5th button should be selected
                                  assert.equal(
                                    childList[4].className,
                                    "pagination__item__selected"
                                  );
                                  // * 6th Button should be "9"
                                  assert.equal(childList[5].innerText, "9");
                                  // * 7th Button should be "10"
                                  assert.equal(childList[6].innerText, "10");
                                  // * 8th Button should be Right Arrow
                                  assert.equal(
                                    childList[7].innerText,
                                    "chevron_right"
                                  );

                                  cy.get(rightArrowButton)
                                    .click()
                                    .then(() => {
                                      // * 8th CLICK (9 is selected)

                                      // * Should contain 7 elements
                                      assert.equal(childList.length, 7);
                                      // * 1st Button should be Left Arrow
                                      assert.equal(
                                        childList[0].innerText,
                                        "chevron_left"
                                      );
                                      // * 1st button should be disabled
                                      assert.equal(
                                        childList[0].children[0].disabled,
                                        false
                                      );
                                      // * 2nd Button should be "1"
                                      assert.equal(childList[1].innerText, "1");
                                      // * 2nd Button as "1" should be deselected
                                      assert.equal(
                                        childList[1].className,
                                        "pagination__item"
                                      );
                                      // * 3rd Button should be 'More'
                                      assert.equal(
                                        childList[2].innerText,
                                        "more_horiz"
                                      );
                                      // * 4th Button should be "8"
                                      assert.equal(childList[3].innerText, "8");
                                      // * 5th Button should be "9"
                                      assert.equal(childList[4].innerText, "9");
                                      // * 5th button should be selected
                                      assert.equal(
                                        childList[4].className,
                                        "pagination__item__selected"
                                      );
                                      // * 6th Button should be "10"
                                      assert.equal(
                                        childList[5].innerText,
                                        "10"
                                      );
                                      // * 7th Button should be Right Arrow
                                      assert.equal(
                                        childList[6].innerText,
                                        "chevron_right"
                                      );

                                      cy.get(rightArrowButton)
                                        .click()
                                        .then(() => {
                                          // * 9th CLICK (10 is selected)

                                          // * Should contain 6 elements
                                          assert.equal(childList.length, 6);
                                          // * 1st Button should be Left Arrow
                                          assert.equal(
                                            childList[0].innerText,
                                            "chevron_left"
                                          );
                                          // * 1st button should be disabled
                                          assert.equal(
                                            childList[0].children[0].disabled,
                                            false
                                          );
                                          // * 2nd Button should be "1"
                                          assert.equal(
                                            childList[1].innerText,
                                            "1"
                                          );
                                          // * 2nd Button as "1" should be deselected
                                          assert.equal(
                                            childList[1].className,
                                            "pagination__item"
                                          );
                                          // * 3rd Button should be 'More'
                                          assert.equal(
                                            childList[2].innerText,
                                            "more_horiz"
                                          );
                                          // * 4th Button should be "9"
                                          assert.equal(
                                            childList[3].innerText,
                                            "9"
                                          );
                                          // * 5th Button should be "10"
                                          assert.equal(
                                            childList[4].innerText,
                                            "10"
                                          );
                                          // * 5th button should be selected
                                          assert.equal(
                                            childList[4].className,
                                            "pagination__item__selected"
                                          );
                                          // * 6th Button should be Right Arrow
                                          assert.equal(
                                            childList[5].innerText,
                                            "chevron_right"
                                          );
                                          // * 6th button should be disabled
                                          assert.equal(
                                            childList[5].children[0].disabled,
                                            true
                                          );
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

  it("Should use left arrow to traverse back to the beginning of the list", () => {});
});
