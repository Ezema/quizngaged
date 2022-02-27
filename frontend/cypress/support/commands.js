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
import "cypress-localstorage-commands"


Cypress.Commands.add("clear_mysql_and_indexedDB", () => {
    cy.task('queryDb', 'DELETE FROM users;').then(result => {
        console.log('deleted all users entries drom sql database')
    })
    cy.task('queryDb', 'DELETE FROM classrooms;').then(result => {
        console.log('deleted all classrooms entries in sql database')
    })
    cy.task('queryDb', 'DELETE FROM launched_quizzes;').then(result => {
        console.log('deleted all entries of launched_quizzes in sql database')
    })
    cy.task('queryDb', 'DELETE FROM user_quizzes;').then(result => {
        console.log('deleted all entries of user_quizzes in sql database')
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

Cypress.Commands.add("teacher_login", (registered=false) => {
    cy.visit('/')
    cy.findByRole('button', {  name: /sign in with email/i}).click()
    cy.get('#firebaseui_container > div > form > div:nth-child(2) > div > div:nth-child(1)').type('hello@Cypress.io')
    cy.findByRole('button', {name: /next/i}).click()
    cy.findByLabelText(/password/i).type('testpassword1234')
    cy.findByRole('button', {name: /sign in/i}).click()
    if (registered == false) {
        cy.findByRole('button', {  name: /create teacher acccount/i}).click()
        cy.findByRole('button', {  name: /next/i}).click()
        cy.findByRole('button', { name: /confirm/i}).click()
    }
    cy.findByText(/my classroooms/i)
})

Cypress.Commands.add("student_login", (sim_quiz='hello@Cypress.io') => {
    cy.visit('/')
    cy.findByRole('button', {  name: /sign in with email/i}).click()
    cy.get('#firebaseui_container > div > form > div:nth-child(2) > div > div:nth-child(1)').type(sim_quiz)
    cy.findByRole('button', {name: /next/i}).click()
    cy.findByLabelText(/password/i).type('testpassword1234')
    cy.findByRole('button', {name: /sign in/i}).click()
    cy.findByRole('button', {  name: /create student acccount/i}).click()
    cy.findByRole('button', {  name: /next/i}).click()
    cy.findByRole('button', { name: /confirm/i}).click()
    cy.findByText(/my classroooms/i)
})

/** assumes UI is already in the my-classrooms page 
 * takes in an array of strings and adds classrooms with names equal to each string element */ 
Cypress.Commands.add("add_classrooms", (classroomNames) => {
    classroomNames.forEach(classroomName => {
        cy.findByRole('button', {  name: /add/i}).click()
        cy.get('#__next > div > div:nth-child(2) > div > div > div:nth-child(2) > div')
        .findByRole('textbox', {  name: /enter name/i}).type(classroomName)
        cy.findByRole('button', {  name: /next/i}).click()
        cy.findByRole('button', {  name: /finish/i}).click()
        cy.get('#__next > div > div').contains(classroomName)
    })
})

/** assumes is logged in as a teacher and in the my-questions page 
 * takes in an array of strings and adds questions of type text-response with each string as the body of the question
*/
Cypress.Commands.add("add_text_response_questions", (questions) => {
    questions.forEach(question => {
        cy.findByTestId('AddIcon').click()
        cy.findByRole('textbox', {  name: /enter the question body/i}).type(question)
        cy.findByRole('textbox', {  name: /question type/i}).type('text').wait(1000).type('{downarrow}{enter}')
        cy.findByRole('button', { name: /next/i}).click()
        cy.findByRole('button', { name: /next/i}).click()
        cy.findByRole('button', { name: /finish/i}).click()
        cy.get('#__next > div > div').contains(question)
    })
})

/** assumes is logged in as teacher and in the my classrooms page 
 * takes in an array of questions, and creates a quiz 
*/
Cypress.Commands.add("add_quizz", (questionsArray, quizname) => {
    // cy.teacher_login()
    cy.findByTestId('MenuIcon').click()
    cy.findByRole('button', {  name: /my questions/i}).click()
    cy.findByText(/my questions/i).should('be.visible')
    cy.add_text_response_questions(questionsArray)
    cy.findByTestId('MenuIcon').click()
    cy.findByRole('button', {  name: /my quizzes/i}).click()
    cy.get('#__next > div > header:nth-child(1) > div').should("contain.text", "My Quizzes")
    cy.findByText(/my quizzes/i)
    cy.findByRole('button', {  name: /add/i}).click()
    cy.get('#__next > div > header > div').contains(/add quiz/i)
    cy.findByRole('textbox', {  name: /enter a title for the quiz/i}).scrollIntoView().type(quizname)
    // cy.findByRole('textbox', {  name: /quiz category/i}).type('{downarrow}{downarrow}{enter}')
    cy.get('#__next > div > div:nth-child(2) > div > div > div:nth-child(2) > div > div:nth-child(2) > div:nth-child(3) > div > div > div').type('{downarrow}').wait(1000).type('{enter}')
        for ( let i = 1; i <questionsArray.length+1; i++){
        cy.get(`:nth-child(${i}) > .MuiPaper-root > .MuiCheckbox-root > .PrivateSwitchBase-input`).click()
    }
    cy.findByRole('button', { name: /next/i}).click()
    cy.findByRole('button', { name: /finish/i}).wait(3000).click()
    cy.get('#__next > div > div > div').should('contain', quizname)
})

