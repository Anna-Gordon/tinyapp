const bcrypt = require('bcrypt');

const isMatchUsers = function (obj, value) {
  for(let key in obj) {
      if (obj[key].email === value) {
      return true;
    }
  }
  return false;
}
// console.log(isMatchUsers(users, 'user4@example.com'));

const urlDatabase = {
  "b2xVn2": {longURL: "http://www.lighthouselabs.ca", userID: "userRandomID"},
  "9sm5xK": {longURL: "http://www.google.com", userID: "user2RandomID"}
};

const urlsForUser = (data, id) => {
  let shortURL;
  let longURL;

  for(let short in data) {
    shortURL = short;
    if (data[short].userID == id) {
      longURL = data[short].longURL;
    }
  }
  return [shortURL, longURL]; 
};

// console.log(urlsForUser(urlDatabase, 'user2RandomID'))

const users = {
  'userRandomID': {
    id: 'userRandomID',
    email: 'user@example.com',
    password: bcrypt.hashSync('test1', 10)
  },
  'user2RandomID': {
    id: 'user2RandomID', 
    email: 'user2@example.com', 
    password: bcrypt.hashSync('test2', 10)
  }
};


const getUserByEmail = (email, database) => {
  for(let key in database) {
    if (database[key].email === email) {
      return database[key].id;
    } else {
      return false;
    }
  }
};

console.log(getUserByEmail('user@example.com', users));
