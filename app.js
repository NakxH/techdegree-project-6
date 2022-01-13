const express = require('express');
const app = express();

const jsonFile = require('./data.json');

app.set('view engine', 'pug');

app.use(express.static('public'))

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/about', (req, res) => {
  res.render('about');
});

app.get('/project/:id', (req, res) => {
  res.render('project')
});

app.listen(3000);