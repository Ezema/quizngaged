describe('homepage loads', () =>{
    beforeEach(()=>{
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