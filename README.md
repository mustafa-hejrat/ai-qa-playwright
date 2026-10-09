# AI QA Playwright Automation

A portfolio project demonstrating UI and API test automation using Playwright and TypeScript.

## Project Overview

This project contains automated tests for web application workflows and REST API behavior. It demonstrates practical skills in test design, assertions, negative testing, and cross-browser testing.

## Tech Stack

* **Playwright** — browser and API test automation
* **TypeScript** — test scripting
* **Node.js and npm** — project runtime and package management
* **Git and GitHub** — version control and portfolio hosting
* **SauceDemo** — sample e-commerce application for UI tests
* **JSONPlaceholder** — sample REST API for API tests

## Test Coverage

### UI Testing

* User login and application navigation
* Product selection and shopping cart
* Successful checkout workflow
* Checkout validation when required fields are missing
* Negative test scenarios

### API Testing

* Create a user and retrieve an existing user
* Update an existing user
* Delete a user
* Request a nonexistent user
* HTTP status code, response header, and response body validation
* User data and email format assertions

> Note: JSONPlaceholder is a simulated REST API. Create, update, and delete requests demonstrate API behavior; they do not permanently modify a real database.

## Cross-Browser Testing

The project is configured to run tests in:

* Chromium
* Firefox
* WebKit

## Getting Started

### Prerequisites

Install Node.js and npm before running the project.

### Install dependencies

```bash
npm install
```

### Run all tests

```bash
npx playwright test --workers=1
```

### Run a specific test file

```bash
npx playwright test tests/api-user-flow.spec.ts --workers=1
```

```bash
npx playwright test tests/checkout.spec.ts --workers=1
```

### View the HTML report

```bash
npx playwright show-report
```

## Project Structure

```text
AI-QA-playwright/
|-- .github/
|-- pages/
|-- tests/
|   |-- api-user-flow.spec.ts
|   |-- checkout.spec.ts
|   |-- negative-checkout.spec.ts
|-- playwright.config.ts
|-- package.json
|-- package-lock.json
|-- README.md
```

*The test file names above are examples of the current project structure and can be updated if the repository changes.*

## Skills Demonstrated

* UI test automation
* REST API testing
* Positive and negative test scenarios
* Assertions and response validation
* Cross-browser execution
* TypeScript
* Test execution and HTML reporting
* Git version control

## Project Goal

To demonstrate practical QA automation skills and build a maintainable test suite that can be extended with additional UI, API, and regression tests.
