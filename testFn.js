const users = {
  'userrandomID': {
    id: 'userRandomID',
    email: 'user@example.com',
    password: 'purple-monkey-dinosaur'
  },
  'user3RandomID': {
    id: 'user3RandomID', 
    email: 'user3@example.com', 
    password: 'dishwasher-funk'
  },
  'user4RandomID': {
    id: 'user4RandomID', 
    email: 'user4@example.com', 
    password: 'dishwasher-funk'
  },
  'user2RandomID': {
    id: 'user2RandomID', 
    email: 'user2@example.com', 
    password: 'dishwasher-funk'
  }
}

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
    if (data[short].userID !== id) {
      longURL = data[short].longURL;
    }
  }
  return [shortURL, longURL]; 
};

console.log(urlsForUser(urlDatabase, 'userRandomID'))
