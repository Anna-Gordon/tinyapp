const randomShortURL = function generateRandomShortURL() {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  for (let i = 0; i < characters.length; i++ ) {
     result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result.slice(0, 6);
}

const users = {
  'userrandomID': {
    id: 'userRandomID',
    email: 'user@example.com',
    password: 'purple-monkey-dinosaur'
  },
  'user2RandomID': {
    id: 'user2RandomID', 
    email: 'user2@example.com', 
    password: 'dishwasher-funk'
  }
}

const express = require("express");
const PORT = 8080; // default port 8080
const bodyParser = require("body-parser");
var cookieParser = require('cookie-parser');
const app = express();


app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());
app.set('view engine', 'ejs');
function isLoggedIn(req, res, next) {
  if (username) {
    res.locals.username = 'username';
    return next();
  }
  res.redirect('/urls');
}

const userWithEmailExists = function (obj, value) {
  for(let key in obj) {
      if (obj[key].email === value) {
      return true;
    }
  }
  return false;
}

const urlDatabase = {
  "b2xVn2": "http://www.lighthouselabs.ca",
  "9sm5xK": "http://www.google.com"
};

/**
 * 
   app.get("/", (req, res) => {
     res.send("Hello!");
   });
 */

app.get('/urls', (req, res) => {
  let templateVars = { urls: urlDatabase,
    username: req.cookies['username']
   };
  res.render('urls_index', templateVars);
});

app.get('/register', (req, res) => {
  res.render('register_page');
});

app.post('/register', (req, res) => {
  
  // check if input was provided
  if (req.body.email === '' || req.body.password === '') {
    res.status(400).send('Bad request.  Provide email or password');
    res.redirect('/register')
  } 
  
  //check if email already exist
  if (userWithEmailExists(users, req.body.email)) {
    res.status(400).send('Bad request. User already exist');
  } else {
    let newUser = randomShortURL();
    users[newUser] = {
      id: newUser,
      email: req.body.email,
      password: req.body.password
    };
    res.cookie('user_id', newUser); 
    res.redirect('/urls');      
  }
  // console.log("here are:", users[req.cookies['user_id']], req.cookies['user_id'])
});

app.get("/urls/new", (req, res) => {
  let templateVars = {username: req.cookies['username']};
  res.render("urls_new", templateVars);
});

app.post("/urls/new", (req, res) => {
  //generates random shortURL, submit new short: long key-value pair to urlDatabase and redirects to urls_show page
  let shortURL = randomShortURL();
  urlDatabase[shortURL] = req.body.longURL;      
  res.redirect(`/urls/${shortURL}`);       
});

app.post('/login', (req, res) => {
  let username = req.body.username;
  res.cookie('username', `${username}`) 
  res.redirect('/urls')
});

app.post('/logout', (req, res) => {
  res.clearCookie('username');
  res.redirect('/urls');
});

app.get('/urls/:shortURL', (req, res) => {
  let templateVars = { shortURL: req.params.shortURL, longURL: urlDatabase[req.params.shortURL], username: req.cookies['username'] };
  res.render('urls_show', templateVars);
});

app.post('/urls/:shortURL', (req, res) => {
  let templateVars = { shortURL: req.params.shortURL, longURL: urlDatabase[req.params.shortURL], username: req.cookies['username'] };
  res.render('urls_show', templateVars);
});

app.post('/urls/:shortURL/update', (req, res) =>{
  urlDatabase[req.params.shortURL] = req.body.longURL;
  res.redirect('/urls');
});

app.post('/urls/:shortURL/delete', (req, res) => {
  delete urlDatabase[req.params.shortURL];
  res.redirect('/urls');
});

app.get("/u/:shortURL", (req, res) => {
  const longURL = urlDatabase[req.params.shortURL];
  res.redirect(longURL);
});

/**
 * 
   app.get("/urls.json", (req, res) => {
     res.json(urlDatabase);
   });
   
   app.get("/hello", (req, res) => {
     res.send("<html><body>Hello <b>World</b></body></html>\n");
   });
 */

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!`);
});