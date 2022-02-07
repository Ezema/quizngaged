## Introduction

The MySQL database runs inside a docker container.

## Requirements
* docker
* docker-compose
* sudo privileges

## Run the container

### With BASH
```bash
    sudo docker-compose -f docker-compose.yml up
```
OR
```bash
    sudo docker-compose -f docker-compose-ubuntu.yml up
```

### With NPM
```bash
    npm run start
```
OR
```bash
    npm run-script db
```
OR
```bash
    npm run-script ubuntu-start
```

## Connecting the CLI to the docker container

```bash
    mysql -h127.0.0.1 -uroot -ppassword
```
OR
```bash
    npm run-script db-cli
```

## Troubleshooting the DB

While developing the app, some changes made in either the frontend or backend might end up conflicting with the older version of the database structure that exists in the Docker container. A reset is required.

### 1. Drop and recreate the database table

Inside db folder run:
```bash
    docker-compose down -v
```
OR
```npm
    npm run-script drop-tables
```
Then
```bash
    docker-compose up -d
```
OR
```npm run-script recreate-tables
```


### 2. Clear browser local storage

Google Chrome:
Go to View -> Developer -> Developer Tools -> Application   Tab. Delete Key-Value pairs in 'Local Storage' and all databases from 'IndexedDB'.

Firefox:
Go to Tools -> Browser Tools -> Web Developer Tools -> Storage Tab. Delete Key-Value pairs from 'Local Storage' and from 'IndexedDB'.
