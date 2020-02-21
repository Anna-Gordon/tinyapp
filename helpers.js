const bcrypt = require('bcrypt');

// DATA================================================================================

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

const urlDatabase = {
  "b2xVn2": {longURL: "http://www.lighthouselabs.ca", userID: "userRandomID"},
  "9sm5xK": {longURL: "http://www.google.com", userID: "userRandomID"}
};

//HELPERS================================================================================

const randomShortURL = () => {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  for (let i = 0; i < characters.length; i++ ) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result.slice(0, 6);
}

const userObject = (obj, value) => {
  for(let key in obj) {
    if (obj[key].email === value) {
      return obj[key];
    }
  }
  return false;
}

const urlsForUser = (data, id) => {
  let shortURL;
  let longURL;
  const resultArr = []; 
  for(let short in data) {
    shortURL = short;
    if (data[short].userID === id) {
      longURL = data[short].longURL;
      resultArr.push({shortURL, longURL})
    }
  }
  return resultArr; 
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


const checkUser = (req, res) => {
  if (!req.session.user_id) {
    res.send('Go to login page');
  }
};

module.exports = { randomShortURL, userObject, urlsForUser, getUserByEmail, checkUser, users, urlDatabase }