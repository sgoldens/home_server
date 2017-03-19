[![Travis-CI](https://travis-ci.org/sgoldens/home_server.svg?branch=master)](https://travis-ci.org/sgoldens/home_server.svg?branch=master) [![JWT](http://jwt.io/assets/badge-compatible.svg)](http://jwt.io/assets/badge-compatible.svg)
# home_server

An authentication and authorization server employing JavaScript Web Tokens instead of cookies, and bcrypt'd encrypted passwords.

## To use this repository project:

#### 1: clone the repo down into the project root directory
```javascript
git clone git@github.com:sgoldens/home_server
npm install
```
#### 2: Open ```/config.js``` and uncomment the line for your ```secret``` key. Enter something unique and hard to guess as its value. Save and close.
#### 3: Install MongoDB from their site https://www.mongodb.com/download-center?jmp=nav or homebrew if you're on macOS X installation using homebrew:
```
brew update
brew install mongodb
mkdir -p /data/db
```
Other documentation here: https://docs.mongodb.com/master/tutorial/
#### 4: Start the MongoDB server service, ```mongod```
#### 5: In the project root directory, start the server with the command ```npm run dev```
#### 6: Open your browser and navigate to [http://localhost:8020/](http://localhost:8020/)

##### Tech stack:
  - MongoDB
  - Mongoose (ORM)
  - NodeJS
  - ExpressJS
  - morgan
  - body-parser
  - nodemon
  - passport(jwt)
