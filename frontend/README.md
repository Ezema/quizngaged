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

Because the uid varies each time, we can either query all user entries and specifically delete the user with 'hello@cypress.io'.
We can alternatively delete all users

```bash
    mysql -h127.0.0.1 -uroot -ppassword
```
```mysql
    USE appdb;
```
```mysql
    SELECT * FROM users;
```
Visually spot the uid of the user whose email is hello@cypress.io. This was a user that was created during the testing process. 
It persists within the firebase project somehow...
```mysql
    DELETE FROM users WHERE uid = 'uid of the user in question';
```
OR to clear all users from users table:
```mysql
    DELETE FROM users;
```

To run the testing suite with cypress cd into /frontend
```bash
    npm run cypress_test
```
A graphical UI will pop up and is populated with a list of tests. A sample test named 'test-one.js' is at the bottom of that list.
Clicking it will launch the browser of choice displayed on the GUI window's top right corner. The test should run immediately.

Subsequent runs of the test will fail if the localstorage and indexedDB have not been cleared from the browser that is running the test. There might be a programmatical way of doing this along with resetting the db through setting up an additional db connection, but is not implemented as of yet. These need to be manually reset. 

The Cypress documentation also says that localstorage is reset before each test is run, but I am not so sure this works as stated.

In addition to having to reset the localstorage and indexedDB in the browser, the database in mysql table 'users' will need to be cleared of the entry the test just made upon its successful run.

To have an easier time with selecting components in react, Testing Playground Chrome extension was installed in Chrome to help aid with the selectors. To make use of this extension, @testing-library/cypress was added via npm to extend cypress' functionality. 

Note that 'screen.getByRole('...") becomes cy.findByRole('...')


