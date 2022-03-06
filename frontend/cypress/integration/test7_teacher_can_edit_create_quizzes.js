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
    })
    it('can create questions', () => {
        cy.findByText(/my questions/i).should('be.visible')
        let questionsArray = ["quiz question 1", "quiz question 2", "quiz question 3", "quiz question 4", "quiz question 5"]
        cy.add_text_response_questions(questionsArray)
    })
    it('changes to the my quizzes screen', () => {
        cy.findByTestId('MenuIcon').click()
        cy.findByRole('button', {  name: /my quizzes/i}).click()
        cy.get('#__next > div > header:nth-child(1) > div').should("contain.text", "My Quizzes")
    })
    it('changes to the add quiz screen', () => {
        cy.findByText(/my quizzes/i)
        cy.findByRole('button', {  name: /add/i}).click()
        cy.get('#__next > div > header > div').contains(/add quiz/i)
    })
    it('the form validation is triggered with a blank quiz title', () => {
        cy.findByRole('button', { name: /next/i}).click()
        cy.findByText(/quiz title cannot be blank/i)
    })
    
    it('finds the quiz title text entry box and enters quiz title', () => {
        cy.findByRole('textbox', {  name: /enter a title for the quiz/i}).type('quiz number 1')
        cy.get('#__next > div > div:nth-child(2) > div > div > div:nth-child(2) > div > div:nth-child(2) > div:nth-child(3) > div > div > div').type('{downarrow}').wait(1000).type('{enter}')
    })
    it('the form validation disallows quizzes with no questions', () => {
        cy.findByRole('button', { name: /next/i}).click()
        cy.findByText(/a quiz must include at least one question/i)
    })
    it('selects a set of questions to include in quiz', () => {
        cy.get(':nth-child(1) > .MuiPaper-root > .MuiCheckbox-root > .PrivateSwitchBase-input').click()
        cy.get(':nth-child(2) > .MuiPaper-root > .MuiCheckbox-root > .PrivateSwitchBase-input').click()
        cy.get(':nth-child(3) > .MuiPaper-root > .MuiCheckbox-root > .PrivateSwitchBase-input').click()
        cy.get(':nth-child(4) > .MuiPaper-root > .MuiCheckbox-root > .PrivateSwitchBase-input').click()
        cy.findByRole('button', { name: /next/i}).click()
    })
    it('going back on the transaction will effectively end the add quiz interaction', () => {
        cy.findByRole('button', { name: /back/i}).click()
        cy.findByRole('button', { name: /back/i}).click()
        cy.get('#__next > div > div > div').should('not.contain', 'quiz number 1')
    })
    it('adds a quiz effectively', () => {
        cy.findByRole('button', {  name: /add/i}).click()
        cy.get('#__next > div > header > div').contains(/add quiz/i)
        cy.findByRole('textbox', {  name: /enter a title for the quiz/i}).type('quiz number 1')
        cy.get(':nth-child(1) > .MuiPaper-root > .MuiCheckbox-root > .PrivateSwitchBase-input').click()
        cy.get(':nth-child(2) > .MuiPaper-root > .MuiCheckbox-root > .PrivateSwitchBase-input').click()
        cy.get(':nth-child(3) > .MuiPaper-root > .MuiCheckbox-root > .PrivateSwitchBase-input').click()
        cy.get(':nth-child(4) > .MuiPaper-root > .MuiCheckbox-root > .PrivateSwitchBase-input').click()
    })
    it('changes to the edit quizz screen', () => {
        cy.findByRole('button', { name: /next/i}).click()
        cy.findByRole('button', { name: /finish/i}).click()
        cy.get('#__next > div > div > div').should('contain', 'quiz number 1')
        cy.get('#__next > div > div > div').should('contain', 'quiz number 1')
        cy.get('#__next > div > div > div > div > div:nth-child(1)')
        .findByRole('button', { name: /edit/i}).wait(2000).click()
        cy.get(':nth-child(2) > .MuiPaper-root > .MuiCheckbox-root > .PrivateSwitchBase-input').click()
        cy.get(':nth-child(3) > .MuiPaper-root > .MuiCheckbox-root > .PrivateSwitchBase-input').click()
        cy.get(':nth-child(4) > .MuiPaper-root > .MuiCheckbox-root > .PrivateSwitchBase-input').click()
        cy.findByRole('textbox', {  name: /enter a title for the quiz/i}).clear()
        cy.findByRole('textbox', {  name: /enter a title for the quiz/i}).type('editted quiz attempt 2')
        cy.findByRole('button', { name: /next/i}).click()
        cy.findByRole('button', { name: /finish/i}).click()
        cy.get('#__next > div > div > div > div > div:nth-child(1) > div').should('contain', 'editted quiz attempt 2')
        cy.get('#__next > div > div > div > div > div:nth-child(1) > div').should('contain', 'Number of questions: 1')
        cy.get('#__next > div > div > div > div > div:nth-child(1)')
        .findByRole('button', { name: /delete/i}).click()
        cy.get('.MuiDialogActions-root > .MuiButton-textError').click()
        cy.get('#__next > div > div > div').should('not.contain', 'editted quiz attempt 2')
        cy.end()        
    })    
})