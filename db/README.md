## Introduction

The MySQL database runs inside a docker container.

## Requirements
* docker
* docker-compose
* sudo privileges

## Run the container

### With BASH
```bash
    sudo docker-compose -f stack.yml up
```
OR
```bash
    sudo docker-compose -f mac-stack.yml up
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
    npm run-script mac-start
```

## Connecting the CLI to the docker container

```bash
    mysql -h127.0.0.1 -uroot -pTest1234
```
OR
```bash
    npm run-script db-cli
```