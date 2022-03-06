// These are prototypes for 
// 1. Querying the database through a connection made through the cypress_test script
// 2. Deleting the indexedDB from the browser instance used to run the test

describe('it should be able to access the database', () => {
  
    it("should make a query without errors", ()=> {
        cy.task("queryDb", "select * from users;").then(result =>{ console.log(JSON.parse(result[0].userjson).email)})
    })
    it("should be able to delete indexedDB from browser", ()=> {
        // cy.visit("/")
        var dbDeleteRequest = window.indexedDB.deleteDatabase("firebaseLocalStorageDb");
        dbDeleteRequest.onerror= function(event) {
            console.log("error deleting indexedDB.")
        }
        dbDeleteRequest.onsuccess = function(event) {
            console.log("indexedDB deleted successfully")
        }
        const dbs = window.indexedDB.databases()
        dbs.then(databases => {
            console.log(databases) //should log an empty array
        }) 
    })
})