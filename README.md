# agile-g29

Agile module group 29 - QuizNgaged

### db

Contains sample file to create a Doker image of database and set adminer to be able to check the DB
To create an image
cd db
docker-compose -f stack.yml up

### app

Code for server logic
To make it work the file db.conf.js needs to be created
with content
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
};

to run node server
cd app
node server.js

Application should be available on port :8080

### front

folder that contains frontend react application
