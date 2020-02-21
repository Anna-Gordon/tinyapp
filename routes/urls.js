
const routes = require('express').Router();
const { randomShortURL, urlsForUser, checkUser, users, urlDatabase } = require('../helpers.js');

// /===================================================================================================

routes.get('/', (req, res) => {
  checkUser(req, res);
  let templateVars = {
    urls: urlsForUser(urlDatabase, req.session.user_id),
    user: users[req.session.user_id]
  };
  res.render('urls_index', templateVars);
});

// 'NEW ===========================================================================================

routes.get("/new", (req, res) => {
  checkUser(req, res);
  let templateVars = { user: users[req.session.user_id] };
  res.render("urls_new", templateVars);
});

routes.post("/new", (req, res) => {
  //generates random shortURL, submit new short: long key-value pair to urlDatabase and redirects to urls_show page
  let shortURL = randomShortURL();
  urlDatabase[shortURL] = { longURL: req.body.longURL, userID: req.session.user_id };
  res.redirect(`/urls/${shortURL}`);
});

// /:shortURL==========================================================================================

routes.get('/:shortURL', (req, res) => {
  checkUser(req, res);
  let templateVars = { shortURL: req.params.shortURL, longURL: urlDatabase[req.params.shortURL]['longURL'], user: users[req.session.user_id] };
  res.render('urls_show', templateVars);
});

routes.post('/:shortURL/update', (req, res) => {
  checkUser(req, res);
  const shortURL = req.params.shortURL;
  urlDatabase[shortURL].longURL = req.body.longURL;
  res.redirect(`/urls/${shortURL}`);
});

routes.post('/:shortURL/delete', (req, res) => {
  checkUser(req, res);
  delete urlDatabase[req.params.shortURL];
  res.redirect('/urls');

});


module.exports = routes;
