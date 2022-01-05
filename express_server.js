const express = require("express");
const app = express();
const PORT = 8080; // default port 8080
const bodyParser = require("body-parser");
const generateShortURL = require('./randomString');
const cookieParser = require("cookie-parser");
const urlDatabase = {
  "b2xVn2": "http://www.lighthouselabs.ca",
  "9sm5xK": "http://www.google.com"
};

app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());

app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.send("Hello!");
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!`);
});

app.get("/urls", (req, res) => {
  const templateVars = { 
    urls: urlDatabase,
    username: req.cookies["username"]  
  };
  res.render("urls_index", templateVars);
});

app.get("/urls/new", (req, res) => {
  const templateVars = { 
    username: req.cookies["username"]
  };
  
  res.render("urls_new", templateVars);
});

app.get("/urls/:shortURL", (req, res) => {
  const sURL = req.params.shortURL;
  const templateVars = { 
    shortURL: req.params.shortURL,
    longURL: urlDatabase[sURL]
  };

  res.render("urls_show", templateVars);
});

app.get("/u/:shortURL", (req, res) => {
  const sURL = req.params.shortURL;
  const longURL = urlDatabase[sURL];
  res.redirect(longURL);
});

app.post("/urls", (req, res) => {

  let newURL = generateShortURL();
  urlDatabase[newURL] = req.body.longURL;

  res.redirect("/urls");
});

app.post("/urls/:shortURL/delete", (req, res) => {

  let shortURL = req.params.shortURL;
  delete urlDatabase[shortURL];

  res.redirect("/urls");
});

app.post("/urls/:shortURL", (req, res) => {

  const URL = req.body.newLongURL;
  const id = req.params.shortURL;
  
  urlDatabase[id] = URL;

  res.redirect("/urls");
});

app.post("/login", (req, res) => {

  const username = req.body.username;

  res.cookie("username", username);
  res.redirect("/urls");
});

app.post("/logout", (req, res) => {

  res.clearCookie("username");
  res.redirect("/urls");
});


