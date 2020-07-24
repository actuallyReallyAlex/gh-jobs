// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })


import 'cypress-plugin-snapshots/commands';

Cypress.Commands.add("paginationSelect1", (childList) => {
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

Cypress.Commands.add("paginationSelect2", (childList) => {
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
});

Cypress.Commands.add("paginationSelect3", (childList) => {
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
  assert.equal(childList[3].className, "pagination__item__selected");
  // * 5th Button should be "4"
  assert.equal(childList[4].innerText, "4");
  // * 6th Button should be More Icon
  assert.equal(childList[5].innerText, "more_horiz");
  // * 7th Button should be "10"
  assert.equal(childList[6].innerText, "10");
  // * 8th Button should be Right Arrow
  assert.equal(childList[7].innerText, "chevron_right");
});

Cypress.Commands.add("paginationSelect4", (childList) => {
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
  assert.equal(childList[4].className, "pagination__item__selected");
  // * 6th Button should be "5"
  assert.equal(childList[5].innerText, "5");
  // * 7th Button should be More Icon
  assert.equal(childList[6].innerText, "more_horiz");
  // * 8th Button should be "10"
  assert.equal(childList[7].innerText, "10");
  // * 9th Button should be Right Arrow
  assert.equal(childList[8].innerText, "chevron_right");
});

Cypress.Commands.add("paginationSelect5", (childList) => {
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
  assert.equal(childList[4].className, "pagination__item__selected");
  // * 6th Button should be "6"
  assert.equal(childList[5].innerText, "6");
  // * 7th Button should be More Icon
  assert.equal(childList[6].innerText, "more_horiz");
  // * 8th Button should be "10"
  assert.equal(childList[7].innerText, "10");
  // * 9th Button should be Right Arrow
  assert.equal(childList[8].innerText, "chevron_right");
});

Cypress.Commands.add("paginationSelect6", (childList) => {
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
  // * 4th Button should be "5"
  assert.equal(childList[3].innerText, "5");
  // * 5th Button should be "6"
  assert.equal(childList[4].innerText, "6");
  // * 5th button should be selected
  assert.equal(childList[4].className, "pagination__item__selected");
  // * 6th Button should be "7"
  assert.equal(childList[5].innerText, "7");
  // * 7th Button should be More Icon
  assert.equal(childList[6].innerText, "more_horiz");
  // * 8th Button should be "10"
  assert.equal(childList[7].innerText, "10");
  // * 9th Button should be Right Arrow
  assert.equal(childList[8].innerText, "chevron_right");
});

Cypress.Commands.add("paginationSelect7", (childList) => {
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
  // * 4th Button should be "6"
  assert.equal(childList[3].innerText, "6");
  // * 5th Button should be "7"
  assert.equal(childList[4].innerText, "7");
  // * 5th button should be selected
  assert.equal(childList[4].className, "pagination__item__selected");
  // * 6th Button should be "8"
  assert.equal(childList[5].innerText, "8");
  // * 7th Button should be More Icon
  assert.equal(childList[6].innerText, "more_horiz");
  // * 8th Button should be "10"
  assert.equal(childList[7].innerText, "10");
  // * 9th Button should be Right Arrow
  assert.equal(childList[8].innerText, "chevron_right");
});

Cypress.Commands.add("paginationSelect8", (childList) => {
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
  // * 3rd Button should be 'More'
  assert.equal(childList[2].innerText, "more_horiz");
  // * 4th Button should be "7"
  assert.equal(childList[3].innerText, "7");
  // * 5th Button should be "8"
  assert.equal(childList[4].innerText, "8");
  // * 5th button should be selected
  assert.equal(childList[4].className, "pagination__item__selected");
  // * 6th Button should be "9"
  assert.equal(childList[5].innerText, "9");
  // * 7th Button should be "10"
  assert.equal(childList[6].innerText, "10");
  // * 8th Button should be Right Arrow
  assert.equal(childList[7].innerText, "chevron_right");
});

Cypress.Commands.add("paginationSelect9", (childList) => {
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

Cypress.Commands.add("paginationSelect10", (childList) => {
  // * Should contain 6 elements
  assert.equal(childList.length, 6);
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
  // * 4th Button should be "9"
  assert.equal(childList[3].innerText, "9");
  // * 5th Button should be "10"
  assert.equal(childList[4].innerText, "10");
  // * 5th button should be selected
  assert.equal(childList[4].className, "pagination__item__selected");
  // * 6th Button should be Right Arrow
  assert.equal(childList[5].innerText, "chevron_right");
  // * 6th button should be disabled
  assert.equal(childList[5].children[0].disabled, true);
});
