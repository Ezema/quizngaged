// ***********************************************************
// This example support/index.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands'

// Alternatively you can use CommonJS syntax:
// require('./commands')
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