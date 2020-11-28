# Express Auth Starter

Get started quickly with an express project that has a local authentication system built in.

It uses the ejs view engine, and sequelize as an ORM. The dev data connection is a sqlite3 database but because sequelize is a flexible ORM it should be able to map to any databse that sequelize supports.

## How to use

1. Shallow clone the repo into a folder of your choosing

`git clone --depth=1 https://github.com/tt93/express-local-auth-starter.git your-project-name`

2. Install dependencies via npm 

`cd ./your-project-name`
`npm i`

3. Create the database by running `_migrations/sync.js`

`node ./_migrations/sync.js`

After completing the above steps you should be able to run the express project and create a user. Go ahead and extend from there.