# node-boilerplate

## Running the project

1. Be sure you have **docker/docker-compose** and **yarn** (or **npm**, if you use it) installed.
2. Clone the repository by running 
```bash 
git clone https://github.com/CITi-UFPE/node-boilerplate.git
```
3. Install all the dependencies by running
```bash 
yarn install
# or
npm install
```
4. Create a **.env** file and copy the following content to it:
```dotenv
# ###### GENERAL SETTINGS #######
PROJECT_NAME=boilerplate

# ###### SERVER SETTINGS #######
SERVER_PORT=3001

# ###### DATABASE SETTINGS #######
DATABASE_TYPE=postgres
DATABASE_HOST=boilerplate-db
DATABASE_PORT=5432
DATABASE_USER=postgres
DATABASE_PASSWORD=docker
DATABASE_DB=boilerplate

# ###### TEST DATABASE SETTINGS #######
DATABASE_TEST_HOST=localhost
DATABASE_TEST_PORT=5433
DATABASE_TEST_USER=postgres
DATABASE_TEST_PASSWORD=docker
DATABASE_TEST_DB=boilerplate-test

DATABASE_URL=${DATABASE_TYPE}://${DATABASE_USER}:${DATABASE_PASSWORD}@${DATABASE_HOST}:${DATABASE_PORT}/${DATABASE_DB}
```
  
5. To run the development server, run
```bash
docker-compose up
```

6. To run the migrations, run the server as described and on a new terminal, run:
```bash
yarn migration
```

7. Now the server should be running!
