# Agile-g29 final deliverable

Agile module group 29 - "QuizNgaged" Application

### db

Contains the file to create a Docker container with a MySQL database.
The DB runs on the default MySQL port 3306
To run the DB
```bash
cd db
sudo docker-compose -f stack.yml up
```

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
