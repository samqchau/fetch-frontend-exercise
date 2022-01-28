# Fetch Rewards Frontend Take-Home Exercise

## Overview

This application was built using React, Tailwind CSS, and TypeScript. A few unit tests were written with React Testing Library with Jest as the test runner, and Cypress.io was used to perform a single integration test. The application was deployed on Vercel. [https://fetch-frontend-exercise.vercel.app/](https://fetch-frontend-exercise.vercel.app/)

## Prerequisites

NPM, Git, Node.

## Scripts

### Clone

Navigate to a directory you want to work with this repo in.

```npm

git clone https://github.com/samqchau/fetch-frontend-exercise.git

```

### Install Dependencies

```npm

npm install

```

### DEV Envrionment

```npm

npm start

```

This will run the application on localhost:3000

### Build

```npm

npm run build

```

### React Testing Library

```npm

npm test

```

This command will run the React Testing Library tests.

### Cypress

```npm

npm run cypress:dev

```

This command will run the Cypress integration tests. Please wait a moment for the dev server to boot up before running the Cypress test. It should only take half a minute.

## Afterthoughts

* Some form of CI/CD probably through GitHub Actions
* Probably over complicated simple tasks, could've used a state management library instead (Redux / Context API).
* Definitely would refactor some parts of the code
* Could have split code differently. Files could get lost in directories. An alternative would have been to keep all related files near each other.
* Stronger client-side form validation
* Password visibility toggle
* Tailwind and react-select library style conflicts. If I had more time I would resolve this difference.
