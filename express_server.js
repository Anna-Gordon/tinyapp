const express = require("express");
const PORT = 8080; // default port 8080
const bodyParser = require("body-parser");
var cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt');
const app = express();


//FUNCTIONS===========================================================================================
const randomShortURL = function generateRandomShortURL() {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  for (let i = 0; i < characters.length; i++ ) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result.slice(0, 6);
}

const userObject = function (obj, value) {
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

const logedUser = (data, id) => {
  for (let short in data) {
    if (data[short].userID === id) {
      return data[short].userID;
    }
  }
}

const checkUser = (req, res) => {
  if (!req.cookies.user_id) {
    // res.redirect('/login'); 
    res.send('Go to login page');
  }
};


//DATA==================================================================================================
const users = {
  'userRandomID': {
    id: 'userRandomID',
    email: 'user@example.com',
    password: 'purple-monkey-dinosaur'
  },
  'user2RandomID': {
    id: 'user2RandomID', 
    email: 'user2@example.com', 
    password: 'dishwasher-funk'
  }
};

const urlDatabase = {
  "b2xVn2": {longURL: "http://www.lighthouselabs.ca", userID: "userRandomID"},
  "9sm5xK": {longURL: "http://www.google.com", userID: "userRandomID"}
};


//MIDDLEWARE==============================================================================================

app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());
app.set('view engine', 'ejs');
// app.use(express.json());



//'/URLS===================================================================================================

app.get('/urls', (req, res) => {
  console.log("REQ.BODY IN /URLS", req.body)
  checkUser(req, res);
  let templateVars = { urls: urlsForUser(urlDatabase, req.cookies.user_id),
    user: users[req.cookies.user_id]
  };
    res.render('urls_index', templateVars);
});

// '/REGISTER ===============================================================================================

app.get('/register', (req, res) => {
  let templateVars = { urls: urlDatabase,
    user: req.cookies.user_id
   };
  res.render('register_page', templateVars);
});

app.post('/register', (req, res) => { 
  console.log(req.body)
  // check if input was provided
  if (req.body.email === '' || req.body.password === '') {
    res.status(400).send('Bad request.  Provide email or password');
    res.redirect('/register')
  }  
  //check if email already exist
  let user = userObject(users, req.body.email);
  if (user.id) {
    res.status(400).send('Bad request. User already exist');
  } else {   
    let newUser = randomShortURL();
    users[newUser] = {
      id: newUser,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 10)
    };
    console.log("NEW USER", users[newUser])
    res.cookie('user_id', users[newUser].id); 
    res.redirect('/urls');      
  }
});

// '/LOGIN ============================================================================================

app.get('/login', (req, res) => {
  let templateVars = { urls: urlDatabase,
    user: req.cookies.user_id
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
  if (user) {
    bcrypt.compare(req.body.password, user.password, (err, result) => {
      res.cookie('user_id', user.id);
      if(result) {      
        res.redirect('/urls')
      } else {
        res.status(403).send('Wrong password'); 
        // res.redirect('/login');
      }
    })
  } else {
    res.status(403).send('User is not found');
  }
});

// '/URLS/NEW ===========================================================================================

app.get("/urls/new", (req, res) => {
  // checkUser(req, res);
  let templateVars = {user: users[req.cookies.user_id]};
  // console.log(templateVars)
  res.render("urls_new", templateVars);
});

app.post("/urls/new", (req, res) => {
  //generates random shortURL, submit new short: long key-value pair to urlDatabase and redirects to urls_show page
  let shortURL = randomShortURL();
  urlDatabase[shortURL] = {longURL:req.body.longURL, userID: req.cookies.user_id}
  res.redirect(`/urls/${shortURL}`);       
});

// /LOGOUT=================================================================================================

app.post('/logout', (req, res) => {
  res.clearCookie('user_id');
  res.redirect('/login');
});

// /URLS/:shortURL==========================================================================================

app.get('/urls/:shortURL', (req, res) => {
  checkUser(req, res);
  let templateVars = { shortURL: req.params.shortURL, longURL: urlDatabase[req.params.shortURL]['longURL'], user: users[req.cookies.user_id] };
  res.render('urls_show', templateVars);
});

app.post('/urls/:shortURL/update', (req, res) => {
  checkUser(req, res);
  const shortURL = req.params.shortURL
  urlDatabase[shortURL].longURL = req.body.longURL;
  res.redirect(`/urls/${shortURL}`);
});

app.post('/urls/:shortURL/delete', (req, res) => {
    checkUser(req, res);
    delete urlDatabase[req.params.shortURL];
    res.redirect('/urls');

});

app.get("/u/:shortURL", (req, res) => {
  let templateVars = { shortURL: req.params.shortURL, longURL: urlDatabase[req.params.shortURL].longURL, user: users[req.cookies.user_id] };
  res.render('urls_show', templateVars);
});

/**
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