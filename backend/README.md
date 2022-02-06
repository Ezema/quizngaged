## Getting Started

### Background

* The <b>static server</b> will only be used to serve the static version of the React webapp. It will run on ports 80 (HTTP) and 443 (HTTPS) when deployed on AWS.
This static server doesn't need to be used at all while the app is under development, instead run in the <b>frontend</b> folder:

    ```bash
    npm run dev
    ```
* The <b>API server</b> will be used both on AWS and while the app is underdevelopment running locally (localhost). It will run on port 9090 and will answer to all the (POST )queries made by the frontend application.

### If you have missing sources and/or dependencies
* This is usually the case if new dependencies were added by a commit

```bash
npm install
```

### Run both the API and the static server

#### With BASH
```bash
node static-frontend-server.js && node APIServer.js
```
#### With NPM
```bash
    npm run servers
```
OR
```bash
    npm run API
```
OR
```bash
    npm run APIServer
```
<!-- section below is deprecated due to change in data schema>
<!-- ### First create the database schema and populate it with initial test data
navigate to ./db/design, where create_db.sql and initial_test_data.sql files are:
```bash
cd ./db/design
```

navigate to ./db/design, where create_db.sql and initial_test_data.sql files are:
```bash
cd ./db/design
```
connect mysql to docker database:

```bash
mysql -h127.0.0.1 -uroot -ppassword
``` -->

<!-- run script to create the schema (in db/design folder):

```bash
mysql> use appdb;
mysql> source create_db.sql
``` -->

<!-- run script to populate the test data (in db/design folder):

```bash
mysql> source initial_test_data.sql
``` -->
