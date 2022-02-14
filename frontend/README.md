## Getting Started

### If you have missing sources and/or dependencies
* This is usually the case if new dependencies were added by a commit

```bash
npm install
```

### Run the development server

```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### To build the production version
* This is the case when you want to export the frontend to deploy it on AWS
```bash
npm run build
```

### Testing

Cypress has been used for end to end testing. The set up right now requires some manual resetting of the environment:

1. Make sure the Docker database, backend, and frontend are running already

To run the testing suite with cypress cd into /frontend
```bash
    npm run cypress_test
```
A graphical UI will pop up and is populated with a list of tests. A sample test named 'teacher_can_login.js' is at the bottom of that list.
Clicking it will launch the browser of choice displayed on the GUI window's top right corner. The test should run immediately.

To have an easier time with selecting components in react, Testing Playground Chrome extension was installed in Chrome to help aid with the selectors. To make use of this extension, @testing-library/cypress was added via npm to extend cypress' functionality. 

Note that 'screen.getByRole('...") becomes cy.findByRole('...')


