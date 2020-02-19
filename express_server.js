const randomShortURL = function generateRandomShortURL() {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  for (let i = 0; i < characters.length; i++ ) {
     result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result.slice(0, 6);
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