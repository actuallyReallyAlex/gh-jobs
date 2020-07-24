# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.2.0] - _Unreleased_

### Added

- Cypress Visual Regression Testing - [cypress-plugin-snapshots](https://github.com/meinaart/cypress-plugin-snapshots)

### Changed

### Removed

### Fixed

## [1.1.1] - 2020-07-23

### 🖼️ Assets Fix

### Added

### Changed

### Removed

### Fixed

- `handshake.jpg` not being requested correctly

## [1.1.0] - 2020-07-23

### 🦸‍♂️ User Profiles and Saved Jobs

### Added

- Ability to create a new profile
- Ability to login
- Ability to reset your password
- Ability to edit profile information
- Ability to save your favorite jobs to your profile
- `<Navigation />` component
- `Login` page
- `Signup` page
- `SavedJobs` page
- `<Button />` component
- Additional Cypress Testing

### Changed

- Path for `Details` page is now `/jobs/:id` instead of `/:id`
- `<Input />` now has optional `autoComplete` and `type` props
- `JobCard` style is slightly different in regards to information displayed in columns vs. rows
- Website is now hosted on [www.githubjobs.io](www.githubjobs.io)

### Removed

### Fixed

## [1.0.0] - 2020-07-19

### 🚀 Initial Release

### Added

- `prettier`
- `eslint`
- Stubs for `optionsPanel.spec.js`
- Stubs for `search.spec.js`
- Test for `<Details />`

### Changed

- `<LoadingIndicator />` color better reflects theme
- The `<Header />` is now clickable, and will send you to the Search page
- `<JobCard />` won't display alert if image is missing

### Removed

### Fixed

- ESLint Errors
- Text in "How To Apply" section spilling over the container if a long url was present
- Clicking "Full Time" actually does filter by "Full Time" positions now. GitHub Jobs API for `full_time` does not work.

## [0.26.0] - 2020-07-17

### 🔧 Tweaks that Make Em Squeaks

### Added

### Changed

- JobCard class names to follow BEM better
- README

### Removed

- `gridjs-react`

### Fixed

- Location Search border radius are now even
- Copyright not having a space
- Align Company info in JobCard correctly
- `Details` not scrolling to top automatically
- `Details` will not scroll horizontally anymore

## [0.25.0] - 2020-07-17

### ✏️ Tweaky McTweakerson

### Added

- OptionsPanel tests
- Note if no results appear

### Changed

- If "How To Apply" is a single link, display a styled link
- Page title
- Page description
- Favicon
- If `company_url` exists, company title on `Details` page is rendered as a link
- `searchValue`, `fullTime` are retained in `ApplicationState`
- `<SearchInput />` contains a `form`, and can be submitted with `enter` key

### Removed

### Fixed

## [0.24.0] - 2020-07-17

### 🔧 Fixer Upper

### Added

- Additional tests

### Changed

### Removed

### Fixed

- `<Pagination />` out of alignment
- `<Pagination />` not re-rendering when `totalPages` changed
- `Search` not using correct URL

## [0.23.0] - 2020-07-16

### ✨ Backend

### Added

- Call to `/jobs` on the Backend
- Call to `/jobs/search` on the Backend

### Changed

- API logic on the FE to be on the BE

### Removed

- API logic on the FE
- constants file
- github.ts file

### Fixed

## [0.22.0] - 2020-07-16

### 📖 Paginatioon

### Added

- `<Pagination />` component
- Cypress testing

### Changed

- 5 jobs per "page"
- `jobs` gets set after setting the `currentPage` and `totalPages`

### Removed

### Fixed

## [0.21.0] - 2020-07-15

### 📄 Details

### Added

### Changed

- Details uses `jobs` to find job instead of hitting GitHub API again
- Use `dangerouslySetInnerHTML()` in favor of `react-markdown`

### Removed

`react-markdown`

### Fixed

## [0.20.0] - 2020-07-15

### 🗺️ LocationSearch

### Added

### Changed

- Incorporated LocationSearch into Redux

### Removed

### Fixed

## [0.19.0] - 2020-07-15

### 🔍 Search - Thunk

### Added

### Changed

- Search is now through a thunk, hitting the GitHub API

### Removed

- Search functionality within the `<SearchInput />` component local state

### Fixed

## [0.18.0] - 2020-07-15

### ⏳LoadingIndicator

### Added

- `<LoadingIndicator />` component

### Changed

- Loading state of application during initial request

### Removed

### Fixed

## [0.17.0] - 2020-07-15

### ⚛️ Redux

### Added

- Redux

### Changed

- State now moved into Redux and away from Hooks

### Removed

### Fixed

## [0.16.0] - 2020-07-14

### 🖌️ Mobile Optimize Details

### Added

### Changed

- Mobilie optimized css for Details page

### Removed

### Fixed

## [0.15.0] - 2020-07-14

### 🖌️ Mobile Optimize Search

### Added

### Changed

- Mobilie optimized css for Search page

### Removed

### Fixed

## [0.14.0] - 2020-07-14

### 📄 Details

### Added

- Styled `<Details />` component

### Changed

- Margins on Copyright

### Removed

### Fixed

## [0.13.0] - 2020-07-14

### ✏️ Copyright

### Added

- `<Copyright />` component

### Changed

### Removed

### Fixed

## [0.12.0] - 2020-07-14

### ✨ OptionsPanel

### Added

- `<OptionsPanel />` component
- `<Checkbox />` component
- `<Input />` component

### Changed

### Removed

### Fixed

## [0.11.0] - 2020-07-14

### 📄 Job Card

### Added

- `<JobCard />` component

### Changed

### Removed

### Fixed

## [0.10.0] - 2020-07-14

### 🔍 SearchInput

### Added

- Styled `<SearchInput />` component

### Changed

- `searchJobs()` functionality

### Removed

### Fixed

## [0.9.0] - 2020-07-13

### 🖌️ Header Style

### Added

- Header style
- Header component

### Changed

- App/Body style

### Removed

### Fixed

## [0.8.0] - 2020-07-13

### ◀️ Back Button

### Added

- Ability to return to Search from Details

### Changed

### Removed

### Fixed

## [0.7.0] - 2020-07-13

### 📝 Job Details

### Added

- React Router
- Job Details Page

### Changed

- Table rendering of job listing (temporary removal)

### Removed

### Fixed

## [0.6.0] - 2020-07-13

### 🔍 Search for a full-time job only

### Added

- FullTime search

### Changed

### Removed

### Fixed

## [0.5.0] - 2020-07-13

### ✅ Select one option from at least 4 pre-defined options

### Added

- Location Options
- `searchJobs()`
- `util.ts`

### Changed

### Removed

- Inidividual search function for location and description

### Fixed

## [0.4.0] - 2020-07-13

### 🗺️ Search for jobs with a city name, zip code or other location

### Added

- Location Search

### Changed

### Removed

### Fixed

## [0.3.0] - 2020-07-12

### 🔍 Search for jobs with a given keyword

### Added

- Search by keyword

### Changed

### Removed

### Fixed

## [0.2.0] - 2020-07-12

### ✨ See a list of jobs in a city by default

### Added

- [Grid](https://gridjs.io/docs/index).

### Changed

- Default api query includes hard coded "Los Angeles" as location.

### Removed

### Fixed

## [0.1.0] - 2020-07-12

### ✨ Get List of GitHub Jobs and Display Length

### Added

- Initial happy path to display length of jobs

### Changed

### Removed

### Fixed
