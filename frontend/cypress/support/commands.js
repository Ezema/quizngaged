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
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
import '@testing-library/cypress/add-commands';

Cypress.Commands.add("clear_mysql_and_indexedDB", () => {
    cy.task('queryDb', 'DELETE FROM users;').then(result => {
        console.log('dropped all users entries drom sql database')
    })
    cy.task('queryDb', 'DELETE FROM classrooms;').then(result => {
        console.log('dropped all classrooms entries in sql database')
    })
    var dbDeleteRequest = window.indexedDB.deleteDatabase("firebaseLocalStorageDb");
    dbDeleteRequest.onerror= function(event) {
        console.log("error deleting indexedDB.")
    }
    dbDeleteRequest.onsuccess = function(event) {
        console.log("indexedDB deleted successfully")
    }
    const dbs = window.indexedDB.databases()
    dbs.then(databases => {
        if (databases.length == 0) {
            console.log("the indexedDB firebaseLocalStorageDb is empty")
        } //should log an empty array
    }) 
})