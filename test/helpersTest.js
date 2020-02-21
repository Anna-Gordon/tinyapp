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

// const urlDatabase = {
//   "b2xVn2": {longURL: "http://www.lighthouselabs.ca", userID: "userRandomID"},
//   "9sm5xK": {longURL: "http://www.google.com", userID: "user2RandomID"}
// };

describe('getUserByEmail', function() {

  it('should return a user with valid email', function() {
    const user = getUserByEmail("user@example.com", users);
    const expectedOutput = "userRandomID";
    assert.equal(user, expectedOutput);
  });

  it('should return error message if a user provided wrong email', function() {
    const user = getUserByEmail("userW@example.com", users);
    const expectedOutput = false;
    assert.equal(user, expectedOutput, "Bad request. Provide email or password");
  });

  it('should return array of objects if userID found in message urlDatabase', function() {
    const user = urlsForUser(urlDatabase, 'userRandomID') ;
    const expectedOutput = [{shortURL: "b2xVn2", longURL:"http://www.lighthouselabs.ca"}];
    assert.deepEqual(user, expectedOutput);
  });

  it('should return random shortURL 6 characters long', function() {
    const user = randomShortURL();
    const expectedOutput = 'WwWW1Q';
    assert.notEqual(user, expectedOutput);
  });

  // it('should return random shortURL 6 characters long', function() {
  //   const user = userObject(users, 'user@example.com') ;
  //   const expectedOutput = 'WwWW1Q';
  //   assert.deepEqual(user, expectedOutput);
  // });

});