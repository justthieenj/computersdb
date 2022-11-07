# Computers DB - Playwright

## Setup

- Clone source code
- Install [nodejs](https://nodejs.org/en/)
- Install dependencies `npm install`
- Install supported browsers `npx playwright install`

## Running tests ([docs](https://playwright.dev/docs/running-tests))

- Running all tests `npx playwright test`
- Running a single test file `npx playwright test create.spec.ts`
  - run with specific browser profile `--project=chromium`
- Running via npm scripts
  - `npm run test` - runs all tests in parallel
  - run test via CRUD file
    - `npm run test:create`
    - `npm run test:read`
    - `npm run test:update`
    - `npm run test:delete`

## View report

To open last report run: `npx playwright show-report`
