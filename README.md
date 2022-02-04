# Agile-g29 final deliverable

Agile module group 29 - "QuizNgaged" Application

## Rules

* Only commit to main changes that are finished and don't break the access to the overall app

## Issues?

### Troubleshooting issues with docker
In the db folder
1. sudo docker-compose down -v
2. docker-compose up -d

### Troubleshooting issues with the app

With the docker container not running and the APIServer not running:
1. git checkout main
2. git pull
3. check that you have the latest changes
4. run the docker DB and connect to the database with:
    ```bash
    sudo mysql -h127.0.0.1 -uroot -pppassword
    ```
5. drop the table users and the table classrooms
6. in chrome dev tools go to the application tab and remove all content (children too!) from localStorage and from the indexedDB that firebase uses
7. run the APIServer and check that it gets connected to the DB

## Folders
### db

Contains the file to create a Docker container with a MySQL database.
More about this on its README.md file

### backend

Code for server logic
More about this on its README.md file

### frontend

Contains the frontend react application
More about this on its README.md file
