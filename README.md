# TinyApp Project

TinyApp is a full stack web application built with Node and Express that allows users to shorten long URLs 🐌

## Final Product

!["Urls page"](https://github.com/SweetBeef555/tinyapp/blob/master/docs/urls-page.png?raw=true)
!["Edit longURL page"](https://github.com/SweetBeef555/tinyapp/blob/master/docs/shortURL-page.png?raw=true)

## Dependencies

- Node.js
- Express
- EJS
- bcrypt
- body-parser
- cookie-session


## Installing

- Install all dependencies (using the `npm install` command).
- Run the development web server using the `node express_server.js` command.


## Running the tests

How to test?

`$ npm install mocha chai --save-dev`

`$ npm test`

Packages used:

chai - assertion library for node.js and browser


## Features
- Register/Login page with email and password input fields
- Encrypts the new user's password
- Sets session cookies and deletes it when Logout
- Returns error messages if user submit wrong password
- User can generates a short URL for long URL and save it into URLs list
- Associate user can edit or delete items in URLs list
- Redirects to the corresponding long URL

## Built With

Express - Node.js web application framework
EJS - Embedded JavaScript templates

## Versioning

1.0.0

## Authors

Anna Guliaeva - Lighthouse Labs, 2020


