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
    it('changes to the my quizzes screen', () => {
        cy.findByTestId('MenuIcon').click()
        cy.findByRole('button', {  name: /my quizzes/i}).click()
        cy.findByText(/my quizzes/i)
    })
    it('changes to the edit quiz screen', () => {
        cy.get('#__next > div > div > div > div > div:nth-child(1)')
        .findByRole('button', { name: /edit/i}).click()
        cy.findByRole('heading', {  name: /edit quiz/i})
    })
    it('form validation works as expected', () => {
        cy.findByRole('textbox', {  name: /enter a title for the quiz/i}).clear()
        cy.findByText(/title cannot be blank/i)
    })
    it('changes the title of quiz', () => {
        cy.findByRole('textbox', {  name: /enter a title for the quiz/i}).type("quiz1")
    })
    it('changes the quiz category', () => {
        cy.findByRole('textbox', {  name: /quiz category/i}).click().type('{downarrow}{enter}')
    })
    it('changes the questions included in quiz', () => {
        cy.get(':nth-child(1) > .MuiPaper-root > .MuiCheckbox-root > .PrivateSwitchBase-input').click()
        cy.findByRole('button', { name: /next/i}).click()
        cy.findByRole('button', { name: /finish/i}).click()
    })
    it('confirms that the quiz name has been changed', () => {
        cy.get('#__next > div > div').contains('quiz1')
    })
    
})