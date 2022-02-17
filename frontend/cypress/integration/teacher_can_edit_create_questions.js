describe('teacher can create quiz questions', () =>{
    before(() => {
        cy.clearLocalStorageSnapshot()
        cy.clear_mysql_and_indexedDB()
    })
    beforeEach(() => {
        cy.restoreLocalStorage()
    })
    afterEach(() => {
        cy.saveLocalStorage()
    })
    it('logins as teacher', ()=>{
        cy.teacher_login()
    })
    it('changes to the my questions screen', () => {
        cy.findByTestId('MenuIcon').click()
        cy.findByRole('button', {  name: /my questions/i}).click()
        cy.findByText(/my questions/i)
    })
    it('selects a question to edit', () => {
        
        cy.get('#__next > div > div > div > div > div:nth-child(1) > div')
        .findByRole('button', { name: /edit/i}).click()
    })
    it('confirms that it has arrived at the edit question view', () => {
        cy.findByText(/edit question/i)
    })
    it('the form validation on edit question page works with erroneous input', () => {
        cy.findByRole('textbox', {  name: /enter the question body/i}).clear()
        cy.findByText(/question body cannot be blank/i)
        cy.findByRole('textbox', { name: /enter the question body/i}).type('custom test question 1')
        cy.findByRole('textbox', {  name: /question type/i}).clear().type('{esc}')
        cy.findByRole('button', { name: /next/i}).click()
        cy.get(/question type is invalid/i)
        cy.findByRole('textbox', {  name: /question type/i}).type('{downarrow}{downarrow}{enter}')
        cy.findByRole('button', { name: /next/i}).click()
        cy.findByText(/optional: enter an easier version of the question/i)
        cy.findByRole('button', { name: /next/i}).click()
        cy.findByText(/optional: enter a harder version of the question/i)
        cy.findByRole('button', { name: /finish/i}).click()
        cy.get('#__next > div > div').contains('custom test question 1')
    })
    it('confirmation dialog is displayed when deletion of a question is requested', () => {
        cy.get('#__next > div > div > div > div > div:nth-child(1) > div')
        .findByRole('button', {name: /delete/i}).click()
    })
    it('deletes the question', () => {
        cy.get('#alert-dialog-description')
        cy.findByRole('button', {  name: /delete/i}).click()
    })
    it('questions view can be empty', () => {
        cy.get('#__next > div > div > div > div > div:nth-child(1) > div')
        .findByRole('button', {name: /delete/i}).click()
        cy.get('#alert-dialog-description')
        cy.findByRole('button', {  name: /delete/i}).click()
    })
    it('can create questions', () => {
        let questionsArray = ["question1", "question2", "question3", "question4", "question5", "question6", "question7", "question8", "question9", "question10"]
        cy.add_text_response_questions(questionsArray)
    })
})