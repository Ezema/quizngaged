describe('app should let teacher add classrooms', () =>{
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
    it('should login as teacher without trouble', () => {
        cy.teacher_login()
    })
    it('should confirm it is in the my-classrooms page', () => {
        cy.findByText(/my classroooms/i)
    })
    it('should find the add button and click it', () => {
        cy.findByRole('button', {  name: /add/i}).click()
    } )
    it('should confirm that the page has changed to "Add Classroom"', () => {
        cy.findByRole('banner').findByText(/add classroom/i);
    })
    it('should be able to add a name to the classroom', () => {
        cy.get('#__next > div > div:nth-child(2) > div > div > div:nth-child(2) > div')
        .findByRole('textbox', {  name: /enter name/i}).type("classroom 1")
        cy.findByRole('button', {  name: /next/i}).click()
    })
    it('should confirm that it is in the confirmation step of creating a classroom', () => {
        cy.findByRole('heading', { name: /confirm the data/i })
    })
    it('should be able to back out of an add-classroom interaction before finishing using back button', () => {
        cy.findByRole('button', { name: /back/i}).click()
        cy.findByRole('heading', { name: /Add a new Classroom/i} )
        cy.findByRole('button', { name: /back/i}).click()
    })
    it('should be able to back out of an add-classroom interaction with the back arrow button in top left', () => {
        cy.findByRole('button', {  name: /add/i}).click()
        cy.get('#__next > div > div:nth-child(2) > div > div > div:nth-child(2) > div')
        .findByRole('textbox', {  name: /enter name/i}).type("classroom 1")
        cy.findByRole('button', {  name: /next/i}).click()
        cy.findByRole('button', {  name: /menu/i}).click()
        cy.findByRole('button', {  name: /add/i})
        cy.log('confirmed that the add button is present once again')
    })
    it('should be able to add a classroom', () => {
        cy.findByRole('button', { name: /add/i}).click()
        cy.get('#__next > div > div:nth-child(2) > div > div > div:nth-child(2) > div')
        .findByRole('textbox', {  name: /enter name/i}).type("classroom 1")
        cy.findByRole('button', {  name: /next/i}).click()
        cy.findByRole('button', {  name: /finish/i}).click()
        cy.findByRole('heading', {  name: /classroom 1/i})
    })
    it('should be able to display an error message when classroom name is left blank', () => {
        cy.findByRole('button', {  name: /edit/i}).click()
        cy.get('#__next > div > div:nth-child(2) > div > div > div:nth-child(2) > div')
        .findByRole('textbox', {  name: /enter name/i}).clear()
        cy.findByText(/name cannot be blank/i)
    })
    it('should be able to edit classroom name', () => {
        cy.get('#__next > div > div:nth-child(2) > div > div > div:nth-child(2) > div')
        .findByRole('textbox', {  name: /enter name/i}).clear().type('editted classroom name')
        cy.findByRole('button', {  name: /next/i}).click()
        cy.findByRole('button', {  name: /finish/i}).click()
        cy.findByRole('heading', {  name: /editted classroom name/i})
    })
    it('should be able to add other classrooms', () => {
        let name = "classroom 2"
        cy.findByRole('button', {  name: /add/i}).click()
        cy.get('#__next > div > div:nth-child(2) > div > div > div:nth-child(2) > div')
        .findByRole('textbox', {  name: /enter name/i}).type(name)
        cy.findByRole('button', {  name: /next/i}).click()
        cy.findByRole('button', {  name: /finish/i}).click()
        cy.get('#__next > div > div').contains(name)
    })
    it('should display many classrooms in ui', () => {
        let classroomNames = ["Mathematics 6", "English 6", "Social Studies 6", "Science 6", "Personal Fitness 6", "Computers 6",
                            "Chemistry 11", "Introduction to Law 10", "Accounting 9", "Physics 11"]
        cy.add_classrooms(classroomNames)
        cy.end()
    })
    
})