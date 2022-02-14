describe('homepage loads', () =>{
    beforeEach(()=>{
        // cy.task('queryDb', 'DELETE FROM users;').then(result => {
        //     console.log('dropped all users entries drom sql database')
        // })
        // cy.task('queryDb', 'DELETE FROM classrooms;').then(result => {
        //     console.log('dropped all classrooms entries in sql database')
        // })
        // var dbDeleteRequest = window.indexedDB.deleteDatabase("firebaseLocalStorageDb");
        // dbDeleteRequest.onerror= function(event) {
        //     console.log("error deleting indexedDB.")
        // }
        // dbDeleteRequest.onsuccess = function(event) {
        //     console.log("indexedDB deleted successfully")
        // }
        // const dbs = window.indexedDB.databases()
        // dbs.then(databases => {
        //     if (databases.length == 0) {
        //         console.log("the indexedDB firebaseLocalStorageDb is empty")
        //     } //should log an empty array
        // }) 
        // a more neatly packaged function than the commands above, described in ../support/commands.js : 
        cy.clear_mysql_and_indexedDB();
    })
    it('allows registration as a teacher', ()=>{
        cy.visit('/')
        cy.findByRole('button', {  name: /sign in with email/i}).click()
        cy.get('#firebaseui_container > div > form > div:nth-child(2) > div > div:nth-child(1)').type('hello@Cypress.io')
        cy.findByRole('button', {name: /next/i}).click()
        cy.findByLabelText(/password/i).type('testpassword1234')
        cy.findByRole('button', {name: /sign in/i}).click()
        cy.findByRole('button', {  name: /create teacher acccount/i}).click()
        cy.findByRole('button', {  name: /next/i}).click()
        cy.findByRole('button', { name: /confirm/i}).click()
    })
    
})