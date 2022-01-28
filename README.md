# Agile-g29 final deliverable

Agile module group 29 - "QuizNgaged" Application

### db

Contains sample file to create a Doker image of database and set adminer to be able to check the DB
To create an image
cd db
docker-compose -f stack.yml up

### backend

Code for server logic

To make it work the file db.conf.js needs to be created
with the following content:

```javascript
module.exports = {
    HOST: "localhost",
    PORT: XXXX, // what port db is available ex: 8084
    USER: "XXXX", // the username for DB user
    PASSWORD: "XXXX", //password for the DB user
    DB: "XXXX", // db name example: appdb
    dialect: "mysql",
    pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
}
```
#### Running node/express server
cd backend
node server.js

The server should be running on http://localhost:8080

### frontend

Contains the frontend react application
