const express = require("express");
const app = express();
const PORT = 8080; // default port 8080
const bodyParser = require("body-parser");
const generateShortURL = require('./randomString');
const urlDatabase = {
  "b2xVn2": "http://www.lighthouselabs.ca",
  "9sm5xK": "http://www.google.com"
};

app.use(bodyParser.urlencoded({extended: true}));

app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.send("Hello!");
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!`);
});

app.get("/urls", (req, res) => {
  const templateVars = { urls: urlDatabase };
  res.render("urls_index", templateVars);
});

app.get("/urls/new", (req, res) => {
  res.render("urls_new");
});

app.get("/urls/:shortURL", (req, res) => {
  const sURL = req.params.shortURL;
  console.log(urlDatabase[sURL]);
  const templateVars = { shortURL: req.params.shortURL, longURL: urlDatabase[sURL]};
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

