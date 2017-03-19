[![Travis-CI](https://travis-ci.org/sgoldens/home_server.svg?branch=master)](https://travis-ci.org/sgoldens/home_server.svg?branch=master) [![JWT](http://jwt.io/assets/badge-compatible.svg)](http://jwt.io/assets/badge-compatible.svg)
# home_server

An authentication and authorization server employing JavaScript Web Tokens instead of cookies, and bcrypt'd encrypted passwords.

## To use this repository project:
1: clone the repo down, '''npm install''' in the project root directory.
2: Open '''config.js''' in the project root directory, uncomment the line for your '''secret''' key, and enter something unique and hard to guess as its value. Save and close.
3: Install MongoDB
4: Start the MongoDB server deamon or service, '''mongod'''
5: In the project root directory, start the server with the command '''npm run dev'''

### Tech stack:
  - MongoDB
  - Mongoose (ORM)
  - NodeJS
  - ExpressJS
  - morgan
  - body-parser
  - nodemon
  - passport(jwt)
