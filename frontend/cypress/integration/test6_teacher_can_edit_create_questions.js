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
        let questionsArray = ["question to be edited"]
        cy.add_text_response_questions(questionsArray)
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
        cy.get(/question body cannot be blank/i)
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
        cy.get('#__next > div > div').should('not.have.value', 'custom test question 1')
    })
    it('adding a multiple choice question by first making a text response question', () => {
        cy.findByText(/my questions/i).should('be.visible')
        let questionsArray = ["multiple choice question 1"]
        cy.add_text_response_questions(questionsArray)
    })
    it('edit the text response question to become multple choice', () => {
        cy.get('#__next > div > div > div > div > div:nth-child(1) > div')
        .findByRole('button', { name: /edit/i}).click()
        cy.findByRole('textbox', {  name: /question type/i}).type('{uparrow}{enter}')
    })
    it('should not allow empty answers', () => {
        cy.findByRole('button', { name: /next/i}).click()
        cy.findByText(/empty answers are not allowed/i)
    })
    it('should not allow just one answer in multiple choice questions', () => {
        cy.get('#__next > div > div:nth-child(2) > div > div > div:nth-child(2) > div > div:nth-child(2) > div:nth-child(5) > div:nth-child(1) > div > div:nth-child(1)').type('multiple choice answer 1')
        cy.findByRole('button', { name: /next/i}).click()
        cy.findByText(/empty answers are not allowed/i)
    })
    it('should not allow an unselected correct answer for multple choice questions', () => {
        cy.get('#__next > div > div:nth-child(2) > div > div > div:nth-child(2) > div > div:nth-child(2) > div:nth-child(5) > div:nth-child(1) > div > div:nth-child(2)').type('multiple choice answer 2')
        cy.findByRole('button', { name: /next/i}).click()
        cy.findByText(/please select the correct answer/i)
    })
    it('should not allow an empty answer set to be attached to a multiple choice question', () => {
        cy.get(':nth-child(1) > [style="max-width: 2em;"] > .MuiCheckbox-root > .PrivateSwitchBase-input').click()
        cy.get(':nth-child(1) > .css-x2v4aq-MuiGrid-root > .MuiButtonBase-root > [data-testid="HighlightOffIcon"] > path').click()
        cy.get(':nth-child(1) > .css-x2v4aq-MuiGrid-root > .MuiButtonBase-root > [data-testid="HighlightOffIcon"] > path').click()
        cy.findByRole('button', { name: /next/i}).click()
        cy.findByText(  /multichoice questions should have at least 2 possible answers/i)
    })
    it('finish the regular level multiple choice question entry', () => {
        cy.findByRole('button', {  name: /add answer/i}).click()
        cy.get('#__next > div > div:nth-child(2) > div > div > div:nth-child(2) > div > div:nth-child(2) > div:nth-child(5) > div:nth-child(1) > div > div:nth-child(1)').type('multiple choice answer 1')
        cy.findByRole('button', {  name: /add answer/i}).click()
        cy.get('#__next > div > div:nth-child(2) > div > div > div:nth-child(2) > div > div:nth-child(2) > div:nth-child(5) > div:nth-child(1) > div > div:nth-child(2)').type('multiple choice answer 2')
        cy.get(':nth-child(1) > [style="max-width: 2em;"] > .MuiCheckbox-root > .PrivateSwitchBase-input').click()
        cy.findByRole('button', { name: /next/i}).click()
    })
    it('easier question entry should trigger same form validation alerts', () => {
        cy.get('#__next > div > div:nth-child(2) > div > div > div:nth-child(2) > div > div:nth-child(2) > div:nth-child(2) > div > div').type('easier mc question')
        cy.findByRole('button', { name: /next/i}).click()
        cy.findByText(/multichoice questions should have at least 2 possible answers/i)
        cy.findByRole('button', {  name: /add answer/i}).click()
        // cy.get('#__next > div > div:nth-child(2) > div > div > div:nth-child(2) > div > div:nth-child(2) > div:nth-child(5) > div:nth-child(1) > div > div').type('easier mc answer 1')
        cy.get('#__next > div > div:nth-child(2) > div > div > div:nth-child(2) > div > div:nth-child(2) > div:nth-child(5) > div:nth-child(1) > div > div:nth-child(1)').type('easier mc answer 1')
        cy.findByRole('button', {  name: /add answer/i}).click()
        // cy.get('#__next > div > div:nth-child(2) > div > div > div:nth-child(2) > div > div:nth-child(2) > div:nth-child(5) > div:nth-child(2) > div > div').type('easier mc answer 2')
        cy.get('#__next > div > div:nth-child(2) > div > div > div:nth-child(2) > div > div:nth-child(2) > div:nth-child(5) > div:nth-child(1) > div > div:nth-child(2)').type('easier mc answer 2')
        cy.findByRole('button', {  name: /next/i}).click()
        cy.findByText(/please select the correct answer/i)
        cy.get(':nth-child(1) > [style="max-width: 2em;"] > .MuiCheckbox-root > .PrivateSwitchBase-input').click()
        cy.findByRole('button', {  name: /next/i}).click()
        cy.findByRole('button', { name: /finish/i}).click()
    })
    it('confirms that the multiple choice question has been added to the my questions view', () => {
        cy.findByRole('heading', {  name: /multiple choice question 1/i})
    })
    it('the user interface supports adding multiple questions', () => {
        let questionsArray = ["question1", "question2", "question3", "question4", "question5", "question6", "question7", "question8", "question9", "question10"]
        cy.add_text_response_questions(questionsArray)
        cy.end()
    })
})