const express = require("express");
const PORT = 8080; // default port 8080
const bodyParser = require("body-parser");
const cookieSession = require('cookie-session');
const bcrypt = require('bcrypt');
const app = express();
const { randomShortURL, userObject, urlsForUser, getUserByEmail, checkUser, users, urlDatabase } = require('./helpers.js');
const urlRoutes = require('./routes/urls');

//MIDDLEWARE==============================================================================================

app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(cookieSession({
  name: 'session',
  keys: ['mySecretCookie']
}))
app.use('/urls', urlRoutes);


// '/REGISTER ===============================================================================================

app.get('/register', (req, res) => {
  let templateVars = {
    urls: urlDatabase,
    user: req.session.user_id
  };
  res.render('register_page', templateVars);
});

app.post('/register', (req, res) => {
  // check if input was provided
  if (req.body.email === '' || req.body.password === '') {
    res.status(400).send('Bad request.  Provide email or password');
    res.redirect('/register')
  }
  //check if email already exist
  let user = userObject(users, req.body.email);
  if (getUserByEmail(user.email, users)) {
    res.status(400).send('Bad request. User already exist');
  } else {
    let newUser = randomShortURL();
    users[newUser] = {
      id: newUser,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 10)
    };
    req.session.user_id = users[newUser].id;
    res.redirect('/urls');
  }
});

// '/LOGIN ============================================================================================

app.get('/login', (req, res) => {
  let templateVars = {
    urls: urlDatabase,
    user: req.session.user_id
  };
  res.render('login_page', templateVars);
})

app.post('/login', (req, res) => {
  if (req.body.email === '' || req.body.password === '') {
    res.status(400).send('Bad request.  Provide email or password');
    res.redirect('/register')
  }

  //check if user exists
  let user = userObject(users, req.body.email)
  if (getUserByEmail(user.email, users)) {
    bcrypt.compare(req.body.password, user.password, (err, result) => {
      req.session.user_id = user.id;
      if (result) {
        res.redirect('/urls')
      } else {
        res.status(403).send('Wrong password');
      }
    })
  } else {
    res.status(403).send('User is not found');
  }
});

// /LOGOUT=================================================================================================

app.post('/logout', (req, res) => {
  req.session = null;
  res.redirect('/login');
});

// /U/:shortURL==========================================================================================

app.get("/u/:shortURL", (req, res) => {
  let templateVars = { shortURL: req.params.shortURL, longURL: urlDatabase[req.params.shortURL].longURL, user: users[req.session.user_id] };
  res.render('urls_show', templateVars);
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!`);
});