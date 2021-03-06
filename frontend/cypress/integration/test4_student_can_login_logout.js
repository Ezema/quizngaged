describe('app should allow student to log in and log out', () =>{
    before(() => {
        cy.clearLocalStorageSnapshot();
        cy.clear_mysql_and_indexedDB();
    })
    beforeEach(() => {
        cy.restoreLocalStorage();
    })
    afterEach(() => {
        cy.saveLocalStorage();
    })
    it('visits homepage', ()=>{
        cy.visit('/')
    })
    it('finds sign in with email button', () => {
        cy.findByRole('button', {  name: /sign in with email/i}).click()
    })
    it('types in username and password', () => {
        cy.get('#firebaseui_container > div > form > div:nth-child(2) > div > div:nth-child(1)').type('hello@Cypress.io', {log:false})
        cy.findByRole('button', {name: /next/i}).click()
        cy.findByLabelText(/password/i).type('testpassword1234', {log:false})
        cy.findByRole('button', {name: /sign in/i}).click()
    })
    it('navigates to create a student account', () => {
        cy.findByRole('button', {  name: /create student acccount/i}).click()
    })
    it('interacting with the role, name, and phone number fields does not give error', () => {
        cy.findByRole('textbox', {  name: /user type/i}).click().type("role change")
        cy.findByRole('textbox', {  name: /name/i}).click().type("name change")
        cy.findByRole('textbox', { name: /phone/i}).click().type("1234567890").clear()
    })
    it('submitting form to create student account', () => {
        cy.findByRole('button', {  name: /next/i}).click()
        cy.findByRole('button', { name: /confirm/i}).click()
    })
    it('redirects to the my classrooms page', () => {
        cy.findByText(/my classroooms/i)
    })
    it('activates the menu icon', () => {
        cy.findByTestId('MenuIcon').click()
    })
    it('finds the logout icon and logs out', () => {
        cy.findByTestId('LogoutIcon').click()
        cy.end()
    })    
})

describe('the app should allow a subsequent login', () => {
    before(() => {
        // cy.clearLocalStorageSnapshot();
        // cy.clear_mysql_and_indexedDB();
        cy.restoreLocalStorage
    })
    beforeEach(() => {
        cy.restoreLocalStorage();
    })
    afterEach(() => {
        cy.saveLocalStorage();
    })
    it('visits homepage', () => {
        cy.visit('/')
    })
    it('finds sign in with email button', () => {
        cy.findByRole('button', {  name: /sign in with email/i}).click()
    })
    it('types in username and password', () => {
        cy.get('#firebaseui_container > div > form > div:nth-child(2) > div > div:nth-child(1)').type('hello@Cypress.io', {log:false})
        cy.findByRole('button', {name: /next/i}).click()
        cy.findByLabelText(/password/i).type('testpassword1234', {log:false})
        cy.findByRole('button', {name: /sign in/i}).click()
    })
    it('confirms that it is in the my classrooms page', () => {
        cy.findByText(/my classroooms/i)
        cy.end()
    })
})