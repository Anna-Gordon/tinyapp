const { assert } = require('chai');
const { randomShortURL, userObject, urlsForUser, getUserByEmail, users, urlDatabase } = require('../helpers.js');


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
    const user = urlsForUser(urlDatabase, 'userRandomID');
    const expectedOutput = [{shortURL: "b2xVn2", longURL:"http://www.lighthouselabs.ca"}];
    assert.deepEqual(user, expectedOutput);
  });

  it('should return random shortURL 6 characters long', function() {
    const user = randomShortURL();
    const expectedOutput = 'WwWW1Q';
    assert.notEqual(user, expectedOutput);
  });

  it('should return false if user object for email doesn\t exist', function() {
    const user = userObject(users, "user3@example.com");
    const expectedOutput = false;
    assert.equal(user, expectedOutput);
  });

});