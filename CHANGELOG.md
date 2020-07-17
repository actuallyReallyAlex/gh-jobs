# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.25.0] - _Unreleased_

### Added

### Changed

- If "How To Apply" is a single link, display a styled link
- Page title
- Page description
- Favicon
- If `company_url` exists, company title on `Details` page is rendered as a link

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
