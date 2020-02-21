const { assert } = require('chai');
// const { randomShortURL, userObject, urlsForUser, getUserByEmail, checkUser, users, urlDatabase } = require('./helpers.js');

const { randomShortURL, userObject, urlsForUser, getUserByEmail, checkUser, users, urlDatabase } = require('../helpers.js');

const testUsers = {
  "userRandomID": {
    id: "userRandomID", 
    email: "user@example.com", 
    password: "purple-monkey-dinosaur"
  },
  "user2RandomID": {
    id: "user2RandomID", 
    email: "user2@example.com", 
    password: "dishwasher-funk"
  }
};

describe('getUserByEmail', function() {
  it('should return a user with valid email', function() {
    const user = getUserByEmail("user@example.com", users);
    const expectedOutput = "userRandomID";
    assert.equal(user, expectedOutput);
  });

  it('should return error message if a user didn\'t provide an email', function() {
    const user = getUserByEmail("user@example.com", users);
    const expectedOutput = "Bad request. Provide email or password";
    assert.equal(user, expectedOutput);
  });

  it('should return error message if a user didn\'t provide an email', function() {
    const user = getUserByEmail("user@example.com", users);
    const expectedOutput = "Bad request. Provide email or password";
    assert.equal(user, expectedOutput);
  });
});